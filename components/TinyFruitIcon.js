import { StyleSheet, Image } from "react-native";
import theme from "../theme";
import fruitIconImgSources from "../assets/fruit-icons/imgSourcesArray";

// takes a fruit name
export const TinyFruitIcon = ({ f, size }) => {
  return (
    <>
      <Image
        source={fruitIconImgSources[f]}
        style={[styles.tinyFruitIcon, { width: size, height: size }]}
      />
    </>
  );
};
const styles = StyleSheet.create({
  tinyFruitIcon: {
    borderWidth: 1,
    borderColor: theme.colors.sec,
    borderRadius: theme.borderRadius.round,
    padding: theme.paddings.large,
  },
});
