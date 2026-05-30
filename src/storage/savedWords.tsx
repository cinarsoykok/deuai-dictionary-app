import AsyncStorage from "@react-native-async-storage/async-storage";

export const SAVED_WORDS_KEY = "deuai_saved_words";

export type SavedWord = {
  id: string;
  word: string;
  english: string;
  turkish: string;
  example?: string;
};

export const loadSavedWords = async (): Promise<SavedWord[]> => {
  const json = await AsyncStorage.getItem(SAVED_WORDS_KEY);
  if (!json) return [];

  const parsed = JSON.parse(json) as any[];

  return parsed.map((item, index) => ({
    id: item.id?.toString() ?? `${index}`,
    word: item.word ?? "",
    english: item.english ?? item.definitionEnglish ?? "",
    turkish: item.turkish ?? "",
    example: item.example ?? "",
  }));
};

export const persistSavedWords = async (words: SavedWord[]) => {
  await AsyncStorage.setItem(SAVED_WORDS_KEY, JSON.stringify(words));
};
