import { Dimensions, PixelRatio } from "react-native";

// iPhone 15 reference (points)
const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");

export const scale = (size: number) => (SCREEN_W / BASE_WIDTH) * size;
export const verticalScale = (size: number) => (SCREEN_H / BASE_HEIGHT) * size;

// more natural scaling (recommended)
export const moderateScale = (size: number, factor = 0.35) =>
  size + (scale(size) - size) * factor;

// keep text readable
export const fontScale = (size: number) => {
  const newSize = moderateScale(size, 0.45);
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
