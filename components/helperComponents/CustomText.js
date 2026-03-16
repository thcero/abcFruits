// CustomText.js — to make styling clean and consistent,  maps prop shortcuts (fontSize, fontWeight, color) to theme styles

import { Text as NativeTextComponent, StyleSheet } from "react-native";
import theme from "../../theme";

export const CustomText = ({
  color,
  fontSize,
  fontWeight,
  style,
  padding,
  fontStyle,
  ...props
}) => {
  const textStyle = [
    styles.text,
    color === "textSecondary" && styles.colorTextSecondary,
    color === "primary" && styles.colorPrimary,
    fontSize === "subheading" && styles.fontSizeSubheading,
    fontSize === "small" && styles.fontSizeSmall,
    fontSize === "heading" && styles.fontSizeHeading,
    fontSize === "huge" && styles.fontSizeHuge,
    fontSize === "subtitle" && styles.fontSizeSubtitle,
    fontStyle === "italic" && styles.italic,
    fontWeight === "bold" && styles.bold,
    padding === "large" && styles.paddingLarge,
    padding === "small" && styles.paddingSmall,

    style,
  ];

  return <NativeTextComponent style={textStyle} {...props} />;
};

// stylesheet for customized text component
const styles = StyleSheet.create({
  text: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.weights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primBlue,
  },
  fontSizeSmall: { fontSize: theme.fontSizes.small },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontSizeHeading: {
    fontSize: theme.fontSizes.heading,
  },
  fontSizeHuge: {
    fontSize: theme.fontSizes.huge,
  },
  fontSizeSubtitle: {
    fontSize: 24,
  },
  bold: {
    fontFamily: theme.fonts.mainBold,
  },
  paddingLarge: {
    paddingVertical: theme.paddings.large,
    paddingHorizontal: theme.paddings.large,
  },
  paddingSmall: {
    paddingVertical: theme.paddings.paddingSmall,
    paddingHorizontal: theme.paddings.paddingSmall,
  },
  italic: {
    fontStyle: "italic",
  },
});
