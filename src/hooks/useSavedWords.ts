import { useEffect, useState } from "react";
import { loadSavedWords, persistSavedWords, SavedWord } from "../storage/savedWords";

export const useSavedWords = () => {
  const [savedWords, setSavedWords] = useState<SavedWord[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const words = await loadSavedWords();
        setSavedWords(words);
      } catch (e) {
        console.error("Error loading saved words", e);
      }
    })();
  }, []);

  const addWord = async (w: SavedWord) => {
    const updated = [...savedWords, w];
    setSavedWords(updated);
    await persistSavedWords(updated);
  };

  const removeWord = async (id: string) => {
    const updated = savedWords.filter((x) => x.id !== id);
    setSavedWords(updated);
    await persistSavedWords(updated);
  };

  const exists = (word: string) =>
    savedWords.some((w) => w.word.toLowerCase() === word.toLowerCase());

  return { savedWords, setSavedWords, addWord, removeWord, exists };
};
