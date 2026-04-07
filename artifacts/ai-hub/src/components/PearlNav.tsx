import { useEffect, useRef, useState } from "react";
import { paradigms } from "../data/paradigms";

const DISC_SIZE = 440;
const ARM_RADIUS = 174;
const N = paradigms.length;
// 9 o'clock (leftmost point) = the selector position in CSS rotate terms
const SELECTOR_ANGLE = 180;

const SHORT_NAMES: Record<string, string> = {
  "computer-vision": "Vision",
  "nlp": "NLP",
  "reinforcement-learning": "RL",
  "generative-ai": "Generative",
  "robotics": "Robotics",
  "gnn": "Graph NN",
  "federated-learning": "Federated",
  "time-series": "Time Series",
};

function getSnapTarget(currentRotation: number, idx: number): number {
  // We want (angleDeg[idx] + target) = SELECTOR_ANGLE
  // With angleDeg = SELECTOR_ANGLE + (360/N)*idx, 
  // target = -(360/N)*idx
  const baseTarget = -(360 / N) * idx;
  const delta = ((baseTarget - currentRotation) % 360 + 540) % 360 - 180;
  return currentRotation + delta;
}

function getNearestIdx(currentRotation: number): number {
  let nearestIdx = 0;
  let smallestDelta = Infinity;
  for (let i = 0; i < N; i++) {
    const snapTarget = getSnapTarget(currentRotation, i);
    const d = Math.abs(snapTarget - currentRotation);
    if (d < smallestDelta) { smallestDelta = d; nearestIdx = i; }
  }
  return nearestIdx;
}

export function PearlNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [outerRotation, setOuterRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startAngle: number; startRotation: number } | null>(null);
  const outerRotRef = useRef(0);
  const activeIdxRef = useRef(0);
  // Suppress scroll-driven rotation briefly after user manually picks a paradigm
  const suppressScrollRef = useRef(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      window.scrollTo({ top: absoluteTop - 80, behavior: "smooth" });
    }
  };

  const getAngle = (e: MouseEvent | React.MouseEvent): number => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragRef.current = { startAngle: getAngle(e), startRotation: outerRotRef.current };
    setIsDragging(true);
    setIsSnapping(false);
  };

  const rotateTo = (idx: number) => {
    const target = getSnapTarget(outerRotRef.current, idx);
    outerRotRef.current = target;
    activeIdxRef.current = idx;
    setOuterRotation(target);
    setActiveIdx(idx);
  };

  const snapAndNavigate = () => {
    const nearest = getNearestIdx(outerRotRef.current);
    rotateTo(nearest);
    setIsSnapping(true);
    suppressScrollRef.current = true;
    scrollTo(paradigms[nearest].id);
    setTimeout(() => { 
      setIsSnapping(false); 
      suppressScrollRef.current = false; 
    }, 2000);
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
      const delta = angle - dragRef.current.startAngle;
      const next = dragRef.current.startRotation + delta;
      outerRotRef.current = next;
      setOuterRotation(next);
    };
    const onUp = () => {
      if (dragRef.current) {
        dragRef.current = null;
        setIsDragging(false);
        snapAndNavigate();
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  // ── Section Observation: auto-rotate disc based on visibility ──
  useEffect(() => {
    const options = {
      root: null,
      // Target the center-upper part of the screen where reading focus usually is
      rootMargin: "-30% 0px -40% 0px",
      threshold: 0,
    };

    const callback: IntersectionObserverCallback = (entries) => {
      // Don't sync the disc if we are currently dragging it or if we just clicked an item
      if (dragRef.current || suppressScrollRef.current) return;

      // Find the best intersecting entry (the one that is most visible in our target zone)
      let bestEntry = null;
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
            bestEntry = entry;
          }
        }
      }

      if (bestEntry) {
        const id = (bestEntry.target as HTMLElement).id;
        const idx = paradigms.findIndex((p) => p.id === id);
        if (idx !== -1 && idx !== activeIdxRef.current) {
          rotateTo(idx);
        }
      }
    };

    const observer = new IntersectionObserver(callback, options);
    paradigms.forEach((p) => {
      const el = document.getElementById(p.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Background blur overlay while dragging ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backdropFilter: isDragging ? "blur(10px)" : "blur(0px)",
          background: isDragging ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0)",
          zIndex: 40,
          pointerEvents: "none",
          transition: "backdrop-filter 0.25s ease, background 0.25s ease",
        }}
      />

      {/* ── Toggle button — always visible on right edge ── */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        style={{
          position: "fixed",
          right: isOpen ? DISC_SIZE / 2 - 20 : 0,
          top: "50vh",
          transform: "translateY(-50%)",
          zIndex: 60,
          width: 36,
          height: 64,
          borderRadius: "8px 0 0 8px",
          background: isOpen
            ? "rgba(255,255,255,0.06)"
            : "rgba(80,130,255,0.15)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRight: "none",
          backdropFilter: "blur(12px)",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          transition: "right 0.5s cubic-bezier(0.4,0,0.2,1), background 0.3s ease",
          outline: "none",
          boxShadow: isOpen ? "none" : "-4px 0 20px rgba(80,130,255,0.25)",
        }}
        title={isOpen ? "Close navigation" : "Open navigation"}
      >
        {/* Three dot indicator */}
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: 4, height: 4, borderRadius: "50%",
            background: isOpen ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.75)",
            transition: "background 0.3s ease",
          }} />
        ))}
        {/* Arrow chevron */}
        <div style={{
          width: 8, height: 8,
          borderTop: "1.5px solid rgba(255,255,255,0.5)",
          borderLeft: "1.5px solid rgba(255,255,255,0.5)",
          transform: isOpen ? "rotate(225deg)" : "rotate(45deg)",
          transition: "transform 0.4s ease",
          marginTop: 2,
        }} />
      </button>

      {/* ── Disc container ── */}
      <div
        ref={containerRef}
        data-testid="pearl-disc-nav"
        style={{
          position: "fixed",
          right: isOpen ? -(DISC_SIZE / 2) : -DISC_SIZE,
          top: `calc(50vh - ${DISC_SIZE / 2}px)`,
          width: DISC_SIZE,
          height: DISC_SIZE,
          zIndex: 50,
          transition: "right 0.5s cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >

        {/* ── INNER DISC: auto-rotating decorative layer ── */}
        <div
          className="pearl-disc-rotate"
          style={{ position: "absolute", inset: 0, borderRadius: "50%", pointerEvents: "none" }}
        >
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "radial-gradient(circle at 40% 35%, rgba(60,90,200,0.2) 0%, rgba(8,11,32,0.95) 50%, rgba(3,5,18,0.99) 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 0 80px rgba(0,100,255,0.12), inset 0 0 60px rgba(0,0,0,0.6)",
          }} />
          {[0.80, 0.62, 0.44, 0.26].map((s, i) => (
            <div key={i} style={{
              position: "absolute", borderRadius: "50%",
              border: `1px solid rgba(255,255,255,${i === 0 ? 0.08 : 0.04})`,
              top: `${((1 - s) / 2) * 100}%`, left: `${((1 - s) / 2) * 100}%`,
              width: `${s * 100}%`, height: `${s * 100}%`,
            }} />
          ))}
          {[0, 45, 90, 135].map((angle) => (
            <div key={angle} style={{
              position: "absolute", top: "50%", left: "50%",
              width: "60%", height: "1px",
              background: "rgba(255,255,255,0.03)",
              transformOrigin: "0 0",
              transform: `rotate(${angle}deg) translateY(-0.5px)`,
            }} />
          ))}
          {/* Center hub */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 52, height: 52, borderRadius: "50%",
            background: "radial-gradient(circle at 38% 32%, rgba(100,150,255,0.35), rgba(15,22,70,0.95))",
            border: "1px solid rgba(255,255,255,0.14)",
            boxShadow: "0 0 20px rgba(80,130,255,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{
              color: "rgba(200,220,255,0.95)", fontSize: 7, fontWeight: 900,
              letterSpacing: "0.14em", fontFamily: "Outfit, sans-serif",
            }}>NEXUS</span>
          </div>
        </div>

        {/* ── OUTER RING: manually draggable ── */}
        <div
          onMouseDown={handleMouseDown}
          style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            transform: `rotate(${outerRotation}deg)`,
            transition: isDragging ? "none" : "transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            cursor: isDragging ? "grabbing" : "grab",
            zIndex: 2,
          }}
        >
          {/* Orbit track */}
          <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }} width={DISC_SIZE} height={DISC_SIZE}>
            <circle
              cx={DISC_SIZE / 2} cy={DISC_SIZE / 2} r={ARM_RADIUS}
              fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="1" strokeDasharray="3 6"
            />
          </svg>

          {/* Paradigm items */}
          {paradigms.map((p, idx) => {
            const angleDeg = SELECTOR_ANGLE + (360 / N) * idx;
            const isActive = idx === activeIdx;

            return (
              <div key={p.id} style={{
                position: "absolute", left: "50%", top: "50%",
                width: 0, height: 0,
                transform: `rotate(${angleDeg}deg)`,
                transformOrigin: "0 0",
              }}>
                <button
                  onClick={() => {
                    if (!isDragging) {
                      rotateTo(idx);
                      suppressScrollRef.current = true;
                      scrollTo(p.id);
                      setTimeout(() => { suppressScrollRef.current = false; }, 2000);
                    }
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  data-testid={`pearl-nav-${p.id}`}
                  style={{
                    position: "absolute",
                    left: ARM_RADIUS - 10, top: -10,
                    display: "flex", alignItems: "center",
                    background: "transparent", border: "none",
                    cursor: "pointer", outline: "none", padding: "0",
                  }}
                >
                  <div style={{
                    display: "flex", 
                    flexDirection: "row-reverse", // Label always on the LEFT of the dot
                    alignItems: "center", gap: 8,
                    transform: `rotate(${-(outerRotation + angleDeg)}deg)`,
                    transition: isDragging ? "none" : "transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}>
                    {/* The Dot */}
                    <div style={{
                      width: isActive ? 22 : 16, height: isActive ? 22 : 16,
                      borderRadius: "50%", flexShrink: 0,
                      background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95) 0%, ${p.color} 42%, rgba(0,0,0,0.8) 100%)`,
                      boxShadow: `0 0 ${isActive ? 22 : 8}px ${p.color}cc, inset -1px -1px 3px rgba(0,0,0,0.4), inset 1px 1px 3px rgba(255,255,255,0.6)`,
                      border: `1px solid rgba(255,255,255,${isActive ? 0.5 : 0.3})`,
                      transition: "all 0.3s ease",
                    }} />
                    
                    {/* The Label */}
                    <span style={{
                      color: isActive ? p.color : "rgba(255,255,255,0.55)",
                      fontSize: 10, fontWeight: 700,
                      fontFamily: "Outfit, sans-serif",
                      whiteSpace: "nowrap", letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      textShadow: isActive ? `0 0 10px ${p.color}` : "none",
                      transition: "color 0.2s ease",
                      userSelect: "none",
                      textAlign: "right", // Align towards the dot
                    }}>
                      {SHORT_NAMES[p.id] ?? p.name}
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
