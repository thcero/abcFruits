import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import theme from "../theme";
import CustomText from "./helperComponents/CustomText";

export const ProfScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={[theme.container]}>
      <CustomText>ProfScreen</CustomText>
      <TouchableOpacity onPress={() => navigation.navigate("AlterInfo")}>
        <CustomText fontSize="subheading">AlterInfo</CustomText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("MyFavFruitsList")}>
        <CustomText fontSize="subheading">MyFavFruitsList</CustomText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("FruityFriend")}>
        <CustomText fontSize="subheading">FruityFriend</CustomText>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
