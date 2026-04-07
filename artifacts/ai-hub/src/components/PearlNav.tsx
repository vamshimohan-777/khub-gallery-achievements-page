import { useEffect, useRef, useState } from "react";
import { paradigms } from "../data/paradigms";

const DISC_SIZE = 440;
const ARM_RADIUS = 174;
const N = paradigms.length;

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

export function PearlNav() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [outerRotation, setOuterRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startAngle: number; startRotation: number } | null>(null);
  const outerRotRef = useRef(0);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = paradigms.map((p) => document.getElementById(p.id));
      const mid = window.scrollY + window.innerHeight / 2;
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i];
        if (s && s.offsetTop <= mid) { setActiveSection(s.id); return; }
      }
      setActiveSection(null);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  // Helper: get angle (degrees) from mouse event relative to disc center
  const getAngle = (e: MouseEvent | React.MouseEvent) => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startAngle = getAngle(e);
    dragRef.current = { startAngle, startRotation: outerRotRef.current };
    setIsDragging(true);
  };

  // Drag move + up on window
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current || !containerRef.current) return;
      const currentAngle = (() => {
        const rect = containerRef.current!.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        return Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
      })();
      const delta = currentAngle - dragRef.current.startAngle;
      const next = dragRef.current.startRotation + delta;
      outerRotRef.current = next;
      setOuterRotation(next);
    };
    const onUp = () => {
      dragRef.current = null;
      setIsDragging(false);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-testid="pearl-disc-nav"
      style={{
        position: "fixed",
        right: -(DISC_SIZE / 2),
        top: `calc(50vh - ${DISC_SIZE / 2}px)`,
        width: DISC_SIZE,
        height: DISC_SIZE,
        zIndex: 50,
      }}
    >
      {/* ── INNER DISC: auto-rotating decorative layer ── */}
      <div
        className="pearl-disc-rotate"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      >
        {/* Disc face */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "radial-gradient(circle at 40% 35%, rgba(60,90,200,0.2) 0%, rgba(8,11,32,0.95) 50%, rgba(3,5,18,0.99) 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 0 80px rgba(0,100,255,0.12), inset 0 0 60px rgba(0,0,0,0.6)",
        }} />

        {/* Concentric decorative rings */}
        {[0.80, 0.62, 0.44, 0.26].map((s, i) => (
          <div key={i} style={{
            position: "absolute",
            borderRadius: "50%",
            border: `1px solid rgba(255,255,255,${i === 0 ? 0.08 : 0.04})`,
            top: `${((1 - s) / 2) * 100}%`,
            left: `${((1 - s) / 2) * 100}%`,
            width: `${s * 100}%`,
            height: `${s * 100}%`,
          }} />
        ))}

        {/* Radial spokes */}
        {[0, 45, 90, 135].map((angle) => (
          <div key={angle} style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "60%",
            height: "1px",
            background: "rgba(255,255,255,0.03)",
            transformOrigin: "0 0",
            transform: `rotate(${angle}deg) translateY(-0.5px)`,
          }} />
        ))}

        {/* Center hub */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "radial-gradient(circle at 38% 32%, rgba(100,150,255,0.35), rgba(15,22,70,0.95))",
          border: "1px solid rgba(255,255,255,0.14)",
          boxShadow: "0 0 20px rgba(80,130,255,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <span style={{
            color: "rgba(200,220,255,0.95)",
            fontSize: 7,
            fontWeight: 900,
            letterSpacing: "0.14em",
            fontFamily: "Outfit, sans-serif",
          }}>NEXUS</span>
        </div>
      </div>

      {/* ── OUTER RING: manually draggable pearl necklace ── */}
      <div
        onMouseDown={handleMouseDown}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          transform: `rotate(${outerRotation}deg)`,
          cursor: isDragging ? "grabbing" : "grab",
          zIndex: 2,
        }}
      >
        {/* Faint orbit track */}
        <div style={{
          position: "absolute",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.07)",
          top: `${((DISC_SIZE / 2 - ARM_RADIUS - 18) / DISC_SIZE) * 100}%`,
          left: `${((DISC_SIZE / 2 - ARM_RADIUS - 18) / DISC_SIZE) * 100}%`,
          width: `${((ARM_RADIUS + 18) * 2 / DISC_SIZE) * 100}%`,
          height: `${((ARM_RADIUS + 18) * 2 / DISC_SIZE) * 100}%`,
          pointerEvents: "none",
        }} />

        {/* Connecting string (full circle) */}
        <svg
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          width={DISC_SIZE}
          height={DISC_SIZE}
        >
          <circle
            cx={DISC_SIZE / 2}
            cy={DISC_SIZE / 2}
            r={ARM_RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
            strokeDasharray="3 5"
          />
        </svg>

        {/* Paradigm items on the outer ring */}
        {paradigms.map((p, idx) => {
          const angleDeg = (360 / N) * idx - 90;
          const isActive = activeSection === p.id;

          return (
            <div
              key={p.id}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 0,
                height: 0,
                transform: `rotate(${angleDeg}deg)`,
                transformOrigin: "0 0",
              }}
            >
              <button
                onClick={(e) => {
                  // Only fire click if we didn't drag significantly
                  if (!isDragging) { e.stopPropagation(); scrollTo(p.id); }
                }}
                onMouseDown={(e) => e.stopPropagation()}
                data-testid={`pearl-nav-${p.id}`}
                style={{
                  position: "absolute",
                  left: ARM_RADIUS - 10,
                  top: -10,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  outline: "none",
                  padding: "3px",
                }}
              >
                {/* Pearl orb */}
                <div style={{
                  width: isActive ? 20 : 15,
                  height: isActive ? 20 : 15,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95) 0%, ${p.color} 42%, rgba(0,0,0,0.8) 100%)`,
                  boxShadow: `0 0 ${isActive ? 18 : 8}px ${p.color}cc, inset -1px -1px 3px rgba(0,0,0,0.4), inset 1px 1px 3px rgba(255,255,255,0.6)`,
                  border: "1px solid rgba(255,255,255,0.35)",
                  transition: "all 0.25s ease",
                }} />

                {/* Label — rotates with outer ring */}
                <span style={{
                  color: isActive ? p.color : "rgba(255,255,255,0.6)",
                  fontSize: 8.5,
                  fontWeight: 700,
                  fontFamily: "Outfit, sans-serif",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  textShadow: isActive ? `0 0 10px ${p.color}` : "none",
                  transition: "color 0.2s ease",
                  userSelect: "none",
                }}>
                  {SHORT_NAMES[p.id] ?? p.name}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Left-edge glow — hints that the disc extends further right */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: DISC_SIZE / 2,
        height: "100%",
        borderRadius: `${DISC_SIZE / 2}px 0 0 ${DISC_SIZE / 2}px`,
        boxShadow: "-4px 0 30px rgba(80,130,255,0.08)",
        pointerEvents: "none",
      }} />
    </div>
  );
}
