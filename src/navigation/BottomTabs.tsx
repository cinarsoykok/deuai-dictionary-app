import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "../styles/styles";

export const renderTabButton = (
  key: string,
  icon: React.ReactNode,
  label: string,
  activeTab: string,
  setActiveTab: (t: string) => void
) => {
  const active = activeTab === key;
  return (
    <TouchableOpacity
      onPress={() => setActiveTab(key)}
      style={styles.tabItem}
      activeOpacity={0.8}
    >
      <Text style={[styles.tabIcon, active && styles.tabIconActive]}>{icon}</Text>
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
        {label}
      </Text>
      {active && <View style={styles.tabIndicator} />}
    </TouchableOpacity>
  );
};
