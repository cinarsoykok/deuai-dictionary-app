import React from "react";
import { Text } from "react-native";
import { Card } from "../components/Card";
import { styles } from "../styles/styles";

export const SettingsScreen = () => {
  return (
    <>
      <Card title="⚙️ Einstellungen">
        <Text style={styles.text}>
          Hier kannst du später Dinge wie Thema, Sprache oder KI-Einstellungen
          anpassen. Für jetzt ist dies nur ein Platzhalter.
        </Text>
      </Card>
    </>
  );
};
