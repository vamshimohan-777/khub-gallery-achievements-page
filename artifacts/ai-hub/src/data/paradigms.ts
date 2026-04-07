import { Brain, Eye, MessageSquare, Dna, Bot, Network, NetworkIcon, LineChart } from "lucide-react";

export type Achievement = {
  year: string;
  title: string;
  desc: string;
};

export type Photo = {
  src: string;
  alt: string;
};

export type Paradigm = {
  id: string;
  name: string;
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
      { year: "2020", title: "AlphaFold 2", desc: "A breakthrough in biology solving the 50-year-old protein folding problem." },
      { year: "2022", title: "AI-Designed Drug Trials", desc: "First molecule designed by AI enters Phase II human clinical trials." },
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
      { year: "2021", title: "Neural Motion Planning", desc: "Real-time obstacle avoidance in dynamic human-centric spaces." },
      { year: "2023", title: "General Purpose Humanoids", desc: "Scaling foundation models to complex bipedal manipulation tasks." },
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
      { year: "2022", title: "Autonomous Firewall", desc: "AI-driven perimeter defense blocks 99.9% of novel exploits." },
      { year: "2024", title: "Self-Healing Code", desc: "LLMs automatically patch vulnerabilities in production environments." },
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
      { year: "2023", title: "Thought-to-Speech", desc: "A paralyzed patient communicates at 60 words per minute via BCI." },
      { year: "2024", title: "Neuromorphic Vision", desc: "Camera sensors that mimic the efficiency of the human retina." },
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
      { year: "2023", title: "2.2M New Materials", desc: "Scaling material discovery by 800 years of human effort." },
      { year: "2024", title: "AI-Optimized Solar", desc: "Perovskite efficiency boosted via autonomous lab experiments." },
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
      { year: "2022", title: "Personalized Glycemic Map", desc: "AI predicts blood sugar spikes with 90% accuracy." },
      { year: "2024", title: "Generative Diets", desc: "Models design meals tailored to individual inflammatory markers." },
    ],
    photos: [
      { src: px("nutra-1", 1200, 600), alt: "Bio-data visualization" },
      { src: px("nutra-2", 600, 400), alt: "Healthy ingredients" },
      { src: px("nutra-3", 600, 400), alt: "Lab diagnostics" },
    ],
  },
];
