import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import theme from "../theme";
import CustomText from "./helperComponents/CustomText";

export const MarketScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={[theme.container]}>
      <CustomText>Market Screen</CustomText>
    </SafeAreaView>
  );
};
