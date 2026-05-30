import React from "react";
import { View, Text, TouchableOpacity, Animated, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlassSearchBar } from "../components/GlassSearchBar";
import { Card } from "../components/Card";
import { cleanExampleLine } from "../utils/text";
import { styles } from "../styles/styles";

type Props = {
  input: string;
  setInput: (t: string) => void;
  isLoading: boolean;
  error: string | null;

  showResults: boolean;
  resultsAnim: Animated.Value;

  definition: string | null;
  definitionEnglish: string | null;
  examples: string | null;
  translations: any;
  imageSentence: string | null;
  generatedImage: string | null;

  handleSubmit: () => void;
  saveCurrentWord: () => void;
  handleCopy: (t: string) => void;
};

export const DictionaryScreen = ({
  input,
  setInput,
  isLoading,
  error,
  showResults,
  resultsAnim,
  definition,
  definitionEnglish,
  examples,
  translations,
  imageSentence,
  generatedImage,
  handleSubmit,
  saveCurrentWord,
  handleCopy,
}: Props) => {
  return (
    <>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>DeuAI</Text>

        <GlassSearchBar
          value={input}
          onChangeText={setInput}
          placeholder="Gib ein deutsches Wort ein..."
        />

        <TouchableOpacity
          style={[styles.heroButton, isLoading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
          activeOpacity={0.9}
        >
          <Text style={styles.heroButtonText}>
            {isLoading ? "Lädt..." : "Wort analysieren"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.heroSave} onPress={saveCurrentWord} activeOpacity={0.85}>
          <Ionicons name="bookmark-outline" size={16} color="#93C5FD" />
          <View style={{ width: 8 }} />
          <Text style={styles.heroSaveText}>Wort speichern</Text>
        </TouchableOpacity>

        {error && <Text style={styles.error}>{error}</Text>}
      </View>

      {showResults && (
        <Animated.View
          style={[
            styles.resultsWrap,
            {
              opacity: resultsAnim,
              transform: [
                {
                  translateY: resultsAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [24, 0],
                  }),
                },
                {
                  scale: resultsAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.98, 1],
                  }),
                },
              ],
            },
          ]}
        >
          {definition && (
            <Card
              titleNode={
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="book-outline" size={18} color="#93C5FD" />
                  <View style={{ width: 8 }} />
                  <Text style={styles.cardTitle}>Definition (Deutsch)</Text>
                </View>
              }
            >
              <Text style={styles.text} selectable onLongPress={() => handleCopy(definition)}>
                {definition}
              </Text>
            </Card>
          )}

          {definitionEnglish && (
            <Card
              titleNode={
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="document-text-outline" size={18} color="#93C5FD" />
                  <View style={{ width: 8 }} />
                  <Text style={styles.cardTitle}>Definition (English)</Text>
                </View>
              }
            >
              <Text style={styles.text} selectable onLongPress={() => handleCopy(definitionEnglish)}>
                {definitionEnglish}
              </Text>
            </Card>
          )}

          {examples && (
            <Card
              titleNode={
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="create-outline" size={18} color="#93C5FD" />
                  <View style={{ width: 8 }} />
                  <Text style={styles.cardTitle}>Beispielsätze</Text>
                </View>
              }
            >
              {examples
                .split("\n")
                .map((line) => cleanExampleLine(line))
                .filter(Boolean)
                .map((cleaned, idx) => (
                  <Text key={idx} style={styles.text} selectable onLongPress={() => handleCopy(cleaned)}>
                    • {cleaned}
                  </Text>
                ))}
            </Card>
          )}

          {translations?.english && translations?.turkish && (
            <Card
              titleNode={
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="language-outline" size={18} color="#93C5FD" />
                  <View style={{ width: 8 }} />
                  <Text style={styles.cardTitle}>Wort-Übersetzungen</Text>
                </View>
              }
            >
              <Text style={styles.text} selectable onLongPress={() => handleCopy(`English: ${translations.english}`)}>
                🇬🇧 <Text style={styles.savedLabel}>English:</Text>{" "}
                <Text style={styles.highlight}>{translations.english}</Text>
              </Text>
              <Text style={styles.text} selectable onLongPress={() => handleCopy(`Türkçe: ${translations.turkish}`)}>
                🇹🇷 <Text style={styles.savedLabel}>Türkçe:</Text>{" "}
                <Text style={styles.highlight}>{translations.turkish}</Text>
              </Text>
            </Card>
          )}

          {imageSentence && (
            <Card
              titleNode={
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="sparkles-outline" size={18} color="#93C5FD" />
                  <View style={{ width: 8 }} />
                  <Text style={styles.cardTitle}>Story (English)</Text>
                </View>
              }
            >
              <Text style={styles.text} selectable onLongPress={() => handleCopy(imageSentence)}>
                {imageSentence}
              </Text>
            </Card>
          )}

          {generatedImage && (
            <Card
              titleNode={
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="image-outline" size={18} color="#93C5FD" />
                  <View style={{ width: 8 }} />
                  <Text style={styles.cardTitle}>KI-Bild</Text>
                </View>
              }
            >
              <View style={styles.imageContainer}>
            
                <Image
                    source={{
                      uri: generatedImage || undefined,
                    }}
                    style={styles.generatedImage}
                    resizeMode="contain"
                />
              </View>
            </Card>
          )}
        </Animated.View>
      )}
    </>
  );
};
