export interface ContractInput {
  workerName: string;
  position: string;
  salary: string;
  duties: string;
  farmName: string;
  farmOwnerName: string;
  startDate: string;
  endDate: string;
}

export function buildContractPrompt(input: ContractInput): string {
  return `Ты — юрист, специализирующийся на трудовом праве Республики Казахстан.
Составь содержательные пункты трудового договора между работодателем и работником
на основе данных ниже. Пиши на русском языке, обычным текстом (без markdown,
без символов ** и без списков через "-"), раздели пункты пустой строкой. Не
добавляй шапку договора (номер, место, дату), стороны и место для подписей —
это добавит фронтенд отдельно. Начни сразу с раздела "1. ПРЕДМЕТ ДОГОВОРА".

Обязательно включи ровно эти пронумерованные разделы:
1. ПРЕДМЕТ ДОГОВОРА
2. ОБЯЗАННОСТИ РАБОТНИКА
3. ПРАВА И ОБЯЗАННОСТИ РАБОТОДАТЕЛЯ
4. СРОК ДЕЙСТВИЯ ДОГОВОРА
5. ОТВЕТСТВЕННОСТЬ СТОРОН

Данные:
Работодатель: ${input.farmName}, в лице руководителя ${input.farmOwnerName}.
Работник: ${input.workerName}, должность: ${input.position}.
Ежемесячная заработная плата: ${input.salary} тенге.
Обязанности работника: ${input.duties}.
Срок действия договора: с ${input.startDate} по ${input.endDate}.`;
}

interface GeminiResponse {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string }> };
    finishReason?: string;
  }>;
  promptFeedback?: { blockReason?: string };
}

export async function callGemini(prompt: string, apiKey: string, model: string): Promise<string> {
  // API-ключ передаётся query-параметром, не заголовком — заголовочная
  // авторизация у Gemini REST API ненадёжна.
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.4, maxOutputTokens: 4096 },
      }),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini API вернул ошибку ${response.status}: ${errorBody}`);
  }

  const data = (await response.json()) as GeminiResponse;

  if (data.promptFeedback?.blockReason) {
    throw new Error(`Gemini заблокировал запрос: ${data.promptFeedback.blockReason}`);
  }

  const finishReason = data.candidates?.[0]?.finishReason;
  if (finishReason && finishReason !== 'STOP') {
    throw new Error(`Gemini не завершил генерацию корректно (finishReason: ${finishReason})`);
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('Gemini не вернул текст в ответе');
  }

  return text.trim();
}
