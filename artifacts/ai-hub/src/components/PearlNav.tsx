import { useEffect, useRef, useState } from "react";
import { paradigms } from "../data/paradigms";

const DISC_SIZE = 560;
const ARM_RADIUS = 220;
const N = paradigms.length;
const SELECTOR_ANGLE = 180;

const SHORT_NAMES: Record<string, string> = {
  "drug-paradigm": "Drug",
  "robo-paradigm": "Robo",
  "cyber-paradigm": "Cyber",
  "neuro-paradigm": "Neuro",
  "crystal-paradigm": "Crystal",
  "nutra-paradigm": "Nutra",
};

function getSnapTarget(currentRotation: number, idx: number): number {
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

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-30% 0px -40% 0px",
      threshold: 0,
    };

    const callback: IntersectionObserverCallback = (entries) => {
      if (dragRef.current || suppressScrollRef.current) return;

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
      <div
        style={{
          position: "fixed",
          inset: 0,
          backdropFilter: isDragging ? "blur(12px)" : "blur(0px)",
          background: isDragging ? "rgba(25, 45, 20, 0.1)" : "rgba(0,0,0,0)",
          zIndex: 40,
          pointerEvents: "none",
          transition: "backdrop-filter 0.35s ease, background 0.35s ease",
        }}
      />

      <button
        onClick={() => setIsOpen((o) => !o)}
        style={{
          position: "fixed",
          right: 0,
          top: "50vh",
          transform: "translateY(-50%)",
          zIndex: 60,
          width: 44,
          height: 64,
          borderRadius: "12px 0 0 12px",
          background: isOpen ? "var(--primary)" : "var(--primary)/0.2",
          border: "1px solid var(--border)",
          borderRight: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          outline: "none",
          boxShadow: isOpen ? "none" : "-2px 0 15px rgba(var(--primary),0.2)",
        }}
        title={isOpen ? "Close navigation" : "Open navigation"}
      >
        <span style={{ 
          color: isOpen ? "var(--primary-foreground)" : "var(--primary)",
          fontSize: 28, 
          fontWeight: "bold",
          lineHeight: 1,
          fontFamily: "monospace"
        }}>
          {isOpen ? "×" : "›"}
        </span>
      </button>

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
        <div
          className="pearl-disc-rotate"
          style={{ position: "absolute", inset: 0, borderRadius: "50%", pointerEvents: "none" }}
        >
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "radial-gradient(circle at 40% 35%, var(--card) 0%, var(--background) 100%)",
            border: "1px solid var(--border)",
            backdropFilter: "blur(24px)",
            boxShadow: "0 0 80px rgba(0,60,40,0.08), inset 0 0 60px rgba(255,255,255,0.5)",
          }} />
          {[0.82, 0.64, 0.46, 0.28].map((s, i) => (
            <div key={i} style={{
              position: "absolute", borderRadius: "50%",
              border: `1px solid var(--primary)/${i === 0 ? 0.1 : 0.05}`,
              top: `${((1 - s) / 2) * 100}%`, left: `${((1 - s) / 2) * 100}%`,
              width: `${s * 100}%`, height: `${s * 100}%`,
            }} />
          ))}
          {[0, 45, 90, 135].map((angle) => (
            <div key={angle} style={{
              position: "absolute", top: "50%", left: "50%",
              width: "60%", height: "1px",
              background: "var(--primary)/0.03",
              transformOrigin: "0 0",
              transform: `rotate(${angle}deg) translateY(-0.5px)`,
            }} />
          ))}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 58, height: 58, borderRadius: "50%",
            background: "radial-gradient(circle at 38% 32%, var(--primary)/0.2, var(--primary)/0.1)",
            border: "1px solid var(--primary)/0.2",
            boxShadow: "0 0 20px rgba(var(--primary),0.05)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{
              color: "var(--primary)", fontSize: 10, fontWeight: 900,
              letterSpacing: "0.1em", fontFamily: "var(--app-font-display)",
            }}>GALLERY</span>
          </div>
        </div>

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
          <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }} width={DISC_SIZE} height={DISC_SIZE}>
            <circle
              cx={DISC_SIZE / 2} cy={DISC_SIZE / 2} r={ARM_RADIUS}
              fill="none" stroke="var(--primary)/0.1" strokeWidth="1.5" strokeDasharray="4 8"
            />
          </svg>

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
                    left: ARM_RADIUS - 14, top: -14,
                    display: "flex", alignItems: "center",
                    background: "transparent", border: "none",
                    cursor: "pointer", outline: "none", padding: "0",
                  }}
                >
                  <div style={{
                    display: "flex", 
                    flexDirection: "row-reverse",
                    alignItems: "center", gap: 12,
                    transform: `rotate(${-(outerRotation + angleDeg)}deg)`,
                    transition: isDragging ? "none" : "transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}>
                    <div style={{
                      width: isActive ? 28 : 22, height: isActive ? 28 : 22,
                      borderRadius: "50%", flexShrink: 0,
                      background: `radial-gradient(circle at 32% 28%, #fff 0%, ${p.color} 50%, rgba(0,0,0,0.2) 100%)`,
                      boxShadow: isActive 
                        ? `0 0 30px ${p.color}, inset -1px -1px 4px rgba(0,0,0,0.2)` 
                        : `0 0 15px ${p.color}66`,
                      border: `2px solid ${isActive ? "#fff" : "rgba(255,255,255,0.8)"}`,
                      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    }} />
                    
                    <span style={{
                      color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
                      fontSize: isActive ? 12 : 11, 
                      fontWeight: isActive ? 800 : 500,
                      fontFamily: "var(--app-font-display)",
                      whiteSpace: "nowrap", letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      transition: "all 0.3s ease",
                      userSelect: "none",
                      textAlign: "right",
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
