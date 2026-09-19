import { KNOWLEDGE_BASE, KnowledgeItem } from './knowledgeBase.js';

export interface RetrievalResult {
  hasConfidentMatch: boolean;
  topScore: number;
  matchedItems: Array<{
    item: KnowledgeItem;
    score: number;
  }>;
  formattedContext: string;
}

// Common English stopwords to ignore in token frequency
const STOPWORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t',
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can',
  'cannot', 'could', 'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from', 'further',
  'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his', 'how',
  'i', 'i\'m', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'its', 'itself', 'let\'s', 'me', 'more', 'most',
  'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our',
  'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she', 'she\'d', 'she\'ll', 'she\'s', 'should', 'so',
  'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there',
  'these', 'they', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we',
  'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'with', 'would', 'you', 'your',
  'yours', 'yourself', 'yourselves'
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 2 && !STOPWORDS.has(token));
}

function computeTermFrequencies(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  for (const token of tokens) {
    tf.set(token, (tf.get(token) || 0) + 1);
  }
  return tf;
}

export function retrieveContext(query: string, topK: number = 3): RetrievalResult {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) {
    return {
      hasConfidentMatch: false,
      topScore: 0,
      matchedItems: [],
      formattedContext: ''
    };
  }

  const queryTf = computeTermFrequencies(queryTokens);
  const normalizedQuery = query.toLowerCase();

  const scoredItems: Array<{ item: KnowledgeItem; score: number }> = [];

  for (const item of KNOWLEDGE_BASE) {
    let score = 0;

    // 1. Direct question tokens & n-grams
    const questionTokens = tokenize(item.question);
    const itemTokens = [
      ...questionTokens,
      ...item.tags.flatMap(t => tokenize(t)),
      ...item.aliases.flatMap(a => tokenize(a)),
      ...tokenize(item.answer)
    ];
    const docTf = computeTermFrequencies(itemTokens);

    // TF-IDF cosine / overlap score
    for (const [token, qCount] of queryTf.entries()) {
      if (docTf.has(token)) {
        const dCount = docTf.get(token)!;
        // Boost terms found in the question or tags
        const inQuestion = questionTokens.includes(token) ? 2.5 : 1.0;
        const inTags = item.tags.some(tag => tag.toLowerCase().includes(token)) ? 2.0 : 1.0;
        score += (qCount * dCount) * inQuestion * inTags;
      }
    }

    // 2. Exact phrase bonus (e.g. "brown blood", "first period", "pcos", "cramp")
    if (normalizedQuery.includes(item.question.toLowerCase())) {
      score += 15;
    }
    for (const alias of item.aliases) {
      if (normalizedQuery.includes(alias.toLowerCase()) || alias.toLowerCase().includes(normalizedQuery)) {
        score += 12;
      }
    }

    // 3. Tag exact match bonus
    for (const tag of item.tags) {
      if (normalizedQuery.includes(tag.toLowerCase())) {
        score += 4;
      }
    }

    // Normalizing against query length
    const normalizedScore = score / (Math.sqrt(queryTokens.length) + 0.1);

    if (normalizedScore > 0) {
      scoredItems.push({ item, score: normalizedScore });
    }
  }

  // Sort descending by relevance score
  scoredItems.sort((a, b) => b.score - a.score);

  const topMatches = scoredItems.slice(0, topK);
  const topScore = topMatches.length > 0 ? topMatches[0].score : 0;

  // Threshold for confident retrieval
  // If topScore is too low (< 2.0), it's likely unrelated or gibberish
  const hasConfidentMatch = topScore >= 2.0;

  const formattedContext = topMatches
    .map((m, idx) => `[Source ${idx + 1}: ${m.item.question}]\n${m.item.answer}\nTakeaway: ${m.item.keyTakeaway}${m.item.doctorNote ? `\nDoctor Note: ${m.item.doctorNote}` : ''}`)
    .join('\n\n');

  return {
    hasConfidentMatch,
    topScore,
    matchedItems: topMatches,
    formattedContext
  };
}
