export interface DegreePath {
  id: string;
  name: string;
  category: 'Engineering' | 'Information Technology' | 'Healthcare & Medicine' | 'Data & AI';
  image: string;
  tagline: string;
  description: string;
  growthRate: string;
  medianSalary: string;
  entrySalary: string;
  seniorSalary: string;
  keySkills: string[];
  coreCurriculum: {
    year: string;
    focus: string;
    keySubjects: string[];
  }[];
  topRoles: {
    role: string;
    compensation: string;
    demand: string;
    description: string;
  }[];
  recommendedCertifications: string[];
  dayInTheLifeHighlights: string[];
}

export interface VideoBrief {
  id: string;
  title: string;
  degreeCategory: string;
  durationSeconds: number; // between 180 and 245 seconds (3 to 4 mins)
  durationFormatted: string;
  speaker: string;
  speakerRole: string;
  summary: string;
  thumbnail: string;
  youtubeId: string;
  youtubeEmbedUrl: string;
  chapters: { time: string; title: string }[];
  takeaways: string[];
  transcriptExcerpt: string;
}

export interface AssessmentQuestion {
  id: number;
  category: 'hardware' | 'software' | 'healthcare' | 'leadership' | 'data';
  categoryLabel: string;
  prompt: string;
  options: {
    label: string;
    text: string;
    weights: {
      hardware?: number;
      software?: number;
      healthcare?: number;
      leadership?: number;
      data?: number;
    };
  }[];
}

export interface IndustryTrend {
  discipline: string;
  sector: string;
  annualGrowth: string;
  growthRateValue: number;
  openings2026: string;
  entryPay: number;
  medianPay: number;
  topPay: number;
  automationResistance: 'High' | 'Very High' | 'Moderate';
  keyDrivers: string[];
  emergingSkills: string[];
}

export const TRENDING_DEGREES: DegreePath[] = [
  {
    id: 'computer-engineering',
    name: 'Computer Engineering',
    category: 'Engineering',
    image: '/src/assets/images/field_computer_engineering_1792243242347.jpg',
    tagline: 'Silicon microarchitecture, embedded firmware, hardware acceleration & robotics',
    description: 'Bridges electrical engineering and software design. Computer engineers create the physical microprocessors, memory architectures, FPGA systems, and edge robotics that power modern computation and generative AI accelerators.',
    growthRate: '+14% Projected Growth',
    medianSalary: '$145,000 / yr',
    entrySalary: '$94,000 / yr',
    seniorSalary: '$225,000+ / yr',
    keySkills: ['Verilog / VHDL', 'Computer Architecture', 'C / Modern C++', 'Embedded Linux', 'RISC-V / ARM', 'VLSI Design', 'Digital Signal Processing'],
    coreCurriculum: [
      {
        year: 'Year 1: Foundations',
        focus: 'Mathematics, Circuit Theory & Low-Level Code',
        keySubjects: ['Calculus & Differential Equations', 'Discrete Mathematics', 'Physics of Semiconductor Devices', 'Structured C Programming']
      },
      {
        year: 'Year 2: Hardware Core',
        focus: 'Digital Logic & Microprocessor Fundamentals',
        keySubjects: ['Digital System Design (FPGA)', 'Computer Organization & Assembly', 'Signals and Linear Systems', 'Object-Oriented C++']
      },
      {
        year: 'Year 3: Systems Architecture',
        focus: 'Operating Systems & VLSI Circuit Synthesis',
        keySubjects: ['Embedded Systems & Real-Time OS', 'VLSI Design & Physical Layout', 'Computer Microarchitecture', 'High-Speed Interconnects']
      },
      {
        year: 'Year 4: Capstone & Acceleration',
        focus: 'Custom Silicon, AI Acceleration & Robotics',
        keySubjects: ['Hardware Accelerators for Neural Networks', 'Robotics Hardware Interfacing', 'Semiconductor Fabrication Lab', 'Senior Capstone Design']
      }
    ],
    topRoles: [
      {
        role: 'ASIC / Silicon Design Engineer',
        compensation: '$165,000 – $240,000',
        demand: 'Surging (Fabless & Foundry)',
        description: 'Designs custom microprocessors, tensor units, and cryptographic silicon chips.'
      },
      {
        role: 'Embedded Firmware Architect',
        compensation: '$140,000 – $195,000',
        demand: 'Very High',
        description: 'Develops bare-metal drivers, kernel subsystems, and real-time control loops for autonomous systems.'
      },
      {
        role: 'Robotics Hardware Systems Engineer',
        compensation: '$135,000 – $190,000',
        demand: 'High',
        description: 'Integrates actuators, sensor fusion pipelines, power distribution, and edge computing units.'
      }
    ],
    recommendedCertifications: ['Cadence / Synopsys Certified Specialist', 'ARM Architecture Professional', 'FPGA Design (Xilinx/Intel)'],
    dayInTheLifeHighlights: [
      'Prototyping register-transfer level (RTL) code on high-density FPGA boards',
      'Running timing closure and power-efficiency simulations in clean research clusters',
      'Debugging board bring-up using logic analyzers and digital oscilloscopes'
    ]
  },
  {
    id: 'it-software-engineering',
    name: 'Information Technology & Software Systems',
    category: 'Information Technology',
    image: '/src/assets/images/field_it_software_engineering_1792243244045.jpg',
    tagline: 'Cloud infrastructure, distributed microservices, network defense & enterprise scale',
    description: 'Drives the modern digital ecosystem. IT and Software Engineering blends large-scale software engineering with robust cloud infrastructure, container orchestration, zero-trust cybersecurity, and automated deployment pipelines.',
    growthRate: '+25% Projected Growth',
    medianSalary: '$142,000 / yr',
    entrySalary: '$90,000 / yr',
    seniorSalary: '$210,000+ / yr',
    keySkills: ['Distributed Systems', 'Go / Python / TypeScript', 'Kubernetes & Docker', 'Cloud Architecture (AWS/GCP)', 'PostgreSQL & Distributed DBs', 'CI/CD & DevSecOps', 'System Observability'],
    coreCurriculum: [
      {
        year: 'Year 1: Software Principles',
        focus: 'Programming Fundamentals, Algorithms & Web Architecture',
        keySubjects: ['Data Structures & Algorithm Design', 'Computer Networks & TCP/IP', 'Modern Web & Application Frameworks', 'Relational Database Architecture']
      },
      {
        year: 'Year 2: Distributed Core',
        focus: 'Enterprise Systems, APIs & Cloud Foundations',
        keySubjects: ['Operating Systems Architecture', 'Cloud Services & Virtualization', 'REST & gRPC Microservices', 'Information Security Fundamentals']
      },
      {
        year: 'Year 3: Infrastructure & Scale',
        focus: 'Container Orchestration, SRE & Scalability',
        keySubjects: ['Distributed Databases & Event Streams (Kafka)', 'Kubernetes Cluster Administration', 'Site Reliability Engineering', 'Defensive Cyber Engineering']
      },
      {
        year: 'Year 4: Production Systems',
        focus: 'Enterprise Cloud Solutions & AI Integration',
        keySubjects: ['Enterprise Cloud Migration & FinOps', 'Large-Scale System Design', 'AI Workflow & LLM Infrastructure', 'Industry Capstone Practicum']
      }
    ],
    topRoles: [
      {
        role: 'Cloud Solutions Architect',
        compensation: '$160,000 – $225,000',
        demand: 'Extremely High',
        description: 'Designs multi-region resilient cloud topologies, zero-downtime migrations, and enterprise cost models.'
      },
      {
        role: 'Site Reliability Engineer (SRE)',
        compensation: '$150,000 – $210,000',
        demand: 'Surging',
        description: 'Ensures 99.999% system availability through automated failover, chaos engineering, and telemetry pipelines.'
      },
      {
        role: 'DevSecOps & Cyber Infrastructure Lead',
        compensation: '$155,000 – $215,000',
        demand: 'Critical',
        description: 'Hardens delivery pipelines, automates compliance verification, and orchestrates zero-trust defenses.'
      }
    ],
    recommendedCertifications: ['AWS Certified Solutions Architect – Professional', 'Certified Kubernetes Administrator (CKA)', 'Google Cloud Professional Cloud Architect', 'CISSP / CompTIA Security+'],
    dayInTheLifeHighlights: [
      'Architecting resilient distributed microservices using event-driven architectures',
      'Optimizing query latencies across global database replicas',
      'Running automated chaos experiments to validate auto-scaling policies'
    ]
  },
  {
    id: 'medicine-doctor',
    name: 'Doctor of Medicine (MBBS / MD)',
    category: 'Healthcare & Medicine',
    image: '/src/assets/images/field_medical_doctor_1792243243377.jpg',
    tagline: 'Clinical diagnosis, surgical interventions, biomedical technology & patient leadership',
    description: 'The pinnacle of human healthcare delivery. Modern medical practitioners combine exhaustive anatomical and pharmacological knowledge with cutting-edge medical telemetry, robotic surgery, and personalized genomic therapeutics.',
    growthRate: '+18% Projected Growth',
    medianSalary: '$260,000 / yr',
    entrySalary: '$68,000 / yr (Residency)',
    seniorSalary: '$380,000+ / yr (Attending / Specialist)',
    keySkills: ['Clinical Diagnostics', 'Pathology & Pharmacology', 'Surgical Protocols', 'Patient Communication', 'Medical Imaging Synthesis', 'Emergency Triage', 'Biomedical Ethics'],
    coreCurriculum: [
      {
        year: 'Stage 1: Pre-Clinical Sciences',
        focus: 'Human Anatomy, Physiology & Pathology',
        keySubjects: ['Gross & Microscopic Anatomy', 'Medical Biochemistry & Genetics', 'Physiology & Organ Systems', 'Medical Microbiology & Immunology']
      },
      {
        year: 'Stage 2: Clinical Foundations',
        focus: 'Pharmacology, Diagnostics & Physical Examination',
        keySubjects: ['Systemic Pathology', 'Clinical Pharmacology & Therapeutics', 'Diagnostic Radiology & Lab Medicine', 'Medical Ethics & Patient Interviewing']
      },
      {
        year: 'Stage 3: Core Clinical Rotations',
        focus: 'Hospital Inpatient & Outpatient Clerkships',
        keySubjects: ['Internal Medicine Clerkship', 'General Surgery & Trauma', 'Pediatrics & Neonatal Care', 'Obstetrics & Gynecology']
      },
      {
        year: 'Stage 4: Advanced Specialization & Board Exams',
        focus: 'Sub-internships, USMLE Step 2/3 & Match',
        keySubjects: ['Intensive Care Unit (ICU) Sub-internship', 'Emergency Medicine Elective', 'Advanced Clinical Pharmacology', 'Residency Matching Preparation']
      }
    ],
    topRoles: [
      {
        role: 'Specialist Physician (Cardiology, Neurology)',
        compensation: '$320,000 – $480,000',
        demand: 'Crucial Shortage',
        description: 'Specializes in complex organ system disorders, advanced catheterization, and therapeutic protocols.'
      },
      {
        role: 'General & Minimally Invasive Surgeon',
        compensation: '$360,000 – $520,000',
        demand: 'Very High',
        description: 'Performs operative procedures utilizing laparoscopic and robotic computer-assisted surgery systems.'
      },
      {
        role: 'Chief Medical Officer / Clinical Informatics Lead',
        compensation: '$280,000 – $420,000',
        demand: 'Rapidly Growing',
        description: 'Aligns hospital clinical workflows with intelligent diagnostic systems and health regulatory standards.'
      }
    ],
    recommendedCertifications: ['USMLE Step 1, 2 CK, 3 / Medical Council Licensure', 'Board Certification in Chosen Specialty', 'ACLS / BLS Advanced Life Support'],
    dayInTheLifeHighlights: [
      'Conducting complex morning ward rounds and evaluating patient biometric trends',
      'Interpreting 3D MRI scans and diagnostic ultrasound imagery in multi-disciplinary teams',
      'Performing procedural interventions or patient counseling with empathetic precision'
    ]
  },
  {
    id: 'data-science-ai',
    name: 'Data Science & Artificial Intelligence',
    category: 'Data & AI',
    image: '/src/assets/images/hero_career_lens_1792243242270.jpg',
    tagline: 'Foundation models, machine learning operations, statistical inference & neural architectures',
    description: 'Empowers organizations to extract foresight from massive data streams. Blends mathematical optimization, distributed model training, and generative agent architectures to build autonomous reasoning systems.',
    growthRate: '+32% Projected Growth',
    medianSalary: '$156,000 / yr',
    entrySalary: '$98,000 / yr',
    seniorSalary: '$240,000+ / yr',
    keySkills: ['PyTorch / JAX', 'Statistical Learning', 'Distributed ML Training', 'LLM Alignment & RAG', 'Vector Databases', 'MLOps & Triton', 'Data Engineering (Spark)'],
    coreCurriculum: [
      {
        year: 'Year 1: Mathematical Foundations',
        focus: 'Linear Algebra, Probability & Computational Python',
        keySubjects: ['Multivariate Calculus & Linear Algebra', 'Probability & Mathematical Statistics', 'Numerical Computing with Python', 'Object-Oriented Programming']
      },
      {
        year: 'Year 2: Core Machine Learning',
        focus: 'Regression, Classification & Data Pipelines',
        keySubjects: ['Classical Machine Learning Algorithms', 'Big Data Engineering (SQL, Spark)', 'Exploratory Data Analysis', 'Information Retrieval']
      },
      {
        year: 'Year 3: Deep Neural Architectures',
        focus: 'Transformers, Computer Vision & Natural Language',
        keySubjects: ['Deep Learning & Backpropagation Math', 'Transformer Architectures & Attention', 'Reinforcement Learning', 'MLOps & Model Deployment']
      },
      {
        year: 'Year 4: Applied AI Systems',
        focus: 'Multimodal Models, Fine-Tuning & Industry Practicum',
        keySubjects: ['Generative AI Systems & Vector Pipelines', 'Model Quantization & Efficient Inference', 'AI Safety & Regulatory Governance', 'Senior AI Capstone']
      }
    ],
    topRoles: [
      {
        role: 'AI / Foundation Model Research Engineer',
        compensation: '$180,000 – $280,000',
        demand: 'Extreme',
        description: 'Architects novel attention layers, pre-training clusters, and model evaluation benchmarks.'
      },
      {
        role: 'MLOps & Model Optimization Specialist',
        compensation: '$155,000 – $220,000',
        demand: 'Very High',
        description: 'Deploys low-latency inference servers, GPU memory managers, and automated retraining pipelines.'
      }
    ],
    recommendedCertifications: ['AWS Certified Machine Learning – Specialty', 'DeepLearning.AI TensorFlow / PyTorch Developer', 'Databricks Certified Data Engineer'],
    dayInTheLifeHighlights: [
      'Profiling GPU kernel performance and training loss curves across distributed clusters',
      'Refining evaluation benchmarks to assess reasoning and hallucination rates',
      'Designing synthetic datasets to boost edge-case generalization'
    ]
  }
];

export const CURATED_VIDEOS: VideoBrief[] = [
  {
    id: 'vid-comp-eng-silicon',
    title: 'Inside Computer Engineering: Designing 3nm Silicon Chips',
    degreeCategory: 'Computer Engineering',
    durationSeconds: 225, // 3:45
    durationFormatted: '3:45',
    speaker: 'Elena Vance, Ph.D.',
    speakerRole: 'Principal Hardware Architect, Silicon Systems',
    thumbnail: '/src/assets/images/field_computer_engineering_1792243242347.jpg',
    youtubeId: 'g8Qav3vIv9s',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/g8Qav3vIv9s',
    summary: 'A fast-paced 3-minute 45-second insider view into how computer engineers bridge microarchitectural RTL code with nanometer physical silicon fabrication.',
    chapters: [
      { time: '0:00', title: 'Silicon Abstraction Layers' },
      { time: '0:58', title: 'RTL to Physical Synthesis' },
      { time: '2:10', title: 'Why Silicon Engineers are in Historic Demand' },
      { time: '3:05', title: 'Key Advice for Undergraduates' }
    ],
    takeaways: [
      'Hardware design cycles require extreme verification discipline; you cannot patch silicon once baked.',
      'AI accelerators and edge robotics are driving a 15-year renaissance in hardware engineering.',
      'Mastering Verilog/SystemVerilog alongside C++ micro-benchmarks gives you an immediate competitive edge.'
    ],
    transcriptExcerpt: "When you type code into a terminal, thousands of logic gates fire within picoseconds. As computer engineers, our job is not just to run code, but to physically sculpt the silicon pathways that make computation energy-efficient. In this brief, we break down why the hardware renaissance is happening right now..."
  },
  {
    id: 'vid-it-vs-computer-eng',
    title: 'IT vs Computer Engineering: Which Degree Matches Your Brain?',
    degreeCategory: 'Information Technology',
    durationSeconds: 198, // 3:18
    durationFormatted: '3:18',
    speaker: 'Marcus Sterling',
    speakerRole: 'VP of Infrastructure & Systems Engineering',
    thumbnail: '/src/assets/images/field_it_software_engineering_1792243244045.jpg',
    youtubeId: 'eGX_42qSofc',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/eGX_42qSofc',
    summary: 'Clear 3-minute comparison distinguishing low-level hardware/firmware computer engineering from high-scale cloud and distributed IT systems.',
    chapters: [
      { time: '0:00', title: 'The Core Mental Model Difference' },
      { time: '1:05', title: 'The Daily Work: Chips vs Clusters' },
      { time: '2:15', title: 'Career Trajectories & Comp Curves' },
      { time: '2:50', title: 'How to Decide Your Major' }
    ],
    takeaways: [
      'Choose Computer Engineering if you love physical hardware, physics, circuits, and low-level firmware.',
      'Choose IT / Software Engineering if you love cloud architecture, distributed microservices, databases, and rapid shipping.',
      'Both fields intersect at edge computing and hardware acceleration platforms.'
    ],
    transcriptExcerpt: "Students frequently ask: 'Should I study Computer Engineering or IT and Software Systems?' The simple test is whether you want to manipulate physical voltage and silicon registers, or orchestrate global distributed fleets serving millions of concurrent web sockets..."
  },
  {
    id: 'vid-modern-medical-doctor',
    title: 'The Modern Doctor: Clinical Rounds & Robotic Surgery',
    degreeCategory: 'Healthcare & Medicine',
    durationSeconds: 245, // 4:05
    durationFormatted: '4:05',
    speaker: 'Dr. Sarah Al-Mansoor, MD',
    speakerRole: 'Attending Physician & Robotic Surgery Specialist',
    thumbnail: '/src/assets/images/field_medical_doctor_1792243243377.jpg',
    youtubeId: 'U0zf9SEavmw',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/U0zf9SEavmw',
    summary: 'A 4-minute clinical walkthrough showing what contemporary medicine looks like with computer-assisted surgery, rapid biometrics, and bedside empathy.',
    chapters: [
      { time: '0:00', title: 'Morning Triage & ICU Telemetry' },
      { time: '1:12', title: 'Operating Room: Minimally Invasive Robotics' },
      { time: '2:30', title: 'The Human Connection Behind the Data' },
      { time: '3:25', title: 'Navigating the Medical Training Odyssey' }
    ],
    takeaways: [
      'Medical practice is being augmented by AI diagnostics, but physical bedside diagnosis and surgical dexterity remain irreplaceable.',
      'Residency is intense; developing emotional resilience and structured clinical reasoning early is paramount.',
      'Interdisciplinary physicians who understand bio-technology are leading next-generation clinical trials.'
    ],
    transcriptExcerpt: "At 6:30 AM, our team gathers around digital telemetry screens reviewing arterial oxygen saturations and organ function trends. While machines alert us to subtle abnormalities, it is human clinical intuition and diagnostic synthesis that saves lives in the golden hour..."
  },
  {
    id: 'vid-cloud-infra-secrets',
    title: 'Cloud Architecture in 3 Minutes: What Every Engineer Must Know',
    degreeCategory: 'Information Technology',
    durationSeconds: 215, // 3:35
    durationFormatted: '3:35',
    speaker: 'Priya Raman',
    speakerRole: 'Principal Cloud Architect, Global SRE',
    thumbnail: '/src/assets/images/hero_career_lens_1792243242270.jpg',
    youtubeId: 'Y-Jhlwy2sW4',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/Y-Jhlwy2sW4',
    summary: 'Learn the 4 core pillars of enterprise cloud engineering: elasticity, observability, failure isolation, and zero-trust security.',
    chapters: [
      { time: '0:00', title: 'Why Monoliths Fail at Scale' },
      { time: '1:10', title: 'Kubernetes & Container Mesh' },
      { time: '2:15', title: 'Multi-Region High Availability' },
      { time: '3:00', title: 'The Essential SRE Skillset' }
    ],
    takeaways: [
      'Building in the cloud is about designing for inevitable hardware failure.',
      'Observability (metrics, logs, traces) separates junior developers from senior infrastructure leaders.',
      'Understanding networking protocols (BGP, DNS, TLS, TCP) is the bedrock of IT engineering.'
    ],
    transcriptExcerpt: "When a service handles half a million requests per second, things will break every hour. Your architecture must heal itself automatically through health-checks, circuit breakers, and distributed queues. Here is how modern IT architects design for high resilience..."
  },
  {
    id: 'vid-embedded-robotics',
    title: 'Embedded Systems: How Code Moves Physical Machines',
    degreeCategory: 'Computer Engineering',
    durationSeconds: 232, // 3:52
    durationFormatted: '3:52',
    speaker: 'Julian Chen',
    speakerRole: 'Lead Robotics Firmware Architect',
    thumbnail: '/src/assets/images/field_computer_engineering_1792243242347.jpg',
    youtubeId: 'cdQNj4BoXjI',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/cdQNj4BoXjI',
    summary: 'Discover how embedded microcontrollers compute motor control algorithms under strict real-time deadline guarantees.',
    chapters: [
      { time: '0:00', title: 'Hard Real-Time Systems' },
      { time: '1:15', title: 'CAN Bus, SPI & Hardware Interrupts' },
      { time: '2:20', title: 'Debugging with Oscilloscopes' },
      { time: '3:10', title: 'Breaking Into Autonomous Robotics' }
    ],
    takeaways: [
      'In hard real-time systems, an answer delivered 1 millisecond late is a catastrophic failure.',
      'Writing memory-safe C and modern Rust without dynamic allocation is an indispensable skill.',
      'Hands-on hobby projects with STM32 or ESP32 microcontrollers are respected heavily by top engineering recruiters.'
    ],
    transcriptExcerpt: "Unlike web servers where a laggy response just spins a loader icon, an embedded robotic system controlling high-torque servo motors will collide if a calculation is delayed by even two clock cycles. Here is what makes embedded firmware so exhilarating..."
  },
  {
    id: 'vid-medical-residency-strategy',
    title: 'Surviving & Excelling in Medical School and Residency',
    degreeCategory: 'Healthcare & Medicine',
    durationSeconds: 208, // 3:28
    durationFormatted: '3:28',
    speaker: 'Dr. Christian Bennett, MD',
    speakerRole: 'Medical Education Director & Pediatric Surgeon',
    thumbnail: '/src/assets/images/field_medical_doctor_1792243243377.jpg',
    youtubeId: 'mu5WzOL8-O8',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/mu5WzOL8-O8',
    summary: 'Essential study strategies, clinical memory frameworks, and mental stamina habits for prospective and current medical students.',
    chapters: [
      { time: '0:00', title: 'The Information Firehose' },
      { time: '0:55', title: 'Spaced Repetition & Question Banks' },
      { time: '1:50', title: 'Standing Out on Clinical Wards' },
      { time: '2:45', title: 'Maintaining Empathy and Well-Being' }
    ],
    takeaways: [
      'Passive reading fails in medicine; active recall and clinical scenario simulation are essential.',
      'Communication with nurses and patient families is as vital to patient safety as pharmacological knowledge.',
      'Define non-negotiable sleep and nutrition boundaries during clinical rotations.'
    ],
    transcriptExcerpt: "Medical school is often described as drinking from a firehose. The secret isn't studying 18 hours a day; it's active retrieval, case synthesis, and understanding the physiological mechanisms behind symptoms so you never have to memorize isolated facts..."
  }
];

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    category: 'hardware',
    categoryLabel: 'System & Hardware Foundations',
    prompt: 'When encountering a malfunctioning technological system, what is your instinctive approach?',
    options: [
      {
        label: 'A',
        text: 'Inspect the physical circuits, voltages, and low-level component connections directly.',
        weights: { hardware: 25, software: 5 }
      },
      {
        label: 'B',
        text: 'Examine server logs, software trace outputs, and network protocol packets.',
        weights: { software: 25, data: 10 }
      },
      {
        label: 'C',
        text: 'Trace the biological or physical symptoms methodically to isolate organ/system failure.',
        weights: { healthcare: 25, leadership: 5 }
      },
      {
        label: 'D',
        text: 'Analyze historical telemetry trends and anomaly distributions to detect statistical outliers.',
        weights: { data: 25, software: 10 }
      }
    ]
  },
  {
    id: 2,
    category: 'software',
    categoryLabel: 'Software & Cloud Abstractions',
    prompt: 'Which kind of architectural problem excites you the most?',
    options: [
      {
        label: 'A',
        text: 'Designing a zero-downtime distributed cloud architecture supporting millions of global users.',
        weights: { software: 25, leadership: 10 }
      },
      {
        label: 'B',
        text: 'Optimizing microprocessor register allocations and clock cycle latency on custom silicon chips.',
        weights: { hardware: 25 }
      },
      {
        label: 'C',
        text: 'Synthesizing complex multi-organ pathology to recommend an immediate surgical treatment protocol.',
        weights: { healthcare: 25, leadership: 10 }
      },
      {
        label: 'D',
        text: 'Training neural networks on terabytes of multimodal tokens with customized loss functions.',
        weights: { data: 25, software: 10 }
      }
    ]
  },
  {
    id: 3,
    category: 'healthcare',
    categoryLabel: 'High-Stakes Decision Making',
    prompt: 'How do you perform when critical decisions must be executed with incomplete information under time pressure?',
    options: [
      {
        label: 'A',
        text: 'I rely on evidence-based triage, clinical protocol heuristics, and calm empathetic leadership.',
        weights: { healthcare: 25, leadership: 15 }
      },
      {
        label: 'B',
        text: 'I instantly isolate failing components or broken relays to protect core hardware from overload.',
        weights: { hardware: 20, software: 10 }
      },
      {
        label: 'C',
        text: 'I execute automated failover scripts, rollback deployments, and spin up redundant cluster replicas.',
        weights: { software: 25, leadership: 5 }
      },
      {
        label: 'D',
        text: 'I query real-time statistical distributions to compute the highest expected-value outcome.',
        weights: { data: 25 }
      }
    ]
  },
  {
    id: 4,
    category: 'leadership',
    categoryLabel: 'Long-Term Impact & Purpose',
    prompt: 'What ultimate impact brings you the highest professional fulfillment?',
    options: [
      {
        label: 'A',
        text: 'Directly saving or transforming human lives through precise medical interventions and care.',
        weights: { healthcare: 30, leadership: 10 }
      },
      {
        label: 'B',
        text: 'Building physical computing devices, microchips, and robots that expand human capability.',
        weights: { hardware: 30 }
      },
      {
        label: 'C',
        text: 'Architecting robust digital infrastructure and platforms that power global communications.',
        weights: { software: 30 }
      },
      {
        label: 'D',
        text: 'Discovering hidden mathematical patterns and training models that solve complex analytical mysteries.',
        weights: { data: 30 }
      }
    ]
  },
  {
    id: 5,
    category: 'data',
    categoryLabel: 'Tooling & Methodology Preference',
    prompt: 'Which workbench environment would you prefer to immerse yourself in daily?',
    options: [
      {
        label: 'A',
        text: 'An advanced cleanroom lab with digital oscilloscopes, logic analyzers, and FPGA development rigs.',
        weights: { hardware: 25 }
      },
      {
        label: 'B',
        text: 'A modern multi-monitor developer station running terminal emulators, Docker, and cloud monitoring.',
        weights: { software: 25 }
      },
      {
        label: 'C',
        text: 'A sterile clinical hospital suite with ultrasound, diagnostic imaging, and direct patient interaction.',
        weights: { healthcare: 25 }
      },
      {
        label: 'D',
        text: 'A high-performance compute Jupyter cluster with GPUs, tensor dashboards, and statistical notebooks.',
        weights: { data: 25 }
      }
    ]
  }
];

export const INDUSTRY_TRENDS: IndustryTrend[] = [
  {
    discipline: 'Computer Engineering (Hardware & Silicon)',
    sector: 'Semiconductors & Robotics',
    annualGrowth: '+14.2%',
    growthRateValue: 14.2,
    openings2026: '148,000 New Openings',
    entryPay: 94000,
    medianPay: 145000,
    topPay: 235000,
    automationResistance: 'Very High',
    keyDrivers: [
      'Surge in custom AI accelerators (TPUs, NPUs) requiring specialized chip architects',
      'Geopolitical reshoring of semiconductor foundries worldwide',
      'Edge computing expansion in automotive ADAS and humanoids'
    ],
    emergingSkills: ['Verilog/SystemVerilog', 'RISC-V Architecture', 'Chiplet Packaging', 'Optical Interconnects']
  },
  {
    discipline: 'Information Technology & Cloud Engineering',
    sector: 'Software & Infrastructure',
    annualGrowth: '+24.8%',
    growthRateValue: 24.8,
    openings2026: '380,000 New Openings',
    entryPay: 90000,
    medianPay: 142000,
    topPay: 215000,
    automationResistance: 'High',
    keyDrivers: [
      'Multi-cloud orchestration and massive server fleet reliability (SRE)',
      'Zero-trust cyber defense integration across hybrid clouds',
      'Autonomous infrastructure-as-code and FinOps optimization'
    ],
    emergingSkills: ['Kubernetes Cluster Mesh', 'Go Systems Programming', 'eBPF Observability', 'Zero-Trust Architecture']
  },
  {
    discipline: 'Medical Doctors (Physicians & Surgeons)',
    sector: 'Healthcare & Clinical Sciences',
    annualGrowth: '+18.1%',
    growthRateValue: 18.1,
    openings2026: '210,000 Critical Vacancies',
    entryPay: 68000,
    medianPay: 260000,
    topPay: 420000,
    automationResistance: 'Very High',
    keyDrivers: [
      'Severe global specialist shortages in cardiology, neurology, and surgery',
      'Adoption of minimally invasive surgical robots requiring certified operators',
      'Integration of genomic precision medicine and personalized oncology'
    ],
    emergingSkills: ['Robotic Surgical Systems (Da Vinci)', 'Clinical Data Synthesis', 'Point-of-Care Ultrasound', 'Genomic Therapeutics']
  },
  {
    discipline: 'Artificial Intelligence & Machine Learning',
    sector: 'Applied Intelligence',
    annualGrowth: '+32.4%',
    growthRateValue: 32.4,
    openings2026: '290,000 Specialized Roles',
    entryPay: 98000,
    medianPay: 156000,
    topPay: 260000,
    automationResistance: 'High',
    keyDrivers: [
      'Enterprise transition from proof-of-concept to production agent pipelines',
      'High-throughput inference optimization and model quantization',
      'Multimodal reasoning integration in healthcare, finance, and engineering'
    ],
    emergingSkills: ['Triton / CUDA Kernels', 'Agentic Evaluation Frameworks', 'Fine-Tuning (LoRA/QLoRA)', 'Vector RAG Architectures']
  },
  {
    discipline: 'Cybersecurity & Defense Infrastructure',
    sector: 'Security & Enterprise Trust',
    annualGrowth: '+28.5%',
    growthRateValue: 28.5,
    openings2026: '195,000 Urgent Openings',
    entryPay: 88000,
    medianPay: 138000,
    topPay: 205000,
    automationResistance: 'Very High',
    keyDrivers: [
      'Proliferation of AI-driven synthetic intrusion attempts',
      'Mandatory national critical infrastructure cybersecurity directives',
      'Cloud posture compliance automation and quantum-safe cryptography'
    ],
    emergingSkills: ['Post-Quantum Encryption', 'Threat Hunting with SIEM', 'Cloud Security Posture (CSPM)', 'Binary Exploitation Analysis']
  }
];

export interface MilestoneItem {
  id: string;
  quarter: string;
  title: string;
  category: 'Skill' | 'Project' | 'Certification' | 'Career';
  completed: boolean;
  notes: string;
}

export const DEFAULT_ROADMAP_MILESTONES: MilestoneItem[] = [
  {
    id: 'm1',
    quarter: 'Q1 - Foundations',
    title: 'Audit core technical stack and complete foundational domain curriculum',
    category: 'Skill',
    completed: true,
    notes: 'Established baseline competency in systems analysis and algorithms.'
  },
  {
    id: 'm2',
    quarter: 'Q2 - Artifact Building',
    title: 'Architect and ship an end-to-end production prototype with documentation',
    category: 'Project',
    completed: false,
    notes: 'Focusing on distributed microservices or FPGA hardware verification module.'
  },
  {
    id: 'm3',
    quarter: 'Q3 - Credentialing',
    title: 'Earn recognized industry certification or pass professional licensure milestone',
    category: 'Certification',
    completed: false,
    notes: 'Aiming for Solutions Architect / CKA or Board Exam Step 1.'
  },
  {
    id: 'm4',
    quarter: 'Q4 - Industry Placement',
    title: 'Conduct technical portfolio reviews with 3 senior mentors and apply to tier-1 roles',
    category: 'Career',
    completed: false,
    notes: 'Prepare system design architecture briefs and case study presentations.'
  }
];
