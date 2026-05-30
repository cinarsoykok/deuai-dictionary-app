import { OPENAI_API_KEY } from "../../config";

const CHAT_URL = "https://api.openai.com/v1/chat/completions";
const IMG_URL = "https://api.openai.com/v1/images/generations";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${OPENAI_API_KEY}`,
};


export const getWordTranslations = async (text: string) => {
  const res = await fetch(CHAT_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Translate the German word precisely into English and Turkish. Return ONLY this format:\nEnglish: <translation>\nTurkish: <translation>",
        },
        { role: "user", content: `Word: ${text}` },
      ],
    }),
  });

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content ?? "";

  const english = content.match(/English:\s*(.+)/i)?.[1]?.trim() || "";
  const turkish = content.match(/Turkish:\s*(.+)/i)?.[1]?.trim() || "";

  return { english, turkish };
};

export const getGermanDefinitionAndExamples = async (text: string) => {
  const res = await fetch(CHAT_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a German teacher who explains words at A1–A2 level. Return:\n1. One very simple German definition (A1 words only).\n2. Three very easy example sentences (A1-A2), each max 6–10 words.\nUse each item on a new line.",
        },
        { role: "user", content: `Wort: ${text}` },
      ],
    }),
  });

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content ?? "";
  const lines = content.split("\n").filter((l: string) => l.trim() !== "");

  return {
    definition: lines[0] ?? "",
    examples: lines.slice(1).join("\n"),
  };
};

export const translateDefinitionToEnglish = async (definition: string) => {
  const res = await fetch(CHAT_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Translate the following German dictionary definition into natural English. Return only the translation.",
        },
        { role: "user", content: definition },
      ],
    }),
  });

  const data = await res.json();
  return (data.choices?.[0]?.message?.content ?? "").trim();
};

export const translateSentence = async (text: string, targetLang: string) => {
  const systemPrompt = `
You are a multilingual translator.

Tasks:
1. Detect the language of the user's text (ISO 639-1 code).
2. If the detected language is German ("de"), produce a corrected, natural German version; otherwise set corrected to null.
3. Translate the text into TWO languages:
   - "target": the language with code "${targetLang}" (this is the user selected target).
   - "german": German ("de") – ALWAYS provide this, even if the user selected another target.
4. Return ONLY valid JSON (no markdown, no commentary):

{
  "detected": "<detected language code>",
  "corrected": "<corrected German sentence or null>",
  "target": "<text translated into ${targetLang}>",
  "german": "<text translated into German>"
}
`;

  const res = await fetch(CHAT_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text },
      ],
    }),
  });

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content ?? "{}";

  const parsed = JSON.parse(content);

  return {
    detected: parsed.detected ?? "unknown",
    corrected: parsed.corrected ?? null,
    target: parsed.target ?? "",
    german: parsed.german ?? "",
  };
};

export const generateImage = async (word: string) => {
  // 1) Story + prompt oluştur
  const storyRes = await fetch(CHAT_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `
Create:
1. One short English story sentence
2. One realistic image prompt

Return ONLY valid JSON:

{
  "story": "...",
  "prompt": "..."
}
`,
        },
        {
          role: "user",
          content: `German word: ${word}`,
        },
      ],
    }),
  });

  const storyData = await storyRes.json();

  const rawContent =
    storyData?.choices?.[0]?.message?.content ?? "";

  let story = "";
  let imagePrompt = "";

  try {
    const parsed = JSON.parse(rawContent);

    story = parsed.story || "";

    imagePrompt = parsed.prompt || "";
  } catch {
    imagePrompt = `A realistic photo representing the German word "${word}"`;
  }

  // 2) Görsel oluştur
  const imgRes = await fetch(IMG_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt: imagePrompt,
      size: "1024x1024",
    }),
  });

  const imgData = await imgRes.json();

  console.log("IMG DATA:", imgData);

  // OpenAI artık çoğunlukla b64_json dönüyor
  const base64Image = imgData?.data?.[0]?.b64_json;
const firstImage = imgData?.data?.[0];

console.log("FIRST IMAGE:", firstImage);

let imageUrl = null;

// URL varsa direkt kullan
if (firstImage?.url) {
  imageUrl = firstImage.url;
}

// base64 varsa PNG data uri oluştur
else if (firstImage?.b64_json) {
  imageUrl = `data:image/png;base64,${firstImage.b64_json}`;
}

console.log("FINAL IMAGE URL:", imageUrl);

  return {
    story,
    imageUrl,
  };
};
