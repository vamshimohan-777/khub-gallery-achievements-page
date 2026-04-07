import { Hero } from "@/components/Hero";
import { ParadigmSection } from "@/components/ParadigmSection";
import { PearlNav } from "@/components/PearlNav";
import { paradigms } from "@/data/paradigms";

export default function Home() {
  return (
    <main className="bg-[#0a0c18] min-h-screen text-white selection:bg-white/20">
      <Hero />
      
      <div className="relative">
        {paradigms.map((paradigm, index) => (
          <ParadigmSection 
            key={paradigm.id} 
            paradigm={paradigm} 
            index={index} 
          />
        ))}
      </div>

      <footer className="py-20 text-center border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-white/[0.02] to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-2xl font-bold mb-4 font-display text-white/80">NEXUS</h2>
          <p className="text-white/40 mb-8 max-w-md mx-auto">
            The frontier of artificial intelligence, mapped and cataloged for the builders of tomorrow.
          </p>
          <div className="flex justify-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </div>
        </div>
      </footer>

      <PearlNav />
    </main>
  );
}