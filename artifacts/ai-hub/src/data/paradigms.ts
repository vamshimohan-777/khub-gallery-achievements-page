import { Brain, Eye, MessageSquare, Dna, Bot, Network, NetworkIcon, LineChart } from "lucide-react";

export type Paradigm = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  color: string;
  icon: any;
  topics: { title: string; desc: string }[];
};

export const paradigms: Paradigm[] = [
  {
    id: "computer-vision",
    name: "Computer Vision",
    tagline: "Machines that see in pixels and depth",
    description: "Extracting meaning from the visual world. Computer Vision enables systems to derive high-level understanding from digital images, videos, and other visual inputs, transforming raw pixel data into structured reality.",
    color: "#00f0ff",
    icon: Eye,
    topics: [
      { title: "Object Detection", desc: "Identifying and localizing entities within an image frame with bounding boxes." },
      { title: "Semantic Segmentation", desc: "Pixel-perfect classification classifying each pixel into a corresponding class." },
      { title: "Image Generation", desc: "Synthesizing entirely new images from latent noise distributions." }
    ]
  },
  {
    id: "nlp",
    name: "Natural Language Processing",
    tagline: "Understanding human language",
    description: "The intersection of computer science and linguistics. NLP gives machines the ability to read, understand, and derive meaning from human languages, powering the next generation of conversational agents.",
    color: "#ff00ff",
    icon: MessageSquare,
    topics: [
      { title: "Large Language Models", desc: "Massive transformer networks predicting the next token with emergent reasoning." },
      { title: "Sentiment Analysis", desc: "Extracting subjective information and emotional intent from raw text." },
      { title: "Machine Translation", desc: "Mapping semantic meaning across different linguistic spaces seamlessly." }
    ]
  },
  {
    id: "reinforcement-learning",
    name: "Reinforcement Learning",
    tagline: "Learning through reward and consequence",
    description: "Training autonomous agents to make sequences of decisions. By interacting with complex environments and maximizing cumulative rewards, RL agents solve problems that are too complex for traditional programming.",
    color: "#00ff66",
    icon: Brain,
    topics: [
      { title: "Policy Gradients", desc: "Optimizing the policy function directly to find the optimal behavioral strategy." },
      { title: "Q-Learning", desc: "Estimating the value of taking specific actions in specific states." },
      { title: "Multi-Agent Systems", desc: "Environments where multiple learning agents interact, compete, or cooperate." }
    ]
  },
  {
    id: "generative-ai",
    name: "Generative AI",
    tagline: "Creating images, text, and entire worlds",
    description: "Moving beyond analysis into synthesis. Generative AI learns the underlying patterns and distributions of data to generate novel, highly realistic content across modalities—from art to code to synthetic biology.",
    color: "#ffaa00",
    icon: Dna,
    topics: [
      { title: "Diffusion Models", desc: "Iteratively denoising random signals to construct structured, coherent outputs." },
      { title: "GANs", desc: "Generative Adversarial Networks pitting a generator against a discriminator." },
      { title: "Multimodal Generation", desc: "Bridging text, audio, and visual spaces to create composite outputs." }
    ]
  },
  {
    id: "robotics",
    name: "Robotics & Perception",
    tagline: "Embodied intelligence in the physical world",
    description: "Where artificial intelligence meets physical mechanics. Modern robotics combines deep learning with control theory to create embodied agents capable of navigating, manipulating, and understanding the real world.",
    color: "#00e676",
    icon: Bot,
    topics: [
      { title: "Sim-to-Real Transfer", desc: "Training policies in simulated physics engines and deploying them to physical robots." },
      { title: "Kinematics", desc: "The mathematics of motion without considering the forces that cause it." },
      { title: "Spatial Mapping", desc: "Constructing internal representations of the physical environment (SLAM)." }
    ]
  },
  {
    id: "gnn",
    name: "Graph Neural Networks",
    tagline: "Learning from relationships",
    description: "Deep learning on non-Euclidean data structures. GNNs operate directly on graph structures, making them uniquely suited for analyzing social networks, molecular structures, and complex interaction webs.",
    color: "#aa00ff",
    icon: Network,
    topics: [
      { title: "Message Passing", desc: "Updating node representations based on the aggregated state of their neighbors." },
      { title: "Link Prediction", desc: "Inferring the existence or probability of edges between entities in a graph." },
      { title: "Node Classification", desc: "Determining the category or properties of individual vertices in a network." }
    ]
  },
  {
    id: "federated-learning",
    name: "Federated Learning",
    tagline: "Distributed intelligence without sharing raw data",
    description: "Training machine learning models across decentralized edge devices or servers holding local data samples, without exchanging them. This paradigm enables privacy-preserving AI at a global scale.",
    color: "#00ffff",
    icon: NetworkIcon,
    topics: [
      { title: "Differential Privacy", desc: "Adding calibrated noise to ensure individual data points cannot be extracted." },
      { title: "Secure Aggregation", desc: "Cryptographic techniques to combine model updates without revealing local gradients." },
      { title: "Edge Computing", desc: "Pushing inference and lightweight training to the periphery of the network." }
    ]
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
      { title: "Anomaly Detection", desc: "Identifying rare items, events or observations which raise suspicions by differing significantly." }
    ]
  }
];