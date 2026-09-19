import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { checkSafetyTriggers } from './rag/safetyFilter.js';
import { retrieveContext } from './rag/retrieval.js';
import { generateConstrainedAnswer } from './rag/generator.js';
import { KNOWLEDGE_BASE } from './rag/knowledgeBase.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'Between Us API',
    version: '1.0.0',
    knowledgeBaseCount: KNOWLEDGE_BASE.length,
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY)
  });
});

// Knowledge Base Topics & Suggested Chips
app.get('/api/knowledge-base', (req: Request, res: Response) => {
  // Return lightweight metadata for suggested chips & categories
  const summary = KNOWLEDGE_BASE.map(item => ({
    id: item.id,
    category: item.category,
    question: item.question,
    keyTakeaway: item.keyTakeaway,
    tags: item.tags
  }));
  res.json({ total: summary.length, items: summary });
});

// Grounded Q&A Chat Pipeline
app.post('/api/ask', async (req: Request, res: Response) => {
  try {
    const { question, customApiKey } = req.body;

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const trimmedQuestion = question.trim();

    // ── STEP 1: HARD-CODED SAFETY SHIELD ──
    // Intercepts crisis, self-harm, assault, and severe hemorrhage before LLM
    const safetyResult = checkSafetyTriggers(trimmedQuestion);
    if (safetyResult.triggered) {
      return res.json({
        type: 'safety_card',
        safety: safetyResult
      });
    }

    // ── STEP 2: CONSTRAINED RETRIEVAL ──
    const retrieval = retrieveContext(trimmedQuestion);

    // ── STEP 3: CONSTRAINED GROUNDED GENERATION / VETTED FALLBACK ──
    const answerResult = await generateConstrainedAnswer(
      trimmedQuestion,
      retrieval,
      customApiKey
    );

    return res.json({
      type: 'answer',
      answer: answerResult.answer,
      source: answerResult.source,
      citations: answerResult.citations,
      doctorAdvice: answerResult.doctorAdvice,
      keyTakeaway: answerResult.keyTakeaway,
      retrievalConfidence: retrieval.hasConfidentMatch,
      topScore: Math.round(retrieval.topScore * 10) / 10
    });
  } catch (error) {
    console.error('[BetweenUs API] Error handling /api/ask:', error);
    res.status(500).json({
      error: 'An error occurred while processing your question',
      message: 'Please try again or speak directly with a healthcare provider.'
    });
  }
});

// Serve static assets in production if dist exists
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Fallback for SPA routing in production
app.use((req: Request, res: Response) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(distPath, 'index.html'), (err) => {
      if (err) {
        res.status(404).send('Between Us PWA Frontend building...');
      }
    });
  } else {
    res.status(404).json({ error: 'Endpoint not found' });
  }
});

app.listen(PORT, () => {
  console.log(`🌸 [Between Us] Server running at http://localhost:${PORT}`);
  console.log(`🔒 Privacy: Zero-tracking anonymous local storage enabled`);
  console.log(`📚 Knowledge Base: ${KNOWLEDGE_BASE.length} curated adolescent health Q&As active`);
  console.log(`🤖 Gemini API Key configured: ${Boolean(process.env.GEMINI_API_KEY)}`);
});
