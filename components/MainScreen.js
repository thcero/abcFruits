import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import fruitData from "../fruitsList.json";
import theme from "../theme";
import { CustomText } from "./helperComponents/CustomText";
import { AbcFruitsList } from "./AbcFruitsList";

const fruitsList = fruitData;
fruitsList.sort((a, b) =>
  a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
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
      style={[theme.container, { backgroundColor: theme.colors.backSeed }]}
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
          style={{
            fontFamily: theme.fonts.display,
            fontSize: 37.0,
            letterSpacing: 0.12,
          }}
        >
          <Text
            style={{
              color: theme.colors.appleRed,
              textShadowColor: "#000000",
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 3,
            }}
          >
            a
          </Text>
          <Text
            style={{
              color: theme.colors.blueberry,
              textShadowColor: "#000000",
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 3,
            }}
          >
            b
          </Text>
          <Text
            style={{
              color: theme.colors.coconutBrown,
              textShadowColor: "#000000",
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 3,
            }}
          >
            c
          </Text>
        </CustomText>
        <CustomText
          fontSize="huge"
          fontWeight="bold"
          style={{
            color: theme.colors.bananaSkin,
            fontFamily: theme.fonts.display,
            fontSize: 56.4,
            letterSpacing: 0.12,
            textShadowColor: "#000000",
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 3,
          }}
        >
          Fruits
        </CustomText>
      </View>

      <AbcFruitsList currentLetters={currentLetters} fruitsList={fruitsList} />
    </SafeAreaView>
  );
};
