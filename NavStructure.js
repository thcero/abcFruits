// NavStructure.js — implements app's navigation structure: top menu, screen stack and global available basket

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import theme from "./theme";
import {
  MainScreen,
  PeopleScreen,
  MarketScreen,
  ProfScreen,
  FruitScreen,
  MyFavFruitsList,
  RegForm,
  AlterInfo,
  TopMenu,
  FriendProfScreen,
  Login,
} from "./components";
import Basket from "./components/basketFunctionality/Basket";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createStackNavigator();

export const NavStructure = () => {
  return (
    <NavigationContainer>
      {/* Wraps whole UI */}
      <SafeAreaView style={{ flex: 1 }}>
        {/* top menu: top navigation bar to show in all screens */}
        <TopMenu />
        {/* stack navigator — no native header, so each screen handles its own */}
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen
            name="FruitScreen"
            component={FruitScreen}
            options={{ cardStyle: { backgroundColor: theme.colors.prim } }}
          />
          <Stack.Screen name="MarketScreen" component={MarketScreen} />
          <Stack.Screen name="PeopleScreen" component={PeopleScreen} />
          <Stack.Screen name="ProfScreen" component={ProfScreen} />
          <Stack.Screen name="RegForm" component={RegForm} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="FriendProfScreen" component={FriendProfScreen} />
          <Stack.Screen name="MyFavFruitsList" component={MyFavFruitsList} />
          <Stack.Screen name="AlterInfo" component={AlterInfo} />
        </Stack.Navigator>
        {/* basket floating over all screens */}
        <Basket />
      </SafeAreaView>
    </NavigationContainer>
  );
};
