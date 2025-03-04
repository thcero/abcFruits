import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import theme from "../theme";
import Text from "./helperComponents/CustomText";

export const MyFavFruitsList = ({ navigation }) => {
  return (
    <SafeAreaView style={[theme.container]}>
      <Text>MyFavFruitsList</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {},
});
