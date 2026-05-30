import { StyleSheet, Platform } from "react-native";
import { colors, radius, spacing } from "../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBg,
  },

  topBar: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.textPrimaryDark,
  },
  appSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: colors.textSecondaryDark,
  },

  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },

glassSearchContainer: {
  flexDirection: "row",
  alignItems: "center",
  borderRadius: radius.xl,
  paddingHorizontal: 22,
  paddingVertical: 18,   // ⬅️ büyüttük
  marginBottom: spacing.lg,
  backgroundColor: "rgba(255,255,255,0.06)",
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.18)",
},

  glassSearchIcon: {
    fontSize: 18,
    marginRight: 8,
    color: colors.textSecondaryDark,
  },
  glassSearchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimaryDark,
  // Web'de mavi outline'ı kaldır (TS'de bu property'ler yok, o yüzden as any)
  ...(Platform.OS === "web"
    ? ({
        outlineStyle: "none",
        outlineWidth: 0,
        outlineColor: "transparent",
      } as any)
    : {}),
  },
  glassSearchClear: {
    fontSize: 16,
    marginLeft: 8,
    color: colors.textSecondaryDark,
  },

  // Primary button
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 13,
    borderRadius: radius.pill,
    alignItems: "center",
    marginBottom: spacing.md,
    shadowColor: colors.primary,
    shadowOpacity: 0.9,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: colors.textPrimaryDark,
    fontSize: 17,
    fontWeight: "700",
  },

  error: {
    color: "#f87171",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },

  // Card
  card: {
    borderRadius: radius.lg,
    padding: 18,
    marginBottom: 12,
    backgroundColor: colors.darkSurface,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimaryDark,
    marginBottom: 8,
  },

text: {
  color: colors.textPrimary,
  fontSize: 15,
  lineHeight: 22,
},

  highlight: {
    color: colors.accent,
    fontWeight: "600",
  },

  imageContainer: {
    alignItems: "center",
    marginTop: 8,
  },
  generatedImage: {
    width: "100%",
    height: 260,
    borderRadius: radius.lg,
    backgroundColor: colors.darkBg,
  },

  // Language bar
  langRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    marginTop: 18,
  },
  langSide: {
    flex: 1,
  },
  langChip: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: "#1f2937",
    marginRight: 6,
    backgroundColor: colors.darkBg,
  },
  langChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  langChipText: {
    fontSize: 12,
    color: colors.textSecondaryDark,
  },
  langChipTextActive: {
    color: colors.textPrimaryDark,
    fontWeight: "600",
  },
  langMoreBtn: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: "#1f2937",
    backgroundColor: colors.darkBg,
    marginLeft: 2,
    marginRight: 4,
  },
  langMoreText: {
    fontSize: 10,
    color: colors.textSecondaryDark,
  },
  langSwapBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  langSwapIcon: {
    fontSize: 18,
    color: colors.textPrimaryDark,
  },

  // Small button
  smallButton: {
    alignSelf: "flex-end",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    backgroundColor: "rgba(37,99,235,0.18)",
    borderWidth: 1,
    borderColor: colors.primary,
  },
  smallButtonText: {
    color: colors.textPrimaryDark,
    fontSize: 13,
    fontWeight: "600",
  },

  // Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalSheet: {
    position: "absolute",
    left: 20,
    right: 20,
    top: 110,
    borderRadius: radius.lg,
    backgroundColor: colors.darkBg,
    borderWidth: 1,
    borderColor: "#1f2937",
    padding: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimaryDark,
    marginBottom: 10,
  },
  modalItem: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: radius.sm,
  },
  modalItemActive: {
    backgroundColor: colors.primary,
  },
  modalItemText: {
    color: "#cbd5f5",
    fontSize: 14,
  },
  modalItemTextActive: {
    color: colors.textPrimaryDark,
    fontWeight: "600",
  },

  // Tab bar
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 8,
    backgroundColor: "rgba(15,23,42,0.96)",
    borderTopWidth: 1,
    borderTopColor: "#1f2937",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 6,
  },
  tabIcon: {
    fontSize: 18,
    color: colors.textSecondaryDark,
  },
  tabIconActive: {
    color: colors.primary,
  },
  tabLabel: {
    fontSize: 11,
    color: colors.textSecondaryDark,
    marginTop: 2,
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: "600",
  },
  tabIndicator: {
    marginTop: 4,
    width: 6,
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },

  // Saved words
  savedWrapper: {
    marginTop: 8,
  },
  savedHeader: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimaryDark,
    marginBottom: 10,
    lineHeight: 22,
  },
  savedEmptyText: {
    fontSize: 14,
    color: colors.textSecondaryDark,
    marginTop: 10,
  },
  savedList: {
    marginTop: 4,
  },
  savedCard: {
    flexDirection: "row",
    padding: 14,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: "#1f2937",
    marginBottom: 8,
    backgroundColor: colors.darkSurface,
  },
  savedIndexCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  savedIndexText: {
    color: "#93c5fd",
    fontWeight: "700",
  },
  savedWord: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimaryDark,
    marginBottom: 4,
  },
  savedLine: {
    fontSize: 14,
    color: "#cbd5f5",
    marginBottom: 2,
  },
  savedExample: {
    fontSize: 14,
    color: "#cbd5f5",
    marginTop: 4,
  },
  savedLabel: {
    fontWeight: "600",
    color: colors.textPrimaryDark,
  },
  savedValue: {
    color: "#93c5fd",
  },
    savedDeleteBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    backgroundColor: "rgba(248,113,113,0.12)", // hafif kırmızı arka plan
    borderWidth: 1,
    borderColor: "#f87171",
  },
  savedDeleteText: {
    color: "#fca5a5",
    fontSize: 14,
    fontWeight: "700",
  },
singleLangButton: {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 14,   // ⬅️ büyüttük
  paddingHorizontal: 18,
  borderRadius: radius.pill,
  backgroundColor: "#020617",
  borderWidth: 1,
  borderColor: "#1f2937",
},

  singleLangLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimaryDark,
  },
singleLangArrow: {
  fontSize: 12,
  color: colors.textSecondaryDark,
  position: "absolute",
  right: 10,   // butonun en sağına sabit
},
  savedActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginLeft: 8,
  },
  savedSpeakBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(147,197,253,0.10)", // soft blue
    borderWidth: 1,
    borderColor: "rgba(147,197,253,0.45)",
  },

  glassSearchContainerMultiline: {
  alignItems: "flex-start",
  paddingTop: 14,
  paddingBottom: 14,
},

glassSearchInputMultiline: {
  height: 140,        // ✅ word page hissi (büyük ama şık)
  lineHeight: 22,
},

glassSearchClearBtn: {
  width: 28,
  height: 28,
  borderRadius: 14,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(255,255,255,0.06)",
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.12)",
},
hero: {
  marginTop: 6,
  padding: 18,
  borderRadius: radius.xl,
  backgroundColor: "rgba(255,255,255,0.04)",
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.10)",
  shadowColor: "#2563EB",
  shadowOpacity: 0.25,
  shadowRadius: 22,
  shadowOffset: { width: 0, height: 14 },
},

heroTitle: {
  fontSize: 40,
  fontWeight: "800",
  color: colors.textPrimaryDark,
  letterSpacing: 0.5,
  textAlign: "center",
  marginBottom: 16,
},

heroButton: {
  backgroundColor: colors.primary,
  paddingVertical: 14,
  borderRadius: radius.pill,
  alignItems: "center",
  marginTop: 8,
  shadowColor: colors.primary,
  shadowOpacity: 0.65,
  shadowRadius: 18,
  shadowOffset: { width: 0, height: 10 },
},

heroButtonText: {
  color: colors.textPrimaryDark,
  fontSize: 17,
  fontWeight: "800",
},

heroSave: {
  alignSelf: "flex-end",
  flexDirection: "row",
  alignItems: "center",
  marginTop: 14,
  paddingVertical: 10,
  paddingHorizontal: 14,
  borderRadius: radius.pill,
  backgroundColor: "rgba(2,6,23,0.55)",
  borderWidth: 1,
  borderColor: "rgba(147,197,253,0.35)",
},

heroSaveText: {
  color: colors.textPrimaryDark,
  fontSize: 13,
  fontWeight: "700",
},

resultsWrap: {
  marginTop: 14,
},

saveToast: {
  position: "absolute",
  right: 18,
  bottom: 92, // above tab bar
  zIndex: 9999,
},

saveToastInner: {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
  paddingVertical: 10,
  paddingHorizontal: 14,
  borderRadius: 14,
  backgroundColor: "rgba(2,6,23,0.92)",
  borderWidth: 1,
  borderColor: "rgba(34,197,94,0.35)",
  shadowColor: "#22C55E",
  shadowOpacity: 0.35,
  shadowRadius: 18,
  shadowOffset: { width: 0, height: 10 },
},

saveToastText: {
  color: colors.textPrimaryDark,
  fontSize: 13,
  fontWeight: "700",
},


});

