import { motion } from "framer-motion";
import { Network } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)/0.05_0%,var(--background)_100%)]" />
      <div className="absolute inset-0 opacity-[0.05] mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-primary/5 border border-primary/10 backdrop-blur-xl mb-6 shadow-[0_0_60px_rgba(var(--primary),0.05)]">
            <Network className="w-10 h-10 text-primary" />
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground/90 to-foreground/30"
          style={{ fontFamily: 'var(--app-font-display)' }}
        >
          Achievements
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-3xl text-foreground/70 font-light max-w-3xl tracking-wide"
        >
          A Journey Through AI Innovation. <br/>
          <span className="text-muted-foreground text-lg md:text-xl block mt-2">Celebrating the breakthroughs and defining milestones of our core paradigms.</span>
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        >
          <span className="text-xs uppercase tracking-widest text-muted-foreground/60">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}