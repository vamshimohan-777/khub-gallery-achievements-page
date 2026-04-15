import { Router, type Request, type Response } from "express";

const paradigmsData: Record<string, any> = {
  "drug-paradigm": {
    achievements: [
      {
        year: "2020",
        title: "AlphaFold 2",
        desc: "A breakthrough in biology solving the 50-year-old protein folding problem.",
        details:
          "DeepMind’s AlphaFold 2 reached near-experimental accuracy for protein structure prediction at CASP14, using attention over evolutionary alignments. It effectively closed a decades-long gap for many fold families and made large-scale structural coverage practical. Teams worldwide now use these models to prioritize targets, design binders, and interpret disease mutations.",
      },
      {
        year: "2022",
        title: "AI-Designed Drug Trials",
        desc: "First molecule designed by AI enters Phase II human clinical trials.",
        details:
          "This milestone showed that generative chemistry and optimization pipelines can produce novel scaffolds that survive real-world ADMET and manufacturing constraints—not just in silico winners. Phase II enrollment meant human safety and dosing data began to validate the end-to-end AI loop. Replace this paragraph with your program’s official summary, trial ID, and primary endpoints when you publish them.",
      },
    ],
    photos: [
      { src: "https://picsum.photos/seed/drug-1/1200/600", alt: "Molecular simulation" },
      { src: "https://picsum.photos/seed/drug-2/600/400", alt: "Lab automation" },
      { src: "https://picsum.photos/seed/drug-3/600/400", alt: "Protein structure" },
    ],
  },
  "robo-paradigm": {
    achievements: [
      {
        year: "2021",
        month: 3,
        title: "Neural Motion Planning",
        desc: "Real-time obstacle avoidance in dynamic human-centric spaces.",
        details: "Learned planners fused perception with control so mobile manipulators could re-route in milliseconds as people and objects moved unpredictably.",
      },
      {
        year: "2023",
        month: 9,
        title: "General Purpose Humanoids",
        desc: "Scaling foundation models to complex bipedal manipulation tasks.",
        details: "Vision–language–action stacks began transferring skills across tasks—grasping, tool use, and navigation—without full retraining for each behavior.",
      },
    ],
    photos: [
      { src: "https://picsum.photos/seed/robo-1/1200/600", alt: "Humanoid robot" },
      { src: "https://picsum.photos/seed/robo-2/600/400", alt: "Robotic assembly" },
      { src: "https://picsum.photos/seed/robo-3/600/400", alt: "Spatial mapping" },
    ],
    siteUrl: "https://example.com/paradigms/robo-paradigm",
  },
  "cyber-paradigm": {
    achievements: [
      {
        year: "2022",
        month: 2,
        title: "Autonomous Firewall",
        desc: "AI-driven perimeter defense blocks 99.9% of novel exploits.",
        details: "Behavioral models scored sessions, payloads, and lateral movement in parallel so rulesets could adapt faster than static signatures.",
      },
      {
        year: "2024",
        month: 8,
        title: "Self-Healing Code",
        desc: "LLMs automatically patch vulnerabilities in production environments.",
        details: "Pipelines paired static analysis with runtime signals to propose minimal diffs and roll them through canaries before wide rollout.",
      },
    ],
    photos: [
      { src: "https://picsum.photos/seed/cyber-1/1200/600", alt: "Security dashboard" },
      { src: "https://picsum.photos/seed/cyber-2/600/400", alt: "Network nodes" },
      { src: "https://picsum.photos/seed/cyber-3/600/400", alt: "Encrypted data" },
    ],
    siteUrl: "https://example.com/paradigms/cyber-paradigm",
  },
  "neuro-paradigm": {
    achievements: [
      {
        year: "2023",
        month: 7,
        title: "Thought-to-Speech",
        desc: "A paralyzed patient communicates at 60 words per minute via BCI.",
        details: "Neural decoders mapped cortical activity to phoneme or word sequences fast enough for conversational pacing.",
      },
      {
        year: "2024",
        month: 4,
        title: "Neuromorphic Vision",
        desc: "Camera sensors that mimic the efficiency of the human retina.",
        details: "Event-based sensing and spiking networks cut bandwidth and power versus frame cameras for edge robotics and wearables.",
      },
    ],
    photos: [
      { src: "https://picsum.photos/seed/neuro-1/1200/600", alt: "Neural interface" },
      { src: "https://picsum.photos/seed/neuro-2/600/400", alt: "Brain mapping" },
      { src: "https://picsum.photos/seed/neuro-3/600/400", alt: "Synaptic electronics" },
    ],
    siteUrl: "https://example.com/paradigms/neuro-paradigm",
  },
  "crystal-paradigm": {
    achievements: [
      {
        year: "2023",
        month: 11,
        title: "2.2M New Materials",
        desc: "Scaling material discovery by 800 years of human effort.",
        details: "Generative models plus graph networks proposed candidates that were then filtered by DFT surrogates and stability heuristics at scale.",
      },
      {
        year: "2024",
        title: "AI-Optimized Solar",
        desc: "Perovskite efficiency boosted via autonomous lab experiments.",
        details: "Closed-loop labs varied composition, annealing, and layering while Bayesian or RL controllers proposed the next batches.",
      },
    ],
    photos: [
      { src: "https://picsum.photos/seed/crystal-1/1200/600", alt: "Crystal lattice" },
      { src: "https://picsum.photos/seed/crystal-2/600/400", alt: "Material analysis" },
      { src: "https://picsum.photos/seed/crystal-3/600/400", alt: "Quantum structure" },
    ],
    siteUrl: "https://example.com/paradigms/crystal-paradigm",
  },
  "nutra-paradigm": {
    achievements: [
      {
        year: "2022",
        month: 5,
        title: "Personalized Glycemic Map",
        desc: "AI predicts blood sugar spikes with 90% accuracy.",
        details: "Continuous glucose traces, meal logs, and wearables trained user-specific response models that surfaced likely spikes before they happened.",
      },
      {
        year: "2024",
        month: 10,
        title: "Generative Diets",
        desc: "Models design meals tailored to individual inflammatory markers.",
        details: "Constraint-aware generation balanced macros, allergens, cultural preferences, and lab targets into weekly plans.",
      },
    ],
    photos: [
      { src: "https://picsum.photos/seed/nutra-1/1200/600", alt: "Bio-data visualization" },
      { src: "https://picsum.photos/seed/nutra-2/600/400", alt: "Healthy ingredients" },
      { src: "https://picsum.photos/seed/nutra-3/600/400", alt: "Lab diagnostics" },
    ],
    siteUrl: "https://example.com/paradigms/nutra-paradigm",
  },
};

async function getDynamicDrugAchievements() {
  try {
    const response = await fetch("https://api.drugparadigm.com/paper/all");
    if (!response.ok) throw new Error("API unreachable");
    const papers = await response.json() as any[];
    
    // Sort by date (YYYY-MM-DD) descending and take top 5
    return papers
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 5)
      .map(p => {
        const [yearStr, monthStr] = p.date.split("-");
        return {
          year: yearStr,
          month: monthStr ? parseInt(monthStr, 10) : undefined,
          title: p.title.split(":")[0]?.trim() || p.title,
          desc: `Research by ${p.authors.slice(0, 2).join(", ")}${p.authors.length > 2 ? " et al." : ""}`,
          details: `${p.title}. Published on ${p.date}. Website: ${p.url}`
        };
      });
  } catch (error) {
    console.error("Scraping failed, falling back to static data:", error);
    return null;
  }
}

const router = Router();

router.get("/:id/scrape", async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const data = { ...paradigmsData[id] };

  if (!data) {
    res.status(404).json({ message: "Paradigm not found" });
    return;
  }

  // Handle dynamic scraping for drug-paradigm
  if (id === "drug-paradigm") {
    const dynamicAchievements = await getDynamicDrugAchievements();
    if (dynamicAchievements) {
      data.achievements = dynamicAchievements;
    }
    data.siteUrl = "https://drugparadigm.com/";
  }

  // Simulate latency of scraping
  setTimeout(() => {
    res.json(data);
  }, 1500);
});

export default router;
