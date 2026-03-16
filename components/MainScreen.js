// MainScreen.js — home screen: home for abc fruit list

import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import fruitData from "../fruitsList.json";
import theme from "../theme";
import { CustomText } from "./helperComponents/CustomText";
import { AbcFruitsList } from "./AbcFruitsList";

// sort fruits alphabetically once at module load, not on every render
const fruitsList = fruitData;
fruitsList.sort((a, b) =>
  a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
);

export const MainScreen = ({ navigation }) => {
  // list of unique first letters used to build the alphabet index
  const [currentLetters, setCurrentLetters] = useState([]);

  useEffect(() => {
    // collect unique first letters from the sorted fruit list
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
          paddingTop: theme.paddings.large * 0.5,
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
