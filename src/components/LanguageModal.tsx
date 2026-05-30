import React from "react";
import { Modal, Pressable, View, Text, ScrollView } from "react-native";
import { languages } from "../constants/languages";
import { styles } from "../styles/styles";

type Props = {
  visible: boolean;
  activeCode: string;
  onSelect: (code: string) => void;
  onClose: () => void;
  title: string;
};

export const LanguageModal = ({
  visible,
  activeCode,
  onSelect,
  onClose,
  title,
}: Props) => (
  <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
    <Pressable style={styles.modalBackdrop} onPress={onClose} />
    <View style={styles.modalSheet}>
      <Text style={styles.modalTitle}>{title}</Text>
      <ScrollView style={{ maxHeight: 340 }}>
        {languages.map((lang) => (
          <Pressable
            key={lang.code}
            style={[
              styles.modalItem,
              activeCode === lang.code && styles.modalItemActive,
            ]}
            onPress={() => {
              onSelect(lang.code);
              onClose();
            }}
          >
            <Text
              style={[
                styles.modalItemText,
                activeCode === lang.code && styles.modalItemTextActive,
              ]}
            >
              {lang.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  </Modal>
);
