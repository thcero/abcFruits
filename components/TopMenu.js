import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import theme from "../theme";
import { CustomText } from "./helperComponents/CustomText";
import { useAuth } from "./helperComponents/AuthContextProvider";

export const TopMenu = () => {
  const navigation = useNavigation();
  const { isAuth } = useAuth();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.topMenu, { paddingVertical: insets.top * 0.5 }]}>
      <TouchableOpacity onPress={() => navigation.navigate("MainScreen")}>
        <Image
          source={require("../assets/genera-ui-icons/watermelon.png")}
          style={styles.menuIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("MarketScreen")}>
        <Image
          source={require("../assets/genera-ui-icons/farmersMarket.png")}
          style={styles.menuIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          isAuth
            ? navigation.navigate("PeopleScreen")
            : navigation.navigate("Login")
        }
      >
        <Image
          source={require("../assets/genera-ui-icons/friends.png")}
          style={styles.menuIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          isAuth
            ? navigation.navigate("ProfScreen")
            : navigation.navigate("Login")
        }
      >
        <Image
          source={require("../assets/genera-ui-icons/user.png")}
          style={styles.menuIcon}
        />
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
    backgroundColor: theme.colors.backSeed,
  },
  menuIcon: { width: 52, height: 52 },
});
