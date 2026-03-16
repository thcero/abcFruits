// SecondaryButton.js — smaller secondary button, used for actions like logout, delete, and update info

import { TouchableOpacity, StyleSheet } from "react-native";
import { CustomText } from "./CustomText";
import theme from "../../theme";

// Secondary action button — smaller, coconut border, no pink
export const SecondaryButton = ({ onPress, style, children }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <CustomText
        fontWeight="bold"
        style={{
          color: theme.colors.coconutBrown,
          fontSize: theme.fontSizes.small * 0.85,
        }}
      >
        {children}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.backSeed,
    paddingVertical: 2,
    paddingHorizontal: theme.paddings.std,
    borderRadius: theme.borderRadius.round,
    borderWidth: 1,
    borderColor: theme.colors.coconutBrown,
  },
});
