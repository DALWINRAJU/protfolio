export const projects = [
  {
    id: "annapoorna",
    title: "Annapoorna – Food Sharing & Donation Platform",
    category: "Full-Stack Web & Map Application",
    color: "#10b981",
    shortDescription: "A map-based food donation platform connecting donors with orphanages and care homes using Spring Boot, Thymeleaf, Leaflet.js, and MySQL.",
    tags: ["Spring Boot", "Thymeleaf", "Bootstrap", "MySQL", "Leaflet.js", "REST APIs"],
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://anapoorna-frontend.onrender.com/",
    caseStudy: {
      overview: "Annapoorna is a full-stack, map-integrated food donation platform engineered to bridge the gap between food donors and receiving institutions like orphanages and elderly care homes to reduce food waste.",
      challenge: "Matching donors with nearby recipients efficiently while ensuring real-time location mapping, responsive cross-device access, and transparent donation post management.",
      approach: "Built a robust Spring Boot REST backend with MySQL relational data models, combined with Leaflet.js interactive maps and OpenStreetMap for real-time location pinning and proximity recommendation logic.",
      solution: "Developed RESTful APIs, full CRUD post management, dynamic image uploading, location-based filtering, and a mobile-friendly Bootstrap UI.",
      technologies: ["Spring Boot", "Thymeleaf", "Bootstrap", "MySQL", "Leaflet.js", "OpenStreetMap", "Java"],
      keyFeatures: [
        "Interactive Leaflet.js & OpenStreetMap real-time location pinning",
        "Nearby recipient recommendation logic for optimal donation matching",
        "Full CRUD functionality for listings, user profiles & location data",
        "Image upload support for donation posts ensuring trust & transparency",
        "Location-based filtering to quickly discover donation opportunities"
      ],
      performance: "Optimized spatial database queries for fast local recipient matching with zero-lag map rendering.",
      outcome: "Successfully deployed and demonstrated as a production-ready food waste reduction workflow.",
      results: "Live deployment on Render connecting community donors with care institutions."
    }
  },
  {
    id: "nova-ai",
    title: "Nova AI – Intelligent Voice-Enabled Assistant",
    category: "AI & Voice Assistant Application",
    color: "#00d9ff",
    shortDescription: "An AI-powered virtual assistant featuring voice recognition, speech synthesis, and natural language query processing built with React.js.",
    tags: ["React.js", "AI Integration", "REST APIs", "Web Speech API", "UI/UX Design"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://ai-nova-xidg.vercel.app",
    caseStudy: {
      overview: "Nova AI is an intelligent virtual assistant designed with a sleek React.js interface, allowing users to interact seamlessly through natural voice commands or text input.",
      challenge: "Delivering fast, context-aware AI responses with low-latency speech input and output processing while maintaining a clean, distraction-free UI/UX.",
      approach: "Integrated advanced NLP/AI APIs with browser speech recognition and synthesis APIs into a modular, component-driven React architecture.",
      solution: "Created hands-free voice interaction loops, fluid visual feedback states, responsive conversational layouts, and clean API integration handlers.",
      technologies: ["React.js", "AI/NLP APIs", "Web Speech API", "JavaScript", "CSS3"],
      keyFeatures: [
        "Voice input recognition and text-to-speech output synthesis",
        "Context-aware AI conversational understanding and response generation",
        "Clean, intuitive UI/UX focused on usability and conversational flow",
        "Structured reusable React components and flexible API integration layer"
      ],
      performance: "Achieved instantaneous speech parsing and sub-second conversational response rendering.",
      outcome: "Deployed live on Vercel as a flagship voice-enabled AI web assistant.",
      results: "High user engagement with smooth hands-free interaction across desktop and mobile browsers."
    }
  },
  {
    id: "portfolio-website",
    title: "Personal Developer & UI/UX Portfolio",
    category: "Developer Portfolio & Showcase",
    color: "#a855f7",
    shortDescription: "A fully responsive personal portfolio designed and developed to highlight projects, technical skills, and UI/UX case studies.",
    tags: ["React.js", "HTML5", "CSS3", "Figma", "UI/UX Design", "Responsive Design"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://github.com/DALWINRAJU",
    caseStudy: {
      overview: "A flagship personal portfolio website designed from wireframes to final code to present software engineering projects, UI/UX design case studies, and technical achievements.",
      challenge: "Balancing high-end interactive visual design with fast performance, accessibility standards, and intuitive navigation.",
      approach: "Conducted user research and designed high-fidelity wireframes in Figma before translating concepts into modular React.js components with modern CSS styling.",
      solution: "Built a fully responsive layout with micro-interactions, clean component structure, and optimized asset delivery.",
      technologies: ["React.js", "HTML5", "CSS3", "Figma", "JavaScript"],
      keyFeatures: [
        "Figma wireframes and high-fidelity prototypes following design thinking",
        "Component-based architecture optimizing scalability and maintainability",
        "Cross-device responsive design with micro-animations and dark mode UI",
        "Comprehensive project case study showcases and technical breakdown"
      ],
      performance: "100/100 Lighthouse performance and accessibility scores with sub-second page loads.",
      outcome: "Created an authoritative digital hub showcasing full-stack capabilities and design fundamentals.",
      results: "Used as personal developer portfolio showcasing real-world applications."
    }
  },
  {
    id: "aura-ai-todo",
    title: "Aura — AI Voice Todo List",
    category: "Voice-Enabled Productivity App",
    color: "#f59e0b",
    shortDescription: "A premium glassmorphism AI to-do application featuring natural language date parsing, smart voice reminders, and drag-and-drop task sorting.",
    tags: ["HTML5", "CSS3", "JavaScript", "Web Speech API", "chrono-node", "Glassmorphism UI"],
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://ai-todo-rho-two.vercel.app/",
    caseStudy: {
      overview: "Aura is a client-side productivity application that lets users manage tasks through natural voice commands or typing, featuring automated date parsing and browser notification scheduling.",
      challenge: "Parsing natural language date expressions (e.g. 'meeting tomorrow at 6 PM') directly in the client without backend latency or privacy concerns.",
      approach: "Combined chrono-node natural language processing with Web Speech API and client-side LocalStorage state persistence.",
      solution: "Engineered a glassmorphism interface with drag-and-drop task reordering, built-in calendar view, and automated notification timers.",
      technologies: ["HTML5", "CSS3", "Vanilla JavaScript", "Web Speech API", "chrono-node"],
      keyFeatures: [
        "Voice & text task creation with natural language date parsing",
        "Smart voice reminders & browser notifications without manual timer setup",
        "Tactile drag-and-drop task sorting & interactive calendar planning view",
        "100% client-side execution ensuring zero backend latency & complete data privacy"
      ],
      performance: "Zero backend dependency delivering instantaneous offline-first task operations.",
      outcome: "Deployed live on Vercel as an intuitive, privacy-focused voice task manager.",
      results: "Featured as a key interactive AI productivity project."
    }
  }
];

