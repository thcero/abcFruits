// TinyFruitIcon.js — tiny fruit icon used in lists and profile screens across the app

import { StyleSheet, Image, View } from "react-native";
import theme from "../theme";
import fruitIconImgSources from "../assets/fruit-icons/imgSourcesArray";

// renders the fruit icon image for the given fruit name at the specified size
export const TinyFruitIcon = ({ f, size }) => {
  return (
    <View style={[styles.tinyFruitIcon, { width: size, height: size }]}>
      <Image
        source={fruitIconImgSources[f]}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  tinyFruitIcon: {
    borderWidth: 1,
    borderColor: theme.colors.sec,
    borderRadius: theme.borderRadius.round,
    overflow: "hidden",
  },
});
