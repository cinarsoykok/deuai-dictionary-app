import * as Speech from "expo-speech";

type SpeakOpts = Speech.SpeechOptions;

function speakAsync(text: string, options?: SpeakOpts) {
  return new Promise<void>((resolve) => {
    if (!text?.trim()) return resolve();

    Speech.speak(text.trim(), {
      ...options,
      rate: 0.45,
      onDone: () => resolve(),
      onStopped: () => resolve(),
      onError: () => resolve(),
    });
  });
}

export async function speakSavedWord(item: {
  word: string;
  english: string;
  turkish: string;
  example: string;
}) {
  // stop any previous speech (important if user taps fast)
  Speech.stop();

  // You can customize these labels if you want them spoken too
  await speakAsync(item.word, { language: "de-DE" });
  await speakAsync(item.english, { language: "en-US" });
  await speakAsync(item.turkish, { language: "tr-TR" });
  await speakAsync(item.example, { language: "de-DE" });
}

export function stopSpeaking() {
  Speech.stop();
}
