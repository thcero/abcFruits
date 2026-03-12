import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { useEffect, useState } from "react";
import fruitData from "../fruitsList.json";
import theme from "../theme";
import { CustomText } from "./helperComponents/CustomText";
import { AbcFruitsList } from "./AbcFruitsList";

const fruitsList = fruitData;
fruitsList.sort((a, b) =>
  a.name.toLowerCase().localeCompare(b.name.toLowerCase())
);

export const MainScreen = ({ navigation }) => {
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
  }, []);
  return (
    <SafeAreaView
      style={[theme.container, { backgroundColor: theme.colors.prim }]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "baseline",
          padding: theme.paddings.large,
        }}
      >
        <CustomText
          fontSize="heading"
          fontWeight="bold"
          color={theme.colors.back}
        >
          abc
        </CustomText>
        <CustomText
          fontSize="huge"
          fontWeight="bold"
          style={{ color: theme.colors.backSeed }}
        >
          Fruits
        </CustomText>
      </View>

      <AbcFruitsList currentLetters={currentLetters} fruitsList={fruitsList} />
    </SafeAreaView>
  );
};
