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
    id: "computer-vision",
    name: "Computer Vision",
    tagline: "Machines that see in pixels and depth",
    description: "Extracting meaning from the visual world. Computer Vision enables systems to derive high-level understanding from digital images, videos, and other visual inputs.",
    color: "#00f0ff",
    icon: Eye,
    topics: [
      { title: "Object Detection", desc: "Identifying and localizing entities within an image frame with bounding boxes." },
      { title: "Semantic Segmentation", desc: "Pixel-perfect classification classifying each pixel into a corresponding class." },
      { title: "Image Generation", desc: "Synthesizing entirely new images from latent noise distributions." }
    ],
    achievements: [
      { year: "2012", title: "AlexNet ImageNet Win", desc: "Deep CNN slashes image classification error by 10% — igniting the deep learning era." },
      { year: "2015", title: "ResNet surpasses human vision", desc: "Residual networks hit 3.57% top-5 error on ImageNet, below human baseline." },
      { year: "2020", title: "DALL·E arrives", desc: "OpenAI generates coherent images from arbitrary text prompts." },
      { year: "2023", title: "Segment Anything Model", desc: "Meta releases SAM — zero-shot segmentation at scale across any domain." },
    ],
    photos: [
      { src: px("cv-hero", 1200, 600), alt: "Computer vision hero" },
      { src: px("cv-1", 600, 400), alt: "Visual recognition" },
      { src: px("cv-2", 600, 400), alt: "Object detection" },
      { src: px("cv-3", 600, 800), alt: "Image segmentation" },
      { src: px("cv-4", 600, 400), alt: "Deep learning layers" },
      { src: px("cv-5", 600, 400), alt: "Neural network visualization" },
    ],
  },
  {
    id: "nlp",
    name: "Natural Language Processing",
    tagline: "Understanding human language at scale",
    description: "The intersection of computer science and linguistics. NLP gives machines the ability to read, understand, and derive meaning from human languages.",
    color: "#ff00ff",
    icon: MessageSquare,
    topics: [
      { title: "Large Language Models", desc: "Massive transformer networks predicting the next token with emergent reasoning." },
      { title: "Sentiment Analysis", desc: "Extracting subjective information and emotional intent from raw text." },
      { title: "Machine Translation", desc: "Mapping semantic meaning across different linguistic spaces seamlessly." }
    ],
    achievements: [
      { year: "2017", title: "Attention Is All You Need", desc: "Vaswani et al. introduce the Transformer — the backbone of modern AI." },
      { year: "2018", title: "BERT pre-training", desc: "Bidirectional transformers learn deep language context from unlabeled text." },
      { year: "2020", title: "GPT-3 released", desc: "175 billion parameters. Few-shot learning. The world changes." },
      { year: "2023", title: "ChatGPT: 100M users in 60 days", desc: "Fastest product adoption in history. RLHF-aligned dialogue AI goes mainstream." },
    ],
    photos: [
      { src: px("nlp-hero", 1200, 600), alt: "Language processing hero" },
      { src: px("nlp-1", 600, 400), alt: "Text processing" },
      { src: px("nlp-2", 600, 400), alt: "Conversation AI" },
      { src: px("nlp-3", 600, 800), alt: "Language patterns" },
      { src: px("nlp-4", 600, 400), alt: "Word embeddings" },
      { src: px("nlp-5", 600, 400), alt: "Tokenization" },
    ],
  },
  {
    id: "reinforcement-learning",
    name: "Reinforcement Learning",
    tagline: "Learning through reward and consequence",
    description: "Training autonomous agents to make sequences of decisions. By interacting with environments and maximizing cumulative rewards, RL agents solve problems too complex for traditional programming.",
    color: "#00ff66",
    icon: Brain,
    topics: [
      { title: "Policy Gradients", desc: "Optimizing the policy function directly to find the optimal behavioral strategy." },
      { title: "Q-Learning", desc: "Estimating the value of taking specific actions in specific states." },
      { title: "Multi-Agent Systems", desc: "Environments where multiple learning agents interact, compete, or cooperate." }
    ],
    achievements: [
      { year: "2013", title: "DQN masters Atari", desc: "DeepMind's DQN learns to play 49 Atari games from raw pixels alone." },
      { year: "2016", title: "AlphaGo defeats Lee Sedol", desc: "A 4-1 victory over the world Go champion shocks the AI community." },
      { year: "2019", title: "OpenAI Five wins Dota 2", desc: "Five coordinated RL agents defeat world champion Dota 2 team OG." },
      { year: "2022", title: "AlphaTensor discovers new algorithms", desc: "RL agent finds novel matrix multiplication algorithms faster than human-known ones." },
    ],
    photos: [
      { src: px("rl-hero", 1200, 600), alt: "Reinforcement learning hero" },
      { src: px("rl-1", 600, 400), alt: "Agent environment loop" },
      { src: px("rl-2", 600, 400), alt: "Game AI" },
      { src: px("rl-3", 600, 800), alt: "Reward landscape" },
      { src: px("rl-4", 600, 400), alt: "Policy optimization" },
      { src: px("rl-5", 600, 400), alt: "Multi-agent system" },
    ],
  },
  {
    id: "generative-ai",
    name: "Generative AI",
    tagline: "Creating images, text, and entire worlds",
    description: "Moving beyond analysis into synthesis. Generative AI learns underlying patterns of data to create novel, realistic content across modalities — from art to code to synthetic biology.",
    color: "#ffaa00",
    icon: Dna,
    topics: [
      { title: "Diffusion Models", desc: "Iteratively denoising random signals to construct structured, coherent outputs." },
      { title: "GANs", desc: "Generative Adversarial Networks pitting a generator against a discriminator." },
      { title: "Multimodal Generation", desc: "Bridging text, audio, and visual spaces to create composite outputs." }
    ],
    achievements: [
      { year: "2014", title: "GANs invented", desc: "Ian Goodfellow's adversarial framework opens the door to AI-generated imagery." },
      { year: "2021", title: "DALL·E & CLIP", desc: "OpenAI connects language and vision — type any scene, get a painting." },
      { year: "2022", title: "Stable Diffusion open-sourced", desc: "High-fidelity image generation in an open model anyone can run." },
      { year: "2024", title: "Sora generates video", desc: "OpenAI's Sora produces minute-long photorealistic video from text prompts." },
    ],
    photos: [
      { src: px("gen-hero", 1200, 600), alt: "Generative AI hero" },
      { src: px("gen-1", 600, 400), alt: "AI generated art" },
      { src: px("gen-2", 600, 400), alt: "Diffusion process" },
      { src: px("gen-3", 600, 800), alt: "GAN output" },
      { src: px("gen-4", 600, 400), alt: "Latent space" },
      { src: px("gen-5", 600, 400), alt: "Multimodal generation" },
    ],
  },
  {
    id: "robotics",
    name: "Robotics & Perception",
    tagline: "Embodied intelligence in the physical world",
    description: "Where artificial intelligence meets physical mechanics. Modern robotics combines deep learning with control theory to create embodied agents capable of navigating and manipulating the real world.",
    color: "#00e676",
    icon: Bot,
    topics: [
      { title: "Sim-to-Real Transfer", desc: "Training policies in simulated physics engines and deploying them to physical robots." },
      { title: "Kinematics", desc: "The mathematics of motion without considering the forces that cause it." },
      { title: "Spatial Mapping", desc: "Constructing internal representations of the physical environment (SLAM)." }
    ],
    achievements: [
      { year: "2016", title: "Boston Dynamics Atlas backflips", desc: "A bipedal robot achieves dynamic, unscripted parkour — a milestone in control." },
      { year: "2019", title: "OpenAI Dactyl solves Rubik's cube", desc: "A robotic hand trained purely in simulation solves any scrambled Rubik's cube." },
      { year: "2022", title: "RT-1: Robotics Transformer", desc: "Google's transformer-based model learns 700+ robotic tasks from demonstration." },
      { year: "2024", title: "Figure 01 walks with LLM reasoning", desc: "A humanoid robot reasons with GPT-4 to complete real-world manipulation tasks." },
    ],
    photos: [
      { src: px("rob-hero", 1200, 600), alt: "Robotics hero" },
      { src: px("rob-1", 600, 400), alt: "Robot arm" },
      { src: px("rob-2", 600, 400), alt: "Autonomous navigation" },
      { src: px("rob-3", 600, 800), alt: "Humanoid robot" },
      { src: px("rob-4", 600, 400), alt: "Sensor perception" },
      { src: px("rob-5", 600, 400), alt: "SLAM mapping" },
    ],
  },
  {
    id: "gnn",
    name: "Graph Neural Networks",
    tagline: "Learning from relationships and structure",
    description: "Deep learning on non-Euclidean data structures. GNNs operate directly on graphs, making them uniquely suited for social networks, molecular structures, and complex interaction webs.",
    color: "#aa00ff",
    icon: Network,
    topics: [
      { title: "Message Passing", desc: "Updating node representations based on the aggregated state of their neighbors." },
      { title: "Link Prediction", desc: "Inferring the existence or probability of edges between entities in a graph." },
      { title: "Node Classification", desc: "Determining the category or properties of individual vertices in a network." }
    ],
    achievements: [
      { year: "2017", title: "Graph Convolutional Networks", desc: "Kipf & Welling's semi-supervised node classification landmark paper." },
      { year: "2020", title: "AlphaFold 2 structure prediction", desc: "GNN-backed system predicts protein 3D structure with atomic accuracy." },
      { year: "2021", title: "GNNs in drug discovery", desc: "Molecular GNNs accelerate lead candidate identification by 10× at major pharma." },
      { year: "2023", title: "GNoME discovers 2.2M crystals", desc: "Google DeepMind's GNN discovers millions of new stable crystal structures." },
    ],
    photos: [
      { src: px("gnn-hero", 1200, 600), alt: "Graph neural networks hero" },
      { src: px("gnn-1", 600, 400), alt: "Network graph" },
      { src: px("gnn-2", 600, 400), alt: "Molecular structure" },
      { src: px("gnn-3", 600, 800), alt: "Social network" },
      { src: px("gnn-4", 600, 400), alt: "Knowledge graph" },
      { src: px("gnn-5", 600, 400), alt: "Node classification" },
    ],
  },
  {
    id: "federated-learning",
    name: "Federated Learning",
    tagline: "Distributed intelligence, private by design",
    description: "Training ML models across decentralized edge devices without sharing raw data. This paradigm enables privacy-preserving AI at a global scale while keeping sensitive data local.",
    color: "#00ffff",
    icon: NetworkIcon,
    topics: [
      { title: "Differential Privacy", desc: "Adding calibrated noise to ensure individual data points cannot be extracted." },
      { title: "Secure Aggregation", desc: "Cryptographic techniques to combine model updates without revealing local gradients." },
      { title: "Edge Computing", desc: "Pushing inference and lightweight training to the periphery of the network." }
    ],
    achievements: [
      { year: "2017", title: "Google proposes Federated Learning", desc: "McMahan et al. publish the founding paper — FL trains on millions of phones." },
      { year: "2019", title: "Federated NLP on Android keyboards", desc: "GBoard learns next-word prediction from phones without reading private text." },
      { year: "2021", title: "FL for COVID-19 detection", desc: "Hospitals across 5 continents train a pneumonia detector without sharing patient scans." },
      { year: "2023", title: "Flower framework hits 1M downloads", desc: "Open-source FL framework Flower standardizes federated research globally." },
    ],
    photos: [
      { src: px("fed-hero", 1200, 600), alt: "Federated learning hero" },
      { src: px("fed-1", 600, 400), alt: "Distributed network" },
      { src: px("fed-2", 600, 400), alt: "Privacy computing" },
      { src: px("fed-3", 600, 800), alt: "Edge devices" },
      { src: px("fed-4", 600, 400), alt: "Secure aggregation" },
      { src: px("fed-5", 600, 400), alt: "Encrypted learning" },
    ],
  },
  {
    id: "time-series",
    name: "Time Series & Forecasting",
    tagline: "Predicting the future from the past",
    description: "Analyzing sequences of data points collected over time. Advanced forecasting models extract temporal dynamics, seasonality, and complex dependencies to predict future states in chaotic systems.",
    color: "#ff6600",
    icon: LineChart,
    topics: [
      { title: "Temporal Convolution", desc: "Applying 1D convolutions to capture localized patterns across time steps." },
      { title: "State Space Models", desc: "Mathematical frameworks representing systems as evolving hidden states." },
      { title: "Anomaly Detection", desc: "Identifying rare events that raise suspicions by differing significantly from the norm." }
    ],
    achievements: [
      { year: "2017", title: "DeepAR for probabilistic forecasting", desc: "Amazon's autoregressive RNN produces calibrated uncertainty bounds at scale." },
      { year: "2019", title: "N-BEATS wins M4 competition", desc: "Pure deep learning model outperforms all ensembles on 100,000 time series." },
      { year: "2021", title: "Temporal Fusion Transformer", desc: "Google's TFT achieves state-of-the-art on interpretable multi-horizon forecasting." },
      { year: "2024", title: "TimesFM: Foundation model for time", desc: "Google releases a pre-trained 200M parameter zero-shot forecasting model." },
    ],
    photos: [
      { src: px("ts-hero", 1200, 600), alt: "Time series hero" },
      { src: px("ts-1", 600, 400), alt: "Time series charts" },
      { src: px("ts-2", 600, 400), alt: "Forecasting model" },
      { src: px("ts-3", 600, 800), alt: "Anomaly detection" },
      { src: px("ts-4", 600, 400), alt: "Temporal patterns" },
      { src: px("ts-5", 600, 400), alt: "Prediction waves" },
    ],
  },
];
