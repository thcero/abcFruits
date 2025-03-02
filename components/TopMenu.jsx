import { View, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import CustomText from "./helperComponents/CustomText";
import theme from "../theme";
import Constants from "expo-constants";

export default function TopMenu({ navigation }) {
  return (
    <View>
      {/* change to the safeareacontext maybe later */}
      <SafeAreaView style={styles.topMenu}>
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
        <TouchableOpacity onPress={() => navigation.navigate("ProfScreen")}>
          <CustomText fontSize="heading">👱‍♂️</CustomText>
        </TouchableOpacity>
        {/* if user is logged out */}
        {/* <TouchableOpacity
            onPress={() => navigation.navigate("RegisterOrLogin")}
          >
            <CustomText fontSize="heading">👱‍♂️</CustomText>
          </TouchableOpacity> */}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  topMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: Constants.statusBarHeight + 7.5,
    paddingHorizontal: theme.paddings.paddingLarge,
    backgroundColor: theme.colors.light,
  },
});
