import { StyleSheet, View, TouchableOpacity } from "react-native";
import CustomText from "./helperComponents/CustomText";
import theme from "../theme";
import TopMenu from "./TopMenu";

export default function ProfScreen({ navigation }) {
  return (
    <View style={[theme.container]}>
      <TopMenu navigation={navigation} />
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
    </View>
  );
}
