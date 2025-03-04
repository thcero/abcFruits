import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import CustomText from "./helperComponents/CustomText";
import theme from "../theme";

export const PeopleScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={[theme.container]}>
      <CustomText>PeopleScreen</CustomText>
    </SafeAreaView>
  );
};
