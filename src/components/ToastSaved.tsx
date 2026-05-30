import React from "react";
import { Animated, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/styles";

export type ToastType = "success" | "info";

type Props = {
  visible: boolean;
  anim: Animated.Value;
  text: string;
  type: ToastType;
};

export const ToastSaved = ({ visible, anim, text, type }: Props) => {
  if (!visible) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.saveToast,
        {
          opacity: anim,
          transform: [
            {
              translateY: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 0],
              }),
            },
            {
              scale: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.98, 1],
              }),
            },
          ],
        },
      ]}
    >
      <View
        style={[
          styles.saveToastInner,
          type === "info" && {
            borderColor: "rgba(96,165,250,0.35)",
            shadowColor: "#60A5FA",
          },
        ]}
      >
        <Ionicons
          name={type === "success" ? "checkmark-circle" : "bookmark"}
          size={20}
          color={type === "success" ? "#22C55E" : "#60A5FA"}
        />
        <Text style={styles.saveToastText}>{text}</Text>
      </View>
    </Animated.View>
  );
};
