import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import CustomText from "./helperComponents/CustomText";

export const TopMenu = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.topMenu}>
      <TouchableOpacity onPress={() => navigation.navigate("MainScreen")}>
        <CustomText fontSize="heading">🍉</CustomText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("PeopleScreen")}>
        <CustomText fontSize="heading" style={{ letterSpacing: -5 }}>
          🧖‍♀️🧖‍♂️
        </CustomText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("MarketScreen")}>
        <CustomText fontSize="heading" style={{ letterSpacing: -5 }}>
          👨‍🌾
        </CustomText>
      </TouchableOpacity>
      {/* if user is logged in */}
      <TouchableOpacity onPress={() => navigation.navigate("RegForm")}>
        <CustomText fontSize="heading">👱‍♂️</CustomText>
      </TouchableOpacity>
      {/* if user is logged out */}
      {/* <TouchableOpacity
            onPress={() => navigation.navigate("RegisterOrLogin")}
          >
            <CustomText fontSize="heading">👱‍♂️</CustomText>
          </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  topMenu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 0.7 * Constants.statusBarHeight,
    paddingHorizontal: theme.paddings.paddingLarge,
    backgroundColor: theme.colors.light,
  },
});
