import { prisma } from '@/lib/db';
import { queryKnowledgeBase } from './rag-engine';
import { ResearchProfile, EmailDraft, BrandStatus } from './types';

/**
 * Multi-Provider AI Engine (Supports Google Gemini, xAI Grok, Groq, and OpenAI)
 * Auto-detects available API keys from environment variables and handles automatic failover.
 */
async function callAILanguageModel(messages: { role: 'system' | 'user'; content: string }[]): Promise<any> {
  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  const grokKey = process.env.GROK_API_KEY?.trim();
  const groqKey = process.env.GROQ_API_KEY?.trim();
  const openaiKey = process.env.OPENAI_API_KEY?.trim();

  const errors: string[] = [];

  // Provider 1: Google Gemini API (gemini-flash-latest / gemini-2.0-flash / gemini-1.5-flash)
  if (geminiKey) {
    const models = ['gemini-flash-latest', 'gemini-flash-lite-latest', 'gemini-pro-latest', 'gemini-2.0-flash', 'gemini-2.0-flash-lite'];
    for (const model of models) {
      try {
        console.log(`[Multi-AI Engine] Attempting call via Google Gemini (${model})...`);
        const systemMsg = messages.find(m => m.role === 'system')?.content || '';
        const userMsg = messages.find(m => m.role === 'user')?.content || '';

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: AbortSignal.timeout(20000),
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemMsg}\n\n${userMsg}\n\nIMPORTANT: Return ONLY a valid JSON object matching the requested schema. Do not include markdown code block formatting like \`\`\`json.` }]
              }
            ],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.7
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const cleanText = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            const parsed = JSON.parse(cleanText);
            console.log(`[Multi-AI Engine] Success via Google Gemini (${model})!`);
            return parsed;
          }
        } else {
          const errText = await response.text();
          console.warn(`[Gemini ${model} Error ${response.status}]:`, errText);
          try {
            const parsedErr = JSON.parse(errText);
            errors.push(`Gemini (${model}): ${parsedErr.error?.message || errText}`);
          } catch {
            errors.push(`Gemini (${model}): HTTP ${response.status}`);
          }
        }
      } catch (e: any) {
        console.warn(`[Gemini ${model} Exception]:`, e.message);
        errors.push(`Gemini (${model}): ${e.message}`);
      }
    }
  }

  // Provider 2: xAI Grok API (grok-beta / grok-2-1212 / grok-2)
  if (grokKey) {
    const grokModels = ['grok-beta', 'grok-2-1212', 'grok-2', 'grok-vision-beta'];
    for (const model of grokModels) {
      try {
        console.log(`[Multi-AI Engine] Attempting call via xAI Grok API (${model})...`);
        const response = await fetch('https://api.x.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${grokKey}`
          },
          signal: AbortSignal.timeout(20000),
          body: JSON.stringify({
            model,
            messages,
            temperature: 0.7,
            response_format: { type: 'json_object' }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const content = data.choices?.[0]?.message?.content;
          if (content) {
            const cleanText = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            const parsed = JSON.parse(cleanText);
            console.log(`[Multi-AI Engine] Success via xAI Grok API (${model})!`);
            return parsed;
          }
        } else {
          const errText = await response.text();
          console.warn(`[Grok ${model} Error ${response.status}]:`, errText);
          errors.push(`Grok (${model}): ${errText}`);
        }
      } catch (e: any) {
        console.warn(`[Grok ${model} Exception]:`, e.message);
        errors.push(`Grok (${model}): ${e.message}`);
      }
    }
  }

  // Provider 3: Groq API (llama-3.3-70b-versatile)
  if (groqKey) {
    try {
      console.log('[Multi-AI Engine] Attempting call via Groq API (llama-3.3-70b-versatile)...');
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqKey}`
        },
        signal: AbortSignal.timeout(20000),
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages,
          temperature: 0.7,
          response_format: { type: 'json_object' }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          const cleanText = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
          const parsed = JSON.parse(cleanText);
          console.log('[Multi-AI Engine] Success via Groq API!');
          return parsed;
        }
      } else {
        const errText = await response.text();
        console.warn(`[Groq Error ${response.status}]:`, errText);
        errors.push(`Groq: ${errText}`);
      }
    } catch (e: any) {
      console.warn('[Groq Exception]:', e.message);
      errors.push(`Groq: ${e.message}`);
    }
  }

  // Provider 4: OpenAI API (gpt-4o-mini)
  if (openaiKey) {
    try {
      console.log('[Multi-AI Engine] Attempting call via OpenAI API (gpt-4o-mini)...');
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`
        },
        signal: AbortSignal.timeout(20000),
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages,
          temperature: 0.7,
          response_format: { type: 'json_object' }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          const cleanText = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
          const parsed = JSON.parse(cleanText);
          console.log('[Multi-AI Engine] Success via OpenAI API!');
          return parsed;
        }
      } else {
        const errText = await response.text();
        console.warn(`[OpenAI Error ${response.status}]:`, errText);
        errors.push(`OpenAI: ${errText}`);
      }
    } catch (e: any) {
      console.warn('[OpenAI Exception]:', e.message);
      errors.push(`OpenAI: ${e.message}`);
    }
  }

  throw new Error(
    `[Multi-AI Engine Error]: All AI Providers failed or no valid API key was provided. Errors: ${
      errors.join(' | ') || 'Please set GEMINI_API_KEY, GROK_API_KEY, GROQ_API_KEY, or OPENAI_API_KEY in .env.local.'
    }`
  );
}

/**
 * AI-assisted Brand Research & Creator Matching Engine
 */
export async function runAIBrandResearch(brandId: string): Promise<ResearchProfile> {
  const brand = await prisma.brand.findUnique({
    where: { id: brandId },
    include: { contacts: true }
  });

  if (!brand) throw new Error(`Brand not found for ID: ${brandId}`);

  const creators = await prisma.creator.findMany({
    where: { isArchived: false, isActive: true }
  });

  const creatorsSummary = creators.map((c: any) => ({
    id: c.id,
    name: c.name,
    category: c.category,
    platform: c.platform,
    subscribers: c.subscribers,
    bio: c.bio
  }));

  const systemPrompt = `You are an AI Brand Analyst for Hydrasaurus Agency (Gaming Creator Management).
Your task is to analyze a brand and select the 2 to 3 best-fit creators from our roster.
Return a valid JSON object matching this schema:
{
  "description": "string",
  "productCategory": "string",
  "targetAudience": "string",
  "brandPositioning": "string",
  "brandTone": "string",
  "marketingStyle": "string",
  "creatorOpportunities": "string",
  "sponsorshipAngles": "string",
  "audienceOverlap": "string",
  "recommendedType": "string (e.g. Livestream Sponsorship, Creator Campaign, Product Placement)",
  "matchedCreatorIds": ["array of creator IDs from roster"],
  "autoPitchReasoning": "string explaining why these specific creators fit this brand"
}`;

  const userPrompt = `Brand Name: ${brand.name}
Website: ${brand.website}
Category: ${brand.category}

Available Agency Roster Creators:
${JSON.stringify(creatorsSummary, null, 2)}`;

  const aiResult = await callAILanguageModel([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ]);

  if (!aiResult || !aiResult.description || !Array.isArray(aiResult.matchedCreatorIds)) {
    throw new Error('[AI Research Error]: AI did not return valid brand research schema.');
  }

  const profileData = {
    brandId,
    description: aiResult.description,
    productCategory: aiResult.productCategory || brand.category,
    targetAudience: aiResult.targetAudience || 'Gamers & Livestream Viewers',
    brandPositioning: aiResult.brandPositioning || 'High Performance Gaming',
    brandTone: aiResult.brandTone || 'Energetic & Professional',
    marketingStyle: aiResult.marketingStyle || 'Stream Overlay & Product Placement',
    creatorOpportunities: aiResult.creatorOpportunities || 'In-stream integrations & giveaways',
    sponsorshipAngles: aiResult.sponsorshipAngles || `Official ${brand.category} Partner`,
    audienceOverlap: aiResult.audienceOverlap || 'High 90%+ match',
    recommendedType: aiResult.recommendedType || 'Livestream Sponsorship',
    matchedCreatorIds: aiResult.matchedCreatorIds.slice(0, 3),
    autoPitchReasoning: aiResult.autoPitchReasoning || `Matched top creators based on category fit for ${brand.name}.`
  };

  const research = await prisma.researchProfile.upsert({
    where: { brandId },
    update: profileData,
    create: profileData
  });

  await prisma.brand.update({
    where: { id: brandId },
    data: { status: 'RESEARCH_COMPLETE' }
  });

  await prisma.activity.create({
    data: {
      brandId,
      type: 'RESEARCH_RUN',
      title: 'AI Brand Research Completed',
      details: `Analyzed brand ${brand.name} and matched creators.`
    }
  });

  return research as any;
}

/**
 * AI-powered Outreach Email Generator with Version History Support (V1 -> V2 -> V3)
 */
export async function generateAIEmailDraft(brandId: string): Promise<EmailDraft> {
  const brand = await prisma.brand.findUnique({
    where: { id: brandId },
    include: { contacts: true, researchProfile: true }
  });

  if (!brand) throw new Error(`Brand not found for ID: ${brandId}`);

  let research: any = brand.researchProfile;
  if (!research) {
    research = await runAIBrandResearch(brandId);
  }

  const existingDrafts = await prisma.emailDraft.findMany({
    where: { brandId },
    orderBy: { version: 'desc' }
  });

  const nextVersion = existingDrafts.length > 0 ? existingDrafts[0].version + 1 : 1;

  const matchedCreators = await prisma.creator.findMany({
    where: { id: { in: research.matchedCreatorIds } }
  });

  const creatorNames = matchedCreators.map((c: any) => c.name).join(', ') || 'PN Syed & DollyIsLive';
  const recipientName = brand.contacts?.[0]?.name || 'Marketing Team';
  const ragContext = await queryKnowledgeBase(brand.category);

  const systemPrompt = `You are the Commercial Director of Hydrasaurus Agency (Gaming Creator Management & Livestream Operations, 25+ creators, 570K+ combined audience on YouTube & Kick).
Write a hyper-personalized sponsorship pitch email (Version ${nextVersion}).
STRICT REQUIREMENTS:
- Maximum 150 words.
- Mention brand name "${brand.name}".
- Mention matched creators (${creatorNames}) and explain why they fit.
- Use facts from the provided Agency RAG Knowledge Base.
- Sound human, authoritative, high-value, non-spammy, and concise.
- Include a clear 10-minute intro call CTA.
Return a valid JSON object with schema:
{
  "subject": "string",
  "body": "string",
  "partnershipAngle": "string",
  "callToAction": "string"
}`;

  const userPrompt = `Target Brand: ${brand.name}
Category: ${brand.category}
Recipient: ${recipientName} (${brand.contacts?.[0]?.email || 'N/A'})
Research Summary: ${research.description}
Recommended Activation: ${research.recommendedType}
Creator Rationale: ${research.autoPitchReasoning}

RAG Knowledge Base Context:
${ragContext}`;

  const aiResult = await callAILanguageModel([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ]);

  if (!aiResult || !aiResult.subject || !aiResult.body) {
    throw new Error('[AI Draft Error]: AI failed to return a valid email draft object.');
  }

  const draft = await prisma.emailDraft.create({
    data: {
      brandId,
      subject: aiResult.subject,
      body: aiResult.body,
      matchedCreatorIds: research.matchedCreatorIds,
      partnershipAngle: aiResult.partnershipAngle || research.sponsorshipAngles,
      callToAction: aiResult.callToAction || '10-minute intro call this week',
      status: 'DRAFT',
      version: nextVersion
    }
  });

  await prisma.brand.update({
    where: { id: brandId },
    data: { status: 'DRAFT_GENERATED' }
  });

  await prisma.activity.create({
    data: {
      brandId,
      type: 'DRAFT_GENERATED',
      title: `AI Email Draft V${nextVersion} Generated`,
      details: `Draft version ${nextVersion} created targeting ${recipientName}.`
    }
  });

  return draft as any;
}

/**
 * AI Reply Sentiment & Pipeline Classifier
 */
export async function classifyReplySentiment(replyBody: string): Promise<BrandStatus> {
  const systemPrompt = `You are a CRM Sentiment Classifier for an agency outreach system.
Classify the incoming brand email reply into EXACTLY ONE of these pipeline status codes:
- PARTNERSHIP_SIGNED (if agreement, contract signed, or sponsorship deal closed)
- MEETING_SCHEDULED (if user agreed to intro call, meeting, or provided call times)
- INTERESTED (if brand shows interest, requests deck, pricing, or media kit)
- NEED_MORE_INFO (if brand asks clarifying questions about roster, reach, or deliverables)
- NOT_INTERESTED (if brand declines, has no budget, or asks to unsubscribe)

Return JSON format: { "status": "EXACT_STATUS_CODE" }`;

  const aiResult = await callAILanguageModel([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Reply Content:\n${replyBody}` }
  ]);

  const validStatuses: BrandStatus[] = [
    'PARTNERSHIP_SIGNED', 'MEETING_SCHEDULED', 'INTERESTED', 'NEED_MORE_INFO', 'NOT_INTERESTED'
  ];

  if (aiResult && validStatuses.includes(aiResult.status)) {
    return aiResult.status;
  }

  return 'INTERESTED';
}
