export const cleanExampleLine = (raw?: string) => {
  if (!raw) return "";
  let s = raw.trim();

  // "Beispiel 1: Ich ..." → "Ich ..."
  s = s.replace(/^Beispiel[e]?\s*\d*\s*:\s*/i, "");

  // "1. Ich ..." / "2) Ich ..." / "3 : Ich ..." → "Ich ..."
  s = s.replace(/^\d+\s*[\.\)\:\-]\s*/, "");

  return s.trim();
};
