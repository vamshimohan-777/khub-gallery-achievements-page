import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { paradigms } from "../data/paradigms";

export function PearlNav() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = paradigms.map(p => document.getElementById(p.id));
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
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="relative flex items-center justify-between w-full max-w-4xl px-8 py-6 rounded-full glass-panel pointer-events-auto">
        
        {/* Connecting String */}
        <div className="absolute left-12 right-12 h-[2px] bg-white/10 top-1/2 -translate-y-1/2 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full h-full animate-[shimmer_3s_infinite]" />
        </div>

        {/* Pearls */}
        {paradigms.map((paradigm, idx) => {
          const isActive = activeSection === paradigm.id;
          
          return (
            <div key={paradigm.id} className="relative group z-10">
              {/* Pearl Button */}
              <button
                onClick={() => scrollTo(paradigm.id)}
                className="relative flex items-center justify-center rounded-full transition-transform duration-300 outline-none"
                style={{
                  width: isActive ? "32px" : "24px",
                  height: isActive ? "32px" : "24px",
                }}
                data-testid={`pearl-nav-${paradigm.id}`}
              >
                {/* Glow layer */}
                <div 
                  className="absolute inset-0 rounded-full blur-md opacity-60 transition-opacity group-hover:opacity-100"
                  style={{ backgroundColor: paradigm.color }}
                />
                
                {/* Core Pearl */}
                <div 
                  className="absolute inset-[2px] rounded-full border border-white/40 shadow-inner"
                  style={{ 
                    background: `radial-gradient(circle at 30% 30%, #ffffff 0%, ${paradigm.color} 40%, #000000 100%)`,
                    boxShadow: `inset -2px -2px 6px rgba(0,0,0,0.5), inset 2px 2px 6px rgba(255,255,255,0.8)`
                  }}
                />
              </button>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all pointer-events-none w-max max-w-[200px] text-center">
                <div className="glass-panel px-4 py-2 rounded-lg text-sm border-t" style={{ borderTopColor: paradigm.color }}>
                  <div className="font-bold text-white mb-0.5">{paradigm.name}</div>
                  <div className="text-xs text-white/60">{paradigm.tagline}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}