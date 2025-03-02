import { StyleSheet, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BaskProvider } from "./components/basketFunctionality/BaskProvider";
import Basket from "./components/basketFunctionality/Basket";
import MainScreen from "./components/MainScreen";
import PeopleScreen from "./components/PeopleScreen";
import MarketScreen from "./components/MarketScreen";
import ProfScreen from "./components/ProfScreen";
import FruitScreen from "./components/FruitScreen";
import MyFavFruitsList from "./components/MyFavFruitsList";
import FruityFriend from "./components/FruityFriend";
import RegisterOrLogin from "./components/RegisterOrLogin";
import AlterInfo from "./components/AlterInfo";

const Stack = createStackNavigator();

// fruitIconImages = {};
// fruitsList.forEach(
//   (fruit) =>
//     (fruitIconImages[
//       fruit.name
//     ] = require(`./assets/fruit-icons/${fruit.name}.jpg`))
// );

export default function App() {
  return (
    <BaskProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MainScreen"
            options={{ headerShown: false }}
            component={MainScreen}
          />
          <Stack.Screen
            name="PeopleScreen"
            options={{ headerShown: false }}
            component={PeopleScreen}
          />
          <Stack.Screen
            name="MarketScreen"
            options={{ headerShown: false }}
            component={MarketScreen}
          />
          <Stack.Screen
            name="ProfScreen"
            options={{ headerShown: false }}
            component={ProfScreen}
          />
          <Stack.Screen
            name="FruitScreen"
            options={{ headerShown: false }}
            component={FruitScreen}
          />
          <Stack.Screen
            name="MyFavFruitsList"
            options={{ headerShown: false }}
            component={MyFavFruitsList}
          />
          <Stack.Screen
            name="FruityFriend"
            options={{ headerShown: false }}
            component={FruityFriend}
          />
          <Stack.Screen
            name="RegisterOrLogin"
            options={{ headerShown: false }}
            component={RegisterOrLogin}
          />
          <Stack.Screen
            name="AlterInfo"
            options={{ headerShown: false }}
            component={AlterInfo}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Basket />
    </BaskProvider>
  );
}
