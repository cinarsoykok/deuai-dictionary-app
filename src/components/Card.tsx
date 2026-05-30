import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles/styles";

type CardProps = {
  title?: string;
  titleNode?: React.ReactNode;
  children: React.ReactNode;
};

export const Card = ({ title, titleNode, children }: CardProps) => (
  <View style={styles.card}>
    {titleNode ? (
      titleNode
    ) : title ? (
      <Text style={styles.cardTitle}>{title}</Text>
    ) : null}
    {children}
  </View>
);
