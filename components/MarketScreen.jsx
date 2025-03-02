import { StyleSheet, View } from "react-native";
import CustomText from "./helperComponents/CustomText";
import theme from "../theme";
import TopMenu from "./TopMenu";

export default function MarketScreen({ navigation }) {
  return (
    <View style={[theme.container]}>
      <TopMenu navigation={navigation} />
      <CustomText>Market Screen</CustomText>
    </View>
  );
}
