import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import fruitIconImgSources from "../assets/fruitIconImgSources";
import theme from "../theme";
import { CustomText } from "./helperComponents/CustomText";

export const AbcFruitsList = ({ currentLetters, fruitsList }) => {
  const navigation = useNavigation();
  const alphabetRow = ({ letter }) => {};

  return (
    <View style={[theme.container, { width: "100%" }]}>
      {/* change this to a flatlist for efficiency and write on the report */}
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
              style={styles.alphabetLetter}
            >
              {letter}
            </CustomText>
            {!fruitsList ? (
              <CustomText>Hi</CustomText>
            ) : (
              fruitsList
                .filter((lFruit) =>
                  lFruit.name.toUpperCase().startsWith(letter)
                )
                .map((fruit, fIndex) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("FruitScreen", {
                        fruitName: fruit.name,
                      })
                    }
                    style={{ padding: theme.paddings.std }}
                    key={fIndex}
                  >
                    <Image
                      key={fIndex}
                      source={fruitIconImgSources[fruit.name]}
                      style={styles.smallFruitIcon}
                    />
                    <CustomText
                      style={styles.addIcon}
                      color="textSecondary"
                      fontSize="subheading"
                    >
                      ➕
                    </CustomText>
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
    borderWidth: theme.borderWidths.large,
    borderColor: theme.colors.light,
    borderRadius: theme.borderRadius.round,
    borderStyle: "dotted",
    width: theme.widths.screen * 0.95,
    backgroundColor: theme.colors.light,
  },
  alphabetLetter: {
    color: theme.colors.textPrimary,
    marginLeft: theme.margins.std,
    marginRight: theme.margins.large,
  },
  smallFruitIcon: {
    width: 58,
    height: 58,
    borderWidth: theme.borderWidths.std,
    borderColor: theme.colors.secGreen,
    borderRadius: theme.borderRadius.round,
  },
  addIcon: {
    position: "absolute",
    right: 0,
  },
});
