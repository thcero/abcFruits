import { Text as NativeTextComponent, StyleSheet } from "react-native";
import theme from "../../theme";

// customized text component to make styling clean and consistent
export const CustomText = ({
  color,
  fontSize,
  fontWeight,
  style,
  padding,
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
    color: theme.colors.textPrimary,
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
  bold: {
    fontWeight: theme.weights.bold,
  },
  paddingLarge: {
    paddingVertical: theme.paddings.large,
    paddingHorizontal: theme.paddings.large,
  },
  paddingSmall: {
    paddingVertical: theme.paddings.paddingSmall,
    paddingHorizontal: theme.paddings.paddingSmall,
  },
});
