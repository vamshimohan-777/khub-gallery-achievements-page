import { useEffect, useRef, useState } from "react";
import { paradigms } from "../data/paradigms";

const DISC_SIZE = 300;
const PEARL_RADIUS = 118;
const PEARL_SIZE = 20;
const ROTATION_DURATION = 24; // seconds per full rotation

export function PearlNav() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [hoveredPearl, setHoveredPearl] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const discRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = paradigms.map((p) => document.getElementById(p.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          return;
        }
      }
      setActiveSection(null);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
    }
  };

  const cx = DISC_SIZE / 2;
  const cy = DISC_SIZE / 2;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        width: DISC_SIZE,
        height: DISC_SIZE,
        zIndex: 50,
      }}
    >
      {/* Rotating disc wrapper */}
      <div
        ref={discRef}
        className="pearl-disc-rotate"
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          animationPlayState: paused ? "paused" : "running",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          setPaused(false);
          setHoveredPearl(null);
        }}
      >
        {/* Disc body */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 30%, rgba(80,100,200,0.15) 0%, rgba(8,12,35,0.92) 55%, rgba(3,5,18,0.97) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
            boxShadow:
              "0 0 80px rgba(0,150,255,0.12), 0 0 30px rgba(0,80,180,0.08), inset 0 0 60px rgba(0,0,0,0.6)",
          }}
        />

        {/* Decorative concentric rings */}
        {[0.85, 0.68, 0.48, 0.25].map((scale, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              borderRadius: "50%",
              border: `1px solid rgba(255,255,255,${i === 0 ? 0.06 : 0.04})`,
              top: `${((1 - scale) / 2) * 100}%`,
              left: `${((1 - scale) / 2) * 100}%`,
              width: `${scale * 100}%`,
              height: `${scale * 100}%`,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Center dot */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 10,
            height: 10,
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(180,210,255,0.9), rgba(60,100,200,0.5))",
            boxShadow: "0 0 10px rgba(100,180,255,0.6)",
            pointerEvents: "none",
          }}
        />

        {/* Shimmer arc on the pearl orbit ring */}
        <svg
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          width={DISC_SIZE}
          height={DISC_SIZE}
        >
          <circle
            cx={cx}
            cy={cy}
            r={PEARL_RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        </svg>

        {/* Pearls */}
        {paradigms.map((paradigm, idx) => {
          const angle = (2 * Math.PI * idx) / paradigms.length - Math.PI / 2;
          const px = cx + PEARL_RADIUS * Math.cos(angle) - PEARL_SIZE / 2;
          const py = cy + PEARL_RADIUS * Math.sin(angle) - PEARL_SIZE / 2;
          const isActive = activeSection === paradigm.id;
          const isHovered = hoveredPearl === paradigm.id;
          const size = isHovered || isActive ? PEARL_SIZE * 1.55 : PEARL_SIZE;
          const offset = (size - PEARL_SIZE) / 2;

          return (
            <div
              key={paradigm.id}
              style={{
                position: "absolute",
                left: px - offset,
                top: py - offset,
                width: size,
                height: size,
                zIndex: isHovered || isActive ? 10 : 1,
              }}
            >
              {/* Counter-rotate so label + pearl stay upright */}
              <div
                className="pearl-counter-rotate"
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  animationPlayState: paused ? "paused" : "running",
                }}
              >
                <button
                  onClick={() => scrollTo(paradigm.id)}
                  onMouseEnter={() => setHoveredPearl(paradigm.id)}
                  onMouseLeave={() => setHoveredPearl(null)}
                  data-testid={`pearl-nav-${paradigm.id}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.35)",
                    cursor: "pointer",
                    position: "relative",
                    background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95) 0%, ${paradigm.color} 38%, rgba(0,0,0,0.85) 100%)`,
                    boxShadow: `0 0 ${isHovered || isActive ? 18 : 8}px ${paradigm.color}cc, inset -1px -1px 4px rgba(0,0,0,0.5), inset 1px 1px 4px rgba(255,255,255,0.7)`,
                    transition: "box-shadow 0.3s ease",
                    outline: "none",
                  }}
                />

                {/* Tooltip — shown on hover, positioned outward from disc center */}
                {isHovered && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "calc(100% + 10px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "rgba(6,10,30,0.97)",
                      border: `1px solid ${paradigm.color}55`,
                      borderTop: `2px solid ${paradigm.color}`,
                      borderRadius: 8,
                      padding: "7px 13px",
                      whiteSpace: "nowrap",
                      pointerEvents: "none",
                      boxShadow: `0 4px 24px rgba(0,0,0,0.5), 0 0 12px ${paradigm.color}33`,
                    }}
                  >
                    <div
                      style={{
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 12,
                        fontFamily: "Outfit, sans-serif",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {paradigm.name}
                    </div>
                    <div
                      style={{
                        color: "rgba(255,255,255,0.55)",
                        fontSize: 10,
                        fontFamily: "Inter, sans-serif",
                        marginTop: 2,
                      }}
                    >
                      {paradigm.tagline}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
