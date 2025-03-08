import { StyleSheet, Image } from "react-native";
import theme from "../theme";
import fruitIconImgSources from "../assets/fruitIconImgSources";

// takes a fruit name
export const TinyFruitIcon = ({ f }) => {
  console.log("f", f);
  return (
    <>
      <Image source={fruitIconImgSources[f]} style={styles.tinyFruitIcon} />
    </>
  );
};
const styles = StyleSheet.create({
  tinyFruitIcon: {
    width: 33,
    height: 33,
    borderWidth: theme.borderWidths.std,
    borderColor: theme.colors.secGreen,
    borderRadius: theme.borderRadius.round,
  },
});
