import { StyleSheet, Image, View } from "react-native";
import theme from "../theme";
import fruitIconImgSources from "../assets/fruit-icons/imgSourcesArray";

// takes a fruit name
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
