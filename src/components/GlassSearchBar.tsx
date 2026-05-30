import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/theme";
import { styles } from "../styles/styles";

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  placeholder: string;
  multiline?: boolean;
};

export const GlassSearchBar = ({
  value,
  onChangeText,
  placeholder,
  multiline = false,
}: Props) => {
  return (
    <View
      style={[
        styles.glassSearchContainer,
        multiline && styles.glassSearchContainerMultiline,
      ]}
    >
      <Ionicons
        name="search-outline"
        size={18}
        color={colors.textSecondaryDark}
        style={{ marginRight: 10 }}
      />

      <TextInput
        style={[
          styles.glassSearchInput,
          multiline && styles.glassSearchInputMultiline,
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
      />

      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => onChangeText("")}
          style={styles.glassSearchClearBtn}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={16} color={colors.textSecondaryDark} />
        </TouchableOpacity>
      )}
    </View>
  );
};
