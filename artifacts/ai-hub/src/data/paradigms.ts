import { Brain, Eye, MessageSquare, Dna, Bot, Network, NetworkIcon, LineChart } from "lucide-react";

export type Achievement = {
  year: string;
  month?: number; // 1-12
  title: string;
  /** One-line summary; shown when the achievement row is hovered. */
  desc: string;
  /** Longer copy for the detail dialog when the row is clicked. */
  details: string;
  /** Optional URL to redirect to when clicked */
  url?: string;
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
  achievements?: Achievement[];
  photos?: Photo[];
};

const px = (seed: string, w = 800, h = 500) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const paradigms: Paradigm[] = [
  {
    id: "drug-paradigm",
    name: "DrugParadigm",
    siteUrl: "https://drugparadigm.com/",
    tagline: "Accelerating discovery with molecular intelligence",
    description: "Leveraging deep learning to predict protein structures and simulate molecular interactions. This paradigm reduces the search space for life-saving therapeutics from decades to days.",
    color: "#10b981",
    icon: Dna,
    topics: [
      { title: "Protein Folding", desc: "Predicting 3D structures from amino acid sequences." },
      { title: "ADMET Prediction", desc: "Forecasting drug absorption, distribution, and toxicity." },
      { title: "De Novo Design", desc: "Generating entirely new molecules with specific properties." }
    ],
    achievements: [],
    photos: [],
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
    achievements: [],
    photos: [],
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
    achievements: [],
    photos: [],
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
    achievements: [],
    photos: [],
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
    achievements: [],
    photos: [],
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
    achievements: [],
    photos: [],
  },
];
