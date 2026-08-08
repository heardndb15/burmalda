import type { VercelRequest, VercelResponse } from '@vercel/node';
import { buildContractPrompt, callGemini, type ContractInput } from './_lib/gemini';

const REQUIRED_FIELDS: Array<keyof ContractInput> = [
  'workerName',
  'position',
  'salary',
  'duties',
  'farmName',
  'farmOwnerName',
  'startDate',
  'endDate',
];

function isValidBody(body: unknown): body is ContractInput {
  if (!body || typeof body !== 'object') return false;
  return REQUIRED_FIELDS.every((field) => {
    const value = (body as Record<string, unknown>)[field];
    return typeof value === 'string' && value.trim().length > 0;
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Метод не поддерживается' });
    return;
  }

  if (!isValidBody(req.body)) {
    res.status(400).json({ error: 'Не хватает обязательных полей запроса' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('generate-contract: GEMINI_API_KEY не задан в окружении');
    res.status(500).json({ error: 'Сервис генерации договоров временно недоступен' });
    return;
  }

  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  const prompt = buildContractPrompt(req.body);

  try {
    const contractText = await callGemini(prompt, apiKey, model);
    res.status(200).json({ contractText });
  } catch (err) {
    console.error('generate-contract: вызов Gemini не удался', err);
    res.status(502).json({ error: 'Не удалось сформировать договор, попробуйте ещё раз' });
  }
}
