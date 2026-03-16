// TopMenu.js — persistent top navigation bar: home, market, people, profile
// guards people and profile navigation — redirects to Login if user is not authenticated

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import theme from "../theme";
import { useAuth } from "./helperComponents/AuthContextProvider";

export const TopMenu = () => {
  const navigation = useNavigation();
  const { isAuth } = useAuth();
  // use insets instead of Constants.statusBarHeight for correct padding on all devices
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.topMenu, { paddingVertical: insets.top * 0.5 }]}>
      <TouchableOpacity onPress={() => navigation.navigate("MainScreen")}>
        <Image source={{ uri: "https://raw.githubusercontent.com/thcero/abcFruits/main/assets/genera-ui-icons/watermelon.png" }} style={styles.menuIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("MarketScreen")}>
        <Image source={{ uri: "https://raw.githubusercontent.com/thcero/abcFruits/main/assets/genera-ui-icons/farmersMarket.png" }} style={styles.menuIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => isAuth ? navigation.navigate("PeopleScreen") : navigation.navigate("Login")}>
        <Image source={{ uri: "https://raw.githubusercontent.com/thcero/abcFruits/main/assets/genera-ui-icons/friends.png" }} style={styles.menuIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => isAuth ? navigation.navigate("ProfScreen") : navigation.navigate("Login")}>
        <Image source={{ uri: "https://raw.githubusercontent.com/thcero/abcFruits/main/assets/genera-ui-icons/user.png" }} style={styles.menuIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  topMenu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: theme.paddings.large,
    backgroundColor: theme.colors.coconutBrown,
    borderBottomWidth: 0.4,
    borderBottomColor: theme.colors.backSeed,
  },
  menuIcon: { width: 55, height: 55, borderRadius: 27.5 },
});
