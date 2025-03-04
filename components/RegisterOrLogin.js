import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import theme from "../theme";
import Text from "./helperComponents/CustomText";

export const RegisterOrLogin = ({ navigation }) => {
  return (
    <SafeAreaView style={[theme.container]}>
      <Text>RegisterOrLogin</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    // any custom styles here
  },
});
