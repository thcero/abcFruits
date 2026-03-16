// AbcFruitsList.js — renders the alphabetical fruit list grouped by letter, each fruit navigates to FruitScreen component

import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import theme from "../theme";
import { CustomText } from "./helperComponents/CustomText";
import { TinyFruitIcon } from "./TinyFruitIcon";

export const AbcFruitsList = ({ currentLetters, fruitsList }) => {
  const navigation = useNavigation();

  return (
    <View
      style={[
        theme.container,
        {
          width: "100%",
          backgroundColor: theme.colors.prim,
          paddingVertical: 16,
        },
      ]}
    >
      <ScrollView
        contentContainerStyle={theme.content}
        style={styles.fruitList}
      >
        {currentLetters.map((letter, index) => (
          <View style={styles.alphabetRow} key={index}>
            <CustomText
              fontSize="huge"
              fontWeight="bold"
              padding="std"
              style={[
                styles.alphabetLetter,
                { fontFamily: "Sniglet_400Regular" },
              ]}
            >
              {letter}
            </CustomText>
            {!fruitsList ? (
              <CustomText>Hi</CustomText>
            ) : (
              fruitsList
                .filter((lFruit) =>
                  lFruit.name.toUpperCase().startsWith(letter),
                )
                .map((fruit, fIndex) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("FruitScreen", {
                        fruitName: fruit.name,
                      })
                    }
                    style={{ padding: theme.paddings.std }}
                    key={fruit.name}
                  >
                    <TinyFruitIcon f={fruit.name} size={55} />
                  </TouchableOpacity>
                ))
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  fruitList: {
    height: theme.heights.screen * 2.3,
  },
  alphabetRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.paddings.std,
    margin: theme.margins.large,
    marginVertical: theme.margins.std,
    borderWidth: 4,
    borderColor: theme.colors.coconutBrown,
    borderRadius: theme.borderRadius.round,
    borderStyle: "solid",
    width: theme.widths.screen * 0.95,
    backgroundColor: theme.colors.backSeed,
  },
  alphabetLetter: {
    color: theme.colors.textPrimary,
    marginLeft: theme.margins.std,
    marginRight: theme.margins.large,
  },
  addIcon: {
    position: "absolute",
    right: 0,
  },
});
