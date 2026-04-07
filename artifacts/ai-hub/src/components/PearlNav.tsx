import { useEffect, useState } from "react";
import { paradigms } from "../data/paradigms";

const DISC_SIZE = 280;
const ARM_RADIUS = 105;
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
  const [paused, setPaused] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

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

  return (
    <div
      data-testid="pearl-disc-nav"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        width: DISC_SIZE,
        height: DISC_SIZE,
        zIndex: 50,
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => { setPaused(false); setHoveredIdx(null); }}
    >
      {/* ── Rotating disc ── */}
      <div
        className="pearl-disc-rotate"
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {/* Disc face */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "radial-gradient(circle at 38% 35%, rgba(60,80,180,0.18) 0%, rgba(8,11,32,0.94) 55%, rgba(3,5,18,0.98) 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(14px)",
          boxShadow: "0 0 70px rgba(0,120,255,0.1), 0 0 20px rgba(0,60,150,0.08), inset 0 0 60px rgba(0,0,0,0.55)",
          pointerEvents: "none",
        }} />

        {/* Concentric decorative rings */}
        {[0.88, 0.72, 0.52, 0.30].map((s, i) => (
          <div key={i} style={{
            position: "absolute",
            borderRadius: "50%",
            border: `1px solid rgba(255,255,255,${i === 0 ? 0.07 : 0.04})`,
            top: `${((1 - s) / 2) * 100}%`,
            left: `${((1 - s) / 2) * 100}%`,
            width: `${s * 100}%`,
            height: `${s * 100}%`,
            pointerEvents: "none",
          }} />
        ))}

        {/* Orbit track ring (where the pearls sit) */}
        <div style={{
          position: "absolute",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.06)",
          top: `${((DISC_SIZE / 2 - ARM_RADIUS - 14) / DISC_SIZE) * 100}%`,
          left: `${((DISC_SIZE / 2 - ARM_RADIUS - 14) / DISC_SIZE) * 100}%`,
          width: `${((ARM_RADIUS + 14) * 2 / DISC_SIZE) * 100}%`,
          height: `${((ARM_RADIUS + 14) * 2 / DISC_SIZE) * 100}%`,
          pointerEvents: "none",
        }} />

        {/* Center hub */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "radial-gradient(circle at 38% 35%, rgba(120,160,255,0.3), rgba(20,30,80,0.9))",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 0 14px rgba(80,130,255,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}>
          <span style={{
            color: "rgba(200,220,255,0.9)",
            fontSize: 7,
            fontWeight: 900,
            letterSpacing: "0.12em",
            fontFamily: "Outfit, sans-serif",
          }}>NEXUS</span>
        </div>

        {/* ── Paradigm arms — rotate with the disc ── */}
        {paradigms.map((p, idx) => {
          const angleDeg = (360 / N) * idx - 90; // start at 12 o'clock
          const isActive = activeSection === p.id;
          const isHovered = hoveredIdx === idx;
          const pearlSize = isHovered || isActive ? 18 : 14;

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
                zIndex: isHovered ? 10 : 1,
              }}
            >
              <button
                onClick={() => scrollTo(p.id)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                data-testid={`pearl-nav-${p.id}`}
                style={{
                  position: "absolute",
                  left: ARM_RADIUS - pearlSize / 2,
                  top: -(pearlSize / 2),
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  outline: "none",
                  padding: "3px",
                  transition: "all 0.2s ease",
                }}
              >
                {/* Pearl orb */}
                <div style={{
                  width: pearlSize,
                  height: pearlSize,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95) 0%, ${p.color} 42%, rgba(0,0,0,0.8) 100%)`,
                  boxShadow: `0 0 ${isHovered || isActive ? 16 : 6}px ${p.color}bb, inset -1px -1px 3px rgba(0,0,0,0.4), inset 1px 1px 3px rgba(255,255,255,0.6)`,
                  border: "1px solid rgba(255,255,255,0.35)",
                  transition: "all 0.25s ease",
                }} />

                {/* Label — radiates outward, rotates with disc */}
                <span style={{
                  color: isActive
                    ? p.color
                    : isHovered
                      ? "rgba(255,255,255,0.95)"
                      : "rgba(255,255,255,0.55)",
                  fontSize: 8.5,
                  fontWeight: 700,
                  fontFamily: "Outfit, sans-serif",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  transition: "color 0.2s ease",
                  textShadow: isActive ? `0 0 8px ${p.color}` : "none",
                }}>
                  {SHORT_NAMES[p.id] ?? p.name}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Pause indicator ring — glows when paused so user knows disc is interactive */}
      {paused && (
        <div style={{
          position: "absolute",
          inset: -3,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 0 20px rgba(100,180,255,0.18)",
          pointerEvents: "none",
          transition: "opacity 0.3s ease",
        }} />
      )}
    </div>
  );
}
