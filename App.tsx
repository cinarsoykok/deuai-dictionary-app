import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView, StatusBar, ToastAndroid, Platform, Alert, Keyboard, Animated, Easing } from "react-native";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./src/styles/styles";
import { colors } from "./src/constants/theme";
import { getLangName } from "./src/constants/languages";
import { cleanExampleLine } from "./src/utils/text";
import { useSavedWords } from "./src/hooks/useSavedWords";

import { DictionaryScreen } from "./src/screens/DictionaryScreen";
import { TranslatorScreen } from "./src/screens/TranslatorScreen";
import { SavedScreen } from "./src/screens/SavedScreen";
import { SettingsScreen } from "./src/screens/SettingsScreen";

import { LanguageModal } from "./src/components/LanguageModal";
import { ToastSaved } from "./src/components/ToastSaved";
import { renderTabButton } from "./src/navigation/BottomTabs";

import {
  generateImage,
  getGermanDefinitionAndExamples,
  getWordTranslations,
  translateDefinitionToEnglish,
  translateSentence,
} from "./src/services/openai";

export default function App() {
  const [activeTab, setActiveTab] = useState("dictionary");
  const mode = activeTab === "translator" ? "sentence" : "word";

  const [input, setInput] = useState("");

  const [definition, setDefinition] = useState<string | null>(null);
  const [definitionEnglish, setDefinitionEnglish] = useState<string | null>(null);
  const [examples, setExamples] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imageSentence, setImageSentence] = useState<string | null>(null);

  const [translations, setTranslations] = useState<any>(null);
  const [correctedGerman, setCorrectedGerman] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [sourceLang, setSourceLang] = useState("auto");
  const [targetLang, setTargetLang] = useState("de");
  const [showSourceModal, setShowSourceModal] = useState(false);
  const [showTargetModal, setShowTargetModal] = useState(false);

  const { savedWords, addWord, removeWord, exists } = useSavedWords();

  const resultsAnim = useRef(new Animated.Value(0)).current;
  const [showResults, setShowResults] = useState(false);

  const saveToastAnim = useRef(new Animated.Value(0)).current;
  const [saveToastText, setSaveToastText] = useState("Saved!");
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [saveToastType, setSaveToastType] = useState<"success" | "info">("success");

  const showSavedToast = (text: string, type: "success" | "info" = "success") => {
    setSaveToastText(text);
    setShowSaveToast(true);
    saveToastAnim.setValue(0);
    setSaveToastType(type);

    Animated.sequence([
      Animated.timing(saveToastAnim, {
        toValue: 1,
        duration: 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.delay(1100),
      Animated.timing(saveToastAnim, {
        toValue: 0,
        duration: 220,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(() => setShowSaveToast(false));
  };

  const openResults = () => {
    setShowResults(true);
    resultsAnim.setValue(0);
    Animated.timing(resultsAnim, {
      toValue: 1,
      duration: 420,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const resetAll = () => {
    setDefinition(null);
    setDefinitionEnglish(null);
    setExamples(null);
    setGeneratedImage(null);
    setImageSentence(null);
    setTranslations(null);
    setCorrectedGerman(null);
    setError(null);
  };

  const handleCopy = (text?: string) => {
    if (!text) return;
    Clipboard.setStringAsync(text);
    if (Platform.OS === "android") ToastAndroid.show("Kopiert!", ToastAndroid.SHORT);
    else Alert.alert("Kopiert!", "Text wurde in die Zwischenablage kopiert.");
  };

  const saveCurrentWord = async () => {
    if (mode !== "word") return;
    if (!input.trim()) return setError("Du musst zuerst ein Wort eingeben.");
    if (!translations?.english || !translations?.turkish || !examples)
      return setError('Analysiere das Wort zuerst mit „Wort analysieren“.');

    const lines = examples.split("\n").map((l) => l.trim()).filter(Boolean);
    const firstLine = lines[0] ?? "";
    const exampleSentence = firstLine.includes(":")
      ? firstLine.split(":").slice(1).join(":").trim()
      : firstLine;

    const newWord = {
      id: Date.now().toString(),
      word: input.trim(),
      english: translations.english,
      turkish: translations.turkish,
      example: exampleSentence,
    };

    if (exists(newWord.word)) {
      showSavedToast("Schon gespeichert!", "info");
      return;
    }

    await addWord(newWord);
    showSavedToast("Wort gespeichert!", "success");
    setError(null);
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    if (!input.trim()) {
      setError(mode === "word" ? "Bitte gib ein deutsches Wort ein." : "Bitte gib einen Satz oder Text ein.");
      return;
    }

    setIsLoading(true);
    resetAll();

    try {
      if (mode === "word") {
        const [deInfo, img, trans] = await Promise.all([
          getGermanDefinitionAndExamples(input),
          generateImage(input),
          getWordTranslations(input),
        ]);

        setDefinition(deInfo.definition);
        setExamples(deInfo.examples);

        const translatedDef = await translateDefinitionToEnglish(deInfo.definition);
        setDefinitionEnglish(translatedDef);

        setImageSentence(img.story);
        if (img.imageUrl) setGeneratedImage(img.imageUrl);

        setTranslations({ english: trans.english, turkish: trans.turkish });
        openResults();
      } else {
        const result = await translateSentence(input, targetLang);
        setCorrectedGerman(result.corrected);
        setTranslations({ translated: result.target, german: result.german });
        openResults();
      }
    } catch (e) {
      console.error(e);
      setError("Fehler beim Laden der Daten.");
    } finally {
      setIsLoading(false);
    }
  };

  const swapLanguages = () => {
    if (sourceLang === "auto") return;
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
  };

  const renderContent = () => {
    if (activeTab === "dictionary")
      return (
        <DictionaryScreen
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          error={error}
          showResults={showResults}
          resultsAnim={resultsAnim}
          definition={definition}
          definitionEnglish={definitionEnglish}
          examples={examples}
          translations={translations}
          imageSentence={imageSentence}
          generatedImage={generatedImage}
          handleSubmit={handleSubmit}
          saveCurrentWord={saveCurrentWord}
          handleCopy={handleCopy}
        />
      );

    if (activeTab === "translator")
      return (
        <TranslatorScreen
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          error={error}
          correctedGerman={correctedGerman}
          translations={translations}
          sourceLang={sourceLang}
          targetLang={targetLang}
          swapLanguages={swapLanguages}
          openSourceModal={() => setShowSourceModal(true)}
          openTargetModal={() => setShowTargetModal(true)}
          handleSubmit={handleSubmit}
          handleCopy={handleCopy}
        />
      );

    if (activeTab === "saved")
      return (
        <SavedScreen
          savedWords={savedWords}
          onDelete={removeWord}
          onCopy={handleCopy}
          cleanExampleLine={cleanExampleLine}
        />
      );

    return <SettingsScreen />;
  };

  return (
    <>
      <ToastSaved visible={showSaveToast} anim={saveToastAnim} text={saveToastText} type={saveToastType} />

      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.darkBg} />

        <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 100 }} keyboardShouldPersistTaps="handled">
          {renderContent()}
        </ScrollView>

        <View style={styles.tabBar}>
          {renderTabButton("dictionary", <Ionicons name="book-outline" size={22} />, "Wörterbuch", activeTab, setActiveTab)}
          {renderTabButton("translator", <Ionicons name="language-outline" size={22} />, "Übersetzer", activeTab, setActiveTab)}
          {renderTabButton("saved", <Ionicons name="bookmark-outline" size={22} />, "Gespeichert", activeTab, setActiveTab)}
          {renderTabButton("settings", <Ionicons name="settings-outline" size={22} />, "Settings", activeTab, setActiveTab)}
        </View>

        {activeTab === "translator" && (
          <>
            <LanguageModal
              visible={showSourceModal}
              activeCode={sourceLang}
              onSelect={setSourceLang}
              onClose={() => setShowSourceModal(false)}
              title="Eingabesprache wählen"
            />
            <LanguageModal
              visible={showTargetModal}
              activeCode={targetLang}
              onSelect={setTargetLang}
              onClose={() => setShowTargetModal(false)}
              title="Zielsprache wählen"
            />
          </>
        )}
      </View>
    </>
  );
}
