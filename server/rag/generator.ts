import { GoogleGenAI } from '@google/genai';
import { RetrievalResult } from './retrieval.js';

export interface GenerationResponse {
  answer: string;
  source: 'gemini_grounded' | 'curated_fallback' | 'uncertain_fallback';
  citations: Array<{ id: string; question: string; keyTakeaway: string }>;
  doctorAdvice?: string;
  keyTakeaway?: string;
}

const SYSTEM_INSTRUCTION = `You are "Between Us" Big Sister, an empathetic, supportive, and medically grounded health companion for teenage girls (aged 12–17).

CRITICAL NON-NEGOTIABLE SAFETY CONSTRAINTS:
1. ONLY USE THE FACTS IN THE VETTED KNOWLEDGE BASE CONTEXT BELOW. Do not add outside medical theories, prescriptions, or guesses.
2. NEVER GIVE A MEDICAL DIAGNOSIS. Never conclude or state that the user has PCOS, PCOD, endometriosis, or an infection. Always phrase any hormonal signals gently as: "a pattern worth mentioning to a doctor or gynecologist".
3. TONE: Warm, understanding older sister, reassuring, judgment-free, clear, and age-appropriate. Keep sentences friendly and easy to read on a mobile phone screen (2-3 short paragraphs max).
4. If the provided context snippets do NOT contain the answer, do NOT guess. Instead, politely explain that you don't have verified notes on that topic and advise asking a trusted adult, school nurse, or doctor.`;

export async function generateConstrainedAnswer(
  userQuery: string,
  retrieval: RetrievalResult,
  userProvidedApiKey?: string
): Promise<GenerationResponse> {
  const apiKey = userProvidedApiKey || process.env.GEMINI_API_KEY;

  // 1. If no confident match was found in the knowledge base
  if (!retrieval.hasConfidentMatch || retrieval.matchedItems.length === 0) {
    return {
      answer: "I want to be completely honest with you — I don't have verified medical notes in my library about this specific question yet. Because your health and comfort are so important, I never want to guess. If you're feeling worried or experiencing something new with your body, reaching out to a school nurse, your mom, an older sister, or a friendly doctor is the safest next step. You can also use our 'Show Someone' card to help start the conversation!",
      source: 'uncertain_fallback',
      citations: [],
      keyTakeaway: "When unsure, it's always best to ask a trusted adult or doctor rather than guessing."
    };
  }

  const primaryMatch = retrieval.matchedItems[0].item;
  const citations = retrieval.matchedItems.map(m => ({
    id: m.item.id,
    question: m.item.question,
    keyTakeaway: m.item.keyTakeaway
  }));

  // 2. If Gemini API key is available, run grounded constrained generation
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Teen's Question: "${userQuery}"

VETTED KNOWLEDGE BASE CONTEXT:
${retrieval.formattedContext}

Instructions:
Synthesize a warm, grounded response answering the teen's question using ONLY the provided context above. Reassure her, explain things simply, and adhere strictly to all safety constraints. Do not diagnose anything.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: [
          { role: 'user', parts: [{ text: `${SYSTEM_INSTRUCTION}\n\n${prompt}` }] }
        ]
      });

      const generatedText = response.text?.trim();

      if (generatedText) {
        return {
          answer: generatedText,
          source: 'gemini_grounded',
          citations,
          doctorAdvice: primaryMatch.doctorNote,
          keyTakeaway: primaryMatch.keyTakeaway
        };
      }
    } catch (err) {
      console.warn('[BetweenUs] Gemini API generation error, smoothly utilizing vetted curated response:', err);
      // Falls through to vetted curated response
    }
  }

  // 3. Vetted Curated Fallback (deterministic, warm, grounded)
  // Used when no API key is set, or if API times out / is offline
  const introPhrases = [
    "Here is what's helpful to know about this:",
    "I'm so glad you asked — here's what happens in our bodies:",
    "You're definitely not alone in wondering this. Here are the facts:",
    "That's a really great question! Here's the gentle truth:"
  ];
  const chosenIntro = introPhrases[Math.floor(Math.random() * introPhrases.length)];

  let answerText = `${chosenIntro}\n\n${primaryMatch.answer}`;

  // If there is a secondary relevant insight, append a warm tip
  if (retrieval.matchedItems.length > 1) {
    const secondary = retrieval.matchedItems[1].item;
    answerText += `\n\n💡 Also good to remember: ${secondary.keyTakeaway}`;
  }

  return {
    answer: answerText,
    source: 'curated_fallback',
    citations,
    doctorAdvice: primaryMatch.doctorNote,
    keyTakeaway: primaryMatch.keyTakeaway
  };
}
