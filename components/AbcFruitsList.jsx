import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import CustomText from "./helperComponents/CustomText";
import theme from "../theme";
import { Dimensions } from "react-native";
import fruitIconImgSources from "../assets/fruitIconImgSources";
import { useNavigation } from "@react-navigation/native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function AbcFruitsList({ currentLetters, fruitsList }) {
  const navigation = useNavigation();
  const alphabetRow = ({ letter }) => {};

  return (
    <View style={[theme.container, { width: "100%" }]}>
      {/* change this to a flatlist for efficiency and write on the report */}
      <ScrollView
        contentContainerStyle={theme.content}
        showsVerticalScrollIndicator={true}
      >
        {currentLetters.map((letter, index) => (
          <View style={styles.alphabetRow} key={index}>
            <CustomText
              fontSize="huge"
              fontWeight="bold"
              padding="paddingStd"
              style={styles.alphabetLetter}
            >
              {letter}
            </CustomText>
            {!fruitsList ? (
              <CustomText>Hi</CustomText>
            ) : (
              fruitsList
                .filter((fruit) => fruit.name.toUpperCase().startsWith(letter))
                .map((fFruit, fIndex) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("FruitScreen", { fFruit })
                    }
                    style={{ padding: theme.paddings.paddingStd }}
                    key={fIndex}
                  >
                    <Image
                      key={fIndex}
                      source={fruitIconImgSources[fFruit.name]}
                      style={styles.smallFruitIcon}
                    />
                  </TouchableOpacity>
                ))
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  alphabetRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.paddings.paddingStd,
    margin: theme.margins.marginLarge,
    borderWidth: theme.borderWidths.borderLarge,
    borderColor: theme.colors.light,
    borderRadius: theme.borderRadius.round,
    borderStyle: "dotted",
    width: SCREEN_WIDTH * 0.95,
    backgroundColor: theme.colors.light,
  },
  alphabetLetter: {
    color: theme.colors.textPrimary,
    marginLeft: theme.margins.marginStd,
    marginRight: theme.margins.marginLarge,
  },
  smallFruitIcon: {
    width: 58,
    height: 58,
    borderWidth: theme.borderWidths.borderStd,
    borderColor: theme.colors.secGreen,
    borderRadius: theme.borderRadius.round,
  },
});
