// src/screens/SavedScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "../styles/styles";
import { speakSavedWord, stopSpeaking } from "../utils/speechQueue";

type SavedWord = {
  id: string;
  word: string;
  english: string;
  turkish: string;
  example?: string;
};

type Props = {
  savedWords: SavedWord[];
  onDelete: (id: string) => void;
  onCopy: (t?: string) => void;
  cleanExampleLine: (raw?: string) => string;
};

export const SavedScreen = ({
  savedWords,
  onDelete,
  onCopy,
  cleanExampleLine,
}: Props) => {
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const handleSpeakSaved = async (w: SavedWord) => {
    // same item tapped again -> stop
    if (speakingId === w.id) {
      stopSpeaking();
      setSpeakingId(null);
      return;
    }

    setSpeakingId(w.id);

    try {
      await speakSavedWord({
        word: w.word,
        english: w.english,
        turkish: w.turkish,
        example: cleanExampleLine(w.example || ""),
      });
    } finally {
      setSpeakingId(null);
    }
  };

  return (
    <View style={styles.savedWrapper}>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          marginBottom: 10,
        }}
      >
        <Ionicons
          name="bookmark-outline"
          size={20}
          color="#93C5FD"
          style={{ marginRight: 8, marginTop: 1 }}
        />
        <View style={{ width: 8 }} />
        <Text style={styles.savedHeader}>
          Gespeicherte Wörter ({savedWords.length})
        </Text>
      </View>

      {savedWords.length === 0 ? (
        <Text style={styles.savedEmptyText}>
          Du hast noch keine Wörter gespeichert. Analysiere zuerst ein Wort und
          tippe auf „Wort speichern“.
        </Text>
      ) : (
        <ScrollView
          style={styles.savedList}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {savedWords.map((w, index) => (
            <View key={w.id} style={styles.savedCard}>
              {/* index circle */}
              <View style={styles.savedIndexCircle}>
                <Text style={styles.savedIndexText}>{index + 1}</Text>
              </View>

              {/* main text content */}
              <View style={{ flex: 1 }}>
                <Text
                  style={styles.savedWord}
                  selectable
                  onLongPress={() => onCopy(w.word)}
                >
                  {w.word}
                </Text>

                <Text
                  style={styles.savedLine}
                  selectable
                  onLongPress={() => onCopy(w.english)}
                >
                  🇬🇧 <Text style={styles.savedLabel}>English:</Text>{" "}
                  <Text style={styles.savedValue}>{w.english}</Text>
                </Text>

                <Text
                  style={styles.savedLine}
                  selectable
                  onLongPress={() => onCopy(w.turkish)}
                >
                  🇹🇷 <Text style={styles.savedLabel}>Türkçe:</Text>{" "}
                  <Text style={styles.savedValue}>{w.turkish}</Text>
                </Text>

                {!!w.example && (
                  <Text
                    style={styles.savedExample}
                    selectable
                    onLongPress={() => onCopy(cleanExampleLine(w.example))}
                  >
                    ✍️ <Text style={styles.savedLabel}>Beispiel:</Text>{" "}
                    <Text style={styles.savedValue}>
                      {cleanExampleLine(w.example)}
                    </Text>
                  </Text>
                )}
              </View>

              {/* right buttons (speak + delete) */}
              <View style={styles.savedActions}>
                <TouchableOpacity
                  style={styles.savedSpeakBtn}
                  onPress={() => handleSpeakSaved(w)}
                  activeOpacity={0.8}
                >
                  {speakingId === w.id ? (
                    <ActivityIndicator />
                  ) : (
                    <Ionicons
                      name="volume-high-outline"
                      size={18}
                      color="#9CCBFF"
                    />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.savedDeleteBtn}
                  onPress={() => onDelete(w.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.savedDeleteText}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};
