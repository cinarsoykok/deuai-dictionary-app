export const languages = [
  { code: "auto", name: "Detect language" },
  { code: "de", name: "German" },
  { code: "tr", name: "Turkish" },
  { code: "en", name: "English" },
  { code: "uk", name: "Ukrainian" },
  { code: "ar", name: "Arabic" },
  { code: "bs", name: "Bosnian" },
  { code: "fa", name: "Farsi" },
  { code: "ku", name: "Kurdish" },
  { code: "mk", name: "Macedonian" },
  { code: "sq", name: "Albanian" },
  { code: "fil", name: "Filipino" },
  { code: "hi", name: "Hindi" },
] as const;

export type LangCode = (typeof languages)[number]["code"];

export const getLangName = (code: string) =>
  languages.find((l) => l.code === code)?.name || "";
