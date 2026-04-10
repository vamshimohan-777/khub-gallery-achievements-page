import { Hero } from "./Hero";
import { ParadigmSection } from "./ParadigmSection";
import { PearlNav } from "./PearlNav";
import { paradigms } from "../data/paradigms";

export function GalleryPage() {
  return (
    <main className="bg-background min-h-screen text-foreground selection:bg-primary/20">
      <Hero />
      
      <div className="relative">
        {paradigms.map((paradigm) => (
          <ParadigmSection key={paradigm.id} paradigm={paradigm} />
        ))}
      </div>

      <footer className="py-20 text-center border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.02] to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-2xl font-bold mb-4 font-display text-foreground/80">Achievements Portal</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            A comprehensive archive of AI paradigms and their defining milestones across the decade.
          </p>
          <div className="flex justify-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
          </div>
        </div>
      </footer>

      <PearlNav />
    </main>
  );
}
