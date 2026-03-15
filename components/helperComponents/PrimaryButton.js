import { TouchableOpacity, StyleSheet } from "react-native";
import { CustomText } from "./CustomText";
import theme from "../../theme";

// Primary app-wide action button
export const PrimaryButton = ({ onPress, style, children }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <CustomText fontWeight="bold" style={{ color: theme.colors.coconutBrown }}>
        {children}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.backSeed,
    paddingVertical: theme.paddings.std,
    paddingHorizontal: theme.paddings.large * 2,
    borderRadius: theme.borderRadius.round,
    borderWidth: 2.5,
    borderColor: theme.colors.sec,
  },
});
