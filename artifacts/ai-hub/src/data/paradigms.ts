import { Brain, Eye, MessageSquare, Dna, Bot, Network, NetworkIcon, LineChart } from "lucide-react";

export type Achievement = {
  year: string;
  title: string;
  /** One-line summary; shown when the achievement row is hovered. */
  desc: string;
  /** Longer copy for the detail dialog when the row is clicked. */
  details: string;
};

export type Photo = {
  src: string;
  alt: string;
};

export type Paradigm = {
  id: string;
  name: string;
  /** Placeholder: replace with the live site URL for this paradigm. */
  siteUrl: string;
  tagline: string;
  description: string;
  color: string;
  icon: any;
  topics: { title: string; desc: string }[];
  achievements: Achievement[];
  photos: Photo[];
};

const px = (seed: string, w = 800, h = 500) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const paradigms: Paradigm[] = [
  {
    id: "drug-paradigm",
    name: "DrugParadigm",
    siteUrl: "https://example.com/paradigms/drug-paradigm",
    tagline: "Accelerating discovery with molecular intelligence",
    description: "Leveraging deep learning to predict protein structures and simulate molecular interactions. This paradigm reduces the search space for life-saving therapeutics from decades to days.",
    color: "#10b981",
    icon: Dna,
    topics: [
      { title: "Protein Folding", desc: "Predicting 3D structures from amino acid sequences." },
      { title: "ADMET Prediction", desc: "Forecasting drug absorption, distribution, and toxicity." },
      { title: "De Novo Design", desc: "Generating entirely new molecules with specific properties." }
    ],
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
      { src: px("drug-1", 1200, 600), alt: "Molecular simulation" },
      { src: px("drug-2", 600, 400), alt: "Lab automation" },
      { src: px("drug-3", 600, 400), alt: "Protein structure" },
    ],
  },
  {
    id: "robo-paradigm",
    name: "RoboParadigm",
    siteUrl: "https://example.com/paradigms/robo-paradigm",
    tagline: "The bridge between silicon and steel",
    description: "Integrating advanced perception with dynamic control systems. RoboParadigm focuses on embodied agents that can navigate, manipulate, and learn within complex physical environments.",
    color: "#3b82f6",
    icon: Bot,
    topics: [
      { title: "End-to-End Control", desc: "Direct mapping from camera pixels to motor torques." },
      { title: "Sim-to-Real", desc: "Bridging the gap between physics engines and hardware." },
      { title: "Collaborative Bots", desc: "Robots designed to work safely alongside human teams." }
    ],
    achievements: [
      {
        year: "2021",
        title: "Neural Motion Planning",
        desc: "Real-time obstacle avoidance in dynamic human-centric spaces.",
        details:
          "Learned planners fused perception with control so mobile manipulators could re-route in milliseconds as people and objects moved unpredictably. Policies were trained with heavy simulation randomization and fine-tuned on hardware to close the sim-to-real gap. Swap in your lab’s metrics: collision rates, latency budgets, and deployment environments.",
      },
      {
        year: "2023",
        title: "General Purpose Humanoids",
        desc: "Scaling foundation models to complex bipedal manipulation tasks.",
        details:
          "Vision–language–action stacks began transferring skills across tasks—grasping, tool use, and navigation—without full retraining for each behavior. Whole-body control stayed stable by coupling low-level balance with high-level intent from multimodal models. Use this space for links to demos, hardware specs, and safety evaluations.",
      },
    ],
    photos: [
      { src: px("robo-1", 1200, 600), alt: "Humanoid robot" },
      { src: px("robo-2", 600, 400), alt: "Robotic assembly" },
      { src: px("robo-3", 600, 400), alt: "Spatial mapping" },
    ],
  },
  {
    id: "cyber-paradigm",
    name: "CyberParadigm",
    siteUrl: "https://example.com/paradigms/cyber-paradigm",
    tagline: "Autonomous defense for a digital world",
    description: "Redefining security through predictive analytics and autonomous response. CyberParadigm shifts the focus from reactive patching to proactive, self-healing network infrastructures.",
    color: "#f59e0b",
    icon: Network,
    topics: [
      { title: "Threat Hunting", desc: "Autonomous agents identifying zero-day vulnerabilities." },
      { title: "Anomaly Detection", desc: "Spotting behavioral shifts in massive telemetry data." },
      { title: "Automated Response", desc: "Neutralizing threats at wire-speed without human intervention." }
    ],
    achievements: [
      {
        year: "2022",
        title: "Autonomous Firewall",
        desc: "AI-driven perimeter defense blocks 99.9% of novel exploits.",
        details:
          "Behavioral models scored sessions, payloads, and lateral movement in parallel so rulesets could adapt faster than static signatures. The system emphasized false-positive budgets so SOC teams weren’t flooded during incidents. Replace percentages with your audited detection and response SLAs.",
      },
      {
        year: "2024",
        title: "Self-Healing Code",
        desc: "LLMs automatically patch vulnerabilities in production environments.",
        details:
          "Pipelines paired static analysis with runtime signals to propose minimal diffs and roll them through canaries before wide rollout. Human approval gates stayed in place for regulated stacks. Document here your change-management policy and rollback guarantees.",
      },
    ],
    photos: [
      { src: px("cyber-1", 1200, 600), alt: "Security dashboard" },
      { src: px("cyber-2", 600, 400), alt: "Network nodes" },
      { src: px("cyber-3", 600, 400), alt: "Encrypted data" },
    ],
  },
  {
    id: "neuro-paradigm",
    name: "NeuroParadigm",
    siteUrl: "https://example.com/paradigms/neuro-paradigm",
    tagline: "Connecting minds and machines",
    description: "Decoding the language of the brain to restore function and enhance cognition. NeuroParadigm explores the frontier of high-bandwidth neural interfaces and neuromorphic hardware.",
    color: "#8b5cf6",
    icon: Brain,
    topics: [
      { title: "Motor Decoding", desc: "Translating neural spikes into digital or physical action." },
      { title: "Neural Modulation", desc: "Targeted stimulation to treat neurological conditions." },
      { title: "BCI-LLM Bridge", desc: "Enabling direct thought-to-text communication." }
    ],
    achievements: [
      {
        year: "2023",
        title: "Thought-to-Speech",
        desc: "A paralyzed patient communicates at 60 words per minute via BCI.",
        details:
          "Neural decoders mapped cortical activity to phoneme or word sequences fast enough for conversational pacing, with personalized calibration over weeks. Privacy and consent frameworks were central because data is deeply sensitive. Add your institutional review details and participant-facing summaries here.",
      },
      {
        year: "2024",
        title: "Neuromorphic Vision",
        desc: "Camera sensors that mimic the efficiency of the human retina.",
        details:
          "Event-based sensing and spiking networks cut bandwidth and power versus frame cameras for edge robotics and wearables. Co-design of silicon and training objectives mattered as much as model scale. Link to datasheets, power curves, and benchmark suites you trust.",
      },
    ],
    photos: [
      { src: px("neuro-1", 1200, 600), alt: "Neural interface" },
      { src: px("neuro-2", 600, 400), alt: "Brain mapping" },
      { src: px("neuro-3", 600, 400), alt: "Synaptic electronics" },
    ],
  },
  {
    id: "crystal-paradigm",
    name: "CrystalParadigm",
    siteUrl: "https://example.com/paradigms/crystal-paradigm",
    tagline: "Architecting matter from the atom up",
    description: "Discovering high-performance materials through computational alchemy. CrystalParadigm uses generative models to explore the vast space of possible crystal structures for energy and tech.",
    color: "#06b6d4",
    icon: NetworkIcon,
    topics: [
      { title: "GNoME Project", desc: "DeepMind's discovery of 2.2 million new stable crystals." },
      { title: "Battery Innovation", desc: "Simulating solid-state electrolytes for faster charging." },
      { title: "Superconductors", desc: "Predicting materials that conduct without resistance." }
    ],
    achievements: [
      {
        year: "2023",
        title: "2.2M New Materials",
        desc: "Scaling material discovery by 800 years of human effort.",
        details:
          "Generative models plus graph networks proposed candidates that were then filtered by DFT surrogates and stability heuristics at scale. The result was a searchable landscape of inorganic crystals beyond manual intuition. Cite your validation pipeline and any experimental confirmations you want highlighted.",
      },
      {
        year: "2024",
        title: "AI-Optimized Solar",
        desc: "Perovskite efficiency boosted via autonomous lab experiments.",
        details:
          "Closed-loop labs varied composition, annealing, and layering while Bayesian or RL controllers proposed the next batches. Human operators set safety envelopes and target metrics. Drop in your champion device figures and reproducibility notes.",
      },
    ],
    photos: [
      { src: px("crystal-1", 1200, 600), alt: "Crystal lattice" },
      { src: px("crystal-2", 600, 400), alt: "Material analysis" },
      { src: px("crystal-3", 600, 400), alt: "Quantum structure" },
    ],
  },
  {
    id: "nutra-paradigm",
    name: "NutraParadigm",
    siteUrl: "https://example.com/paradigms/nutra-paradigm",
    tagline: "Personalizing health through precision biology",
    description: "Analyzing the complex interplay between diet, microbiome, and metabolism. NutraParadigm uses AI to design bespoke nutritional interventions for optimal human performance.",
    color: "#ec4899",
    icon: LineChart,
    topics: [
      { title: "Microbiome Analysis", desc: "Decoding the trillions of bacteria governing health." },
      { title: "Metabolic Modeling", desc: "Predicting glucose response to specific food inputs." },
      { title: "Bio-Feedback", desc: "Real-time nutritional adjustment based on wearable data." }
    ],
    achievements: [
      {
        year: "2022",
        title: "Personalized Glycemic Map",
        desc: "AI predicts blood sugar spikes with 90% accuracy.",
        details:
          "Continuous glucose traces, meal logs, and wearables trained user-specific response models that surfaced likely spikes before they happened. Clinicians could compare scenarios for meal timing and composition. Replace accuracy claims with your study design, cohort size, and regulatory disclaimers.",
      },
      {
        year: "2024",
        title: "Generative Diets",
        desc: "Models design meals tailored to individual inflammatory markers.",
        details:
          "Constraint-aware generation balanced macros, allergens, cultural preferences, and lab targets into weekly plans shoppers could actually buy. Feedback loops tightened as new biomarkers arrived. Add your nutritionist oversight model and data-use policy here.",
      },
    ],
    photos: [
      { src: px("nutra-1", 1200, 600), alt: "Bio-data visualization" },
      { src: px("nutra-2", 600, 400), alt: "Healthy ingredients" },
      { src: px("nutra-3", 600, 400), alt: "Lab diagnostics" },
    ],
  },
];
