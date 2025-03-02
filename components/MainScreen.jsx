import { View, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import "react-native-gesture-handler";
import CustomText from "./helperComponents/CustomText";
import theme from "../theme";
import AbcFruitsList from "./AbcFruitsList";
import TopMenu from "./TopMenu";
import fruitData from "../fruitsList.json";

const fruitsList = fruitData.fruitList;
fruitsList.sort((a, b) => a.name.localeCompare(b.name));

export default function MainScreen({ navigation }) {
  // checks if it's undefined without throwing an error, if it is, returns an empty array
  // const currentLetters = route.params?.currentLetters ?? [];
  const [currentLetters, setCurrentLetters] = useState([]);
  useEffect(() => {
    // create array of initial letters of available fruits with no repetition
    let initialLetters = [];
    fruitsList.forEach((fruit) => {
      initialLetters.push(fruit.name[0].toUpperCase());
    });
    initialLetters = [...new Set(initialLetters)];
    setCurrentLetters(initialLetters);
    // console.log(currentLetters);
  }, []);
  return (
    <SafeAreaView
      style={[theme.container, { backgroundColor: theme.colors.secGreen }]}
    >
      <TopMenu navigation={navigation} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "baseline",
          padding: theme.paddings.paddingLarge,
        }}
      >
        <CustomText
          fontSize="heading"
          fontWeight="bold"
          style={{ color: theme.colors.secyPink }}
        >
          abc
        </CustomText>
        <CustomText
          fontSize="huge"
          fontWeight="bold"
          style={{ color: theme.colors.secyPink }}
        >
          Fruits
        </CustomText>
      </View>

      <AbcFruitsList currentLetters={currentLetters} fruitsList={fruitsList} />
    </SafeAreaView>
  );
}
