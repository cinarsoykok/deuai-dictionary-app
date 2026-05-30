const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Required for image/fonts bundling
config.transformer.assetPlugins = ["expo-asset/tools/hashAssetFiles"];

module.exports = config;
