import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { GlassSearchBar } from "../components/GlassSearchBar";
import { Card } from "../components/Card";
import { getLangName } from "../constants/languages";
import { styles } from "../styles/styles";

type Props = {
  input: string;
  setInput: (t: string) => void;

  isLoading: boolean;
  error: string | null;

  correctedGerman: string | null;
  translations: { translated?: string; german?: string } | null;

  sourceLang: string;
  targetLang: string;

  swapLanguages: () => void;
  openSourceModal: () => void;
  openTargetModal: () => void;

  handleSubmit: () => void;
  handleCopy: (t?: string) => void;
};

export const TranslatorScreen = ({
  input,
  setInput,
  isLoading,
  error,
  correctedGerman,
  translations,
  sourceLang,
  targetLang,
  swapLanguages,
  openSourceModal,
  openTargetModal,
  handleSubmit,
  handleCopy,
}: Props) => {
  return (
    <>
      {/* Language bar – sadece seçili dil görünsün */}
      <View style={styles.langRow}>
        {/* SOURCE */}
        <TouchableOpacity
          style={styles.singleLangButton}
          onPress={openSourceModal}
          activeOpacity={0.8}
        >
          <Text style={styles.singleLangLabel}>{getLangName(sourceLang)}</Text>
          <Text style={styles.singleLangArrow}>▼</Text>
        </TouchableOpacity>

        {/* SWAP */}
        <TouchableOpacity style={styles.langSwapBtn} onPress={swapLanguages}>
          <Text style={styles.langSwapIcon}>⇄</Text>
        </TouchableOpacity>

        {/* TARGET */}
        <TouchableOpacity
          style={styles.singleLangButton}
          onPress={openTargetModal}
          activeOpacity={0.8}
        >
          <Text style={styles.singleLangLabel}>{getLangName(targetLang)}</Text>
          <Text style={styles.singleLangArrow}>▼</Text>
        </TouchableOpacity>
      </View>

      <GlassSearchBar
        value={input}
        onChangeText={setInput}
        placeholder="Gib einen Satz oder Text ein..."
        multiline
      />

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={isLoading}
        activeOpacity={0.9}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Lädt..." : "Text übersetzen"}
        </Text>
      </TouchableOpacity>

      {error && <Text style={styles.error}>{error}</Text>}

      {/* Corrected German */}
      {!!correctedGerman && (
        <Card title="🇩🇪 Korrigiertes Deutsch">
          <Text
            style={styles.text}
            selectable
            onLongPress={() => handleCopy(correctedGerman)}
          >
            {correctedGerman}
          </Text>
        </Card>
      )}

      {/* Target translation */}
      {!!translations?.translated && (
        <Card title={`Übersetzung (${getLangName(targetLang)})`}>
          <Text
            style={styles.text}
            selectable
            onLongPress={() => handleCopy(translations.translated)}
          >
            {translations.translated}
          </Text>
        </Card>
      )}

      {/* Always German translation */}
      {!!translations?.german && (
        <Card title="Zusätzliche deutsche Übersetzung">
          <Text
            style={styles.text}
            selectable
            onLongPress={() => handleCopy(translations.german)}
          >
            {translations.german}
          </Text>
        </Card>
      )}
    </>
  );
};
