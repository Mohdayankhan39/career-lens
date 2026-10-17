import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent header as required
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Endpoint for Personalized Skill Assessment Evaluation
app.post('/api/evaluate-assessment', async (req, res) => {
  try {
    const { categoryScores, selectedAnswers, targetInterest } = req.body;

    if (!ai) {
      // Deterministic high-quality fallback when API key is not supplied
      return res.json({
        personaTitle: targetInterest ? `${targetInterest} Strategist` : "Systems & Technical Innovator",
        executiveSummary: "Your profile demonstrates a high affinity for systems thinking, structured problem solving, and analytical decomposition. You thrive when balancing conceptual architecture with tangible execution.",
        topStrengths: [
          "High capacity for technical root-cause analysis and systemic diagnostics",
          "Balanced approach between immediate execution and architectural foresight",
          "Demonstrated capability in synthesizing interdisciplinary requirements"
        ],
        growthAreas: [
          "Deepen hands-on competency in modern distributed architectures and low-level optimization",
          "Refine cross-functional executive communication and narrative synthesis"
        ],
        recommendedPaths: [
          {
            title: "Computer Systems & Hardware Engineering",
            matchRate: 94,
            rationale: "Aligns with your diagnostic precision and low-level computational logic scores."
          },
          {
            title: "Cloud & Distributed Systems Architecture (IT)",
            matchRate: 91,
            rationale: "Maximizes your aptitude for scalable system dynamics and distributed infrastructure."
          },
          {
            title: "Biomedical Systems & Clinical Informatics",
            matchRate: 85,
            rationale: "Leverages your rigorous evidence-based methodology in high-stakes environments."
          }
        ],
        immediateNextSteps: [
          "Complete the curated 3-minute video brief on System Architecture vs IT Engineering",
          "Map your 1-Year Milestone to obtain foundational industry credentials in your target discipline",
          "Build an end-to-end prototype project that demonstrates measurable performance gains"
        ]
      });
    }

    const prompt = `You are the lead career intelligence engine at Career Lens.
Evaluate this user's skill assessment data:
Target Interest: ${targetInterest || "General Technology & Engineering"}
Category Scores (out of 100): ${JSON.stringify(categoryScores)}
User Answers: ${JSON.stringify(selectedAnswers)}

Provide a rigorous, actionable career assessment in JSON format with this exact schema:
{
  "personaTitle": "string (e.g. Systems Architect & Computational Strategist)",
  "executiveSummary": "string (2-3 sentences of sharp, professional analysis)",
  "topStrengths": ["string", "string", "string"],
  "growthAreas": ["string", "string"],
  "recommendedPaths": [
    {"title": "string", "matchRate": number (e.g. 92), "rationale": "string"}
  ],
  "immediateNextSteps": ["string", "string", "string"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error evaluating assessment:', error);
    return res.status(500).json({ error: error.message || 'Failed to evaluate assessment' });
  }
});

// Endpoint for Custom Career Roadmap Generation
app.post('/api/generate-roadmap', async (req, res) => {
  try {
    const { degreeOrRole, currentLevel, targetGoal, timeframeMonths } = req.body;

    if (!ai) {
      return res.json({
        title: `${degreeOrRole} Strategic Progression Plan`,
        timeframe: `${timeframeMonths || 24} Months`,
        milestones: [
          {
            phase: "Phase 1: Foundations & Core Competencies (Months 1-6)",
            focus: "Master essential tooling, system paradigms, and foundational technical credentials.",
            deliverables: [
              "Complete core curriculum/certifications in foundational domain architecture",
              "Deploy 2 production-grade repositories or clinical case analyses with comprehensive documentation",
              "Establish daily structured practice routine for algorithmic and design fundamentals"
            ],
            keySkills: ["Systems Analysis", "Core Tooling", "Diagnostic Rigor"]
          },
          {
            phase: "Phase 2: Advanced Specialization & Applied Projects (Months 7-14)",
            focus: "Transition from textbook concepts to large-scale system integration or clinical exposure.",
            deliverables: [
              "Spearhead an open-source or institutional research project with measurable outcomes",
              "Participate in industry hackathons or residency shadow programs",
              "Gain proficiency in distributed scaling, hardware-software co-design, or medical protocols"
            ],
            keySkills: ["Scale Optimization", "Domain Specialization", "System Troubleshooting"]
          },
          {
            phase: "Phase 3: Leadership, Industry Impact & Placement (Months 15-24)",
            focus: "Position yourself for top-tier hiring, leadership roles, or advanced fellowship accreditation.",
            deliverables: [
              "Conduct 5+ technical/clinical mock interviews with senior industry mentors",
              "Publish a technical whitepaper or clinical case review on emerging industry trends",
              "Target high-growth organizations with verified portfolio artifacts"
            ],
            keySkills: ["Strategic Roadmapping", "Cross-functional Leadership", "Executive Presentation"]
          }
        ],
        salaryExpectation: "$110,000 – $175,000 USD (Depending on specialization & region)",
        keyCertifications: ["AWS Certified Solutions Architect / CKA / Board Licensure", "Advanced Systems Specialization"]
      });
    }

    const prompt = `You are Career Lens Senior Roadmap Architect.
Generate a structured, hyper-practical career growth roadmap for:
Discipline / Degree / Role: ${degreeOrRole}
Current Level: ${currentLevel || "Undergraduate / Entry"}
Target Goal: ${targetGoal || "Senior Practitioner / Specialist"}
Timeframe: ${timeframeMonths || 24} months

Return JSON strictly matching this schema:
{
  "title": "string",
  "timeframe": "string",
  "milestones": [
    {
      "phase": "string",
      "focus": "string",
      "deliverables": ["string", "string", "string"],
      "keySkills": ["string", "string", "string"]
    }
  ],
  "salaryExpectation": "string",
  "keyCertifications": ["string", "string"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error generating roadmap:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate roadmap' });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Career Lens server running on port ${port} (mode: ${isProduction ? 'production' : 'development'})`);
  });
}

startServer();
