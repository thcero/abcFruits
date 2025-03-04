import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { BaskProvider } from "./components/basketFunctionality/BaskProvider";
import Basket from "./components/basketFunctionality/Basket";
import {
  MainScreen,
  PeopleScreen,
  MarketScreen,
  ProfScreen,
  FruitScreen,
  MyFavFruitsList,
  FruityFriend,
  RegForm,
  AlterInfo,
  TopMenu,
} from "./components";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import fruitData from "./fruitsList.json";

const Stack = createStackNavigator();

export default function App() {
  return (
    <BaskProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <SafeAreaView style={{ flex: 1 }}>
            <TopMenu />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="MainScreen" component={MainScreen} />
              <Stack.Screen name="PeopleScreen" component={PeopleScreen} />
              <Stack.Screen name="MarketScreen" component={MarketScreen} />
              <Stack.Screen name="ProfScreen" component={ProfScreen} />
              <Stack.Screen name="FruitScreen" component={FruitScreen} />
              <Stack.Screen
                name="MyFavFruitsList"
                component={MyFavFruitsList}
              />
              <Stack.Screen name="FruityFriend" component={FruityFriend} />
              <Stack.Screen name="RegForm" component={RegForm} />
              <Stack.Screen name="AlterInfo" component={AlterInfo} />
            </Stack.Navigator>
            <Basket />
          </SafeAreaView>
        </NavigationContainer>
      </SafeAreaProvider>
    </BaskProvider>
  );
}
