import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "./helperComponents/AuthContextProvider";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import theme from "../theme";
import { CustomText } from "./helperComponents/CustomText";
import fruitIconImgSources from "../assets/fruit-icons/imgSourcesArray";
import useFlags from "../useFlags";
import { useBasket } from "./basketFunctionality/BaskProvider";
import fruitData from "../fruitsList.json";
import { updateUser } from "../services";
import { printAllErs, capitalizeFirstLetter } from "../helperFunctions";

export const FruitScreen = ({ navigation, route }) => {
  //const fruit = route.params.fruit;
  const { user, setUser } = useAuth();

  const fruitName = route.params.fruitName;
  const fruit = fruitData.find((f) => f.name === fruitName);

  const flagsUris = useFlags(fruit);

  const { addFruit } = useBasket();

  const addToFavs = async (f) => {
    if (user)
      try {
        // fruit already there
        if (user.favouriteFruits.indexOf(f.name) !== -1) return;
        user.favouriteFruits.push(f.name);
        const usrUpdt = await updateUser(user);
        if (usrUpdt) {
          setUser(usrUpdt);
        }
      } catch (e) {
        printAllErs(e);
      }
  };
  const removeFromFavs = async (f) => {
    if (user)
      try {
        let filterFruits = user.favouriteFruits.filter(
          (name) => name !== f.name
        );
        user.favouriteFruits = filterFruits;
        const usrUpdt = await updateUser(user);
        if (usrUpdt) {
          setUser(usrUpdt);
        }
      } catch (e) {
        printAllErs(e);
      }
  };

  if (!fruit)
    return (
      <SafeAreaView style={[theme.container, fruitBox]}>
        <CustomText>fruit not found</CustomText>
      </SafeAreaView>
    );
  return (
    <SafeAreaView style={styles.fruitBox}>
      {/* header */}
      <View style={styles.header}>
        <Image
          source={fruitIconImgSources[fruit.name]}
          style={styles.fruitImg}
        />
        {/* title and add to basket button */}
        <View
          style={[
            {
              flex: 1,
            },
          ]}
        >
          <CustomText style={styles.title}>
            {capitalizeFirstLetter(fruit.name)}
          </CustomText>
          {/* add to basket button */}
          <TouchableOpacity
            onPress={() => {
              addFruit(fruit);
            }}
          >
            <View style={styles.addToBasket}>
              <CustomText style={{ alignSelf: "flex-end" }}>➕</CustomText>
              <CustomText fontSize="small" style={styles.addToBasket}>
                to basket
              </CustomText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* info box */}
      <View style={styles.infoBoxWrapper}>
        <ScrollView
          style={styles.infoBox}
          contentContainerStyle={styles.innerInfoBox}
        >
          {/* main nutrients */}
          {!fruit.richIn || !fruit.richIn.length ? (
            <CustomText>no nutrient info available</CustomText>
          ) : (
            <View>
              <CustomText>Main health benefits:</CustomText>
              {fruit.richIn.map((nutrient, index) => (
                <CustomText fontStyle="italic" t key={index}>
                  {nutrient}
                </CustomText>
              ))}
            </View>
          )}
          {/* countries of origin */}
          <View style={{ flexDirection: "row" }}>
            <CustomText>Native to: </CustomText>
            {/* country detail box */}
            <View style={{ alignItems: "center" }}>
              <CustomText fontStyle="italic">{fruit.nativeTo}</CustomText>
              {/* flagsUris is a list, see later how to adapt it to one country, or how it's structure looks like */}
              {flagsUris?.map((flagUri, index) => (
                <Image
                  key={index}
                  source={{ uri: flagUri }}
                  style={{ width: 32, height: 32 }}
                />
              ))}
            </View>
          </View>
          {/* general info */}
          <View>
            <CustomText fontStyle="italic">{fruit.healthBenefits}</CustomText>
          </View>
          {/* sources */}
          <CustomText fontSize="subheading" style={{ alignSelf: "flex-end" }}>
            Fonts: USDA and NIH
          </CustomText>
        </ScrollView>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          alignContent: "space-between",
          flexDirection: "row",
          marginTop: theme.margins.large,
          width: "100%",
        }}
      >
        <TouchableOpacity style={{}} onPress={() => removeFromFavs(fruit)}>
          <CustomText>➖</CustomText>
          <CustomText fontSize="small">(remove from favs)</CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={{}} onPress={() => addToFavs(fruit)}>
          <CustomText
            style={{
              alignSelf: "flex-end",
            }}
          >
            ➕
          </CustomText>
          <CustomText fontSize="small">(add to favs)</CustomText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  fruitBox: {
    alignItems: "center",
    padding: theme.paddings.std,
    borderWidth: theme.borderWidths.large,
    borderColor: theme.colors.light,
    borderRadius: theme.borderRadius.round,

    height: theme.heights.screen * 0.9,
    flex: 1,
    backgroundColor: theme.colors.prim,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    padding: theme.paddings.std,
    justifyContent: "space-between",
    marginBottom: theme.margins.large,
  },
  title: {
    // trying to make the fontsize responsive, need to test in other screen sizes to test it
    fontSize: Math.max(
      theme.fontSizes.heading,
      Math.min(43, theme.widths.screen * 0.3)
    ),
    marginBottom: "auto",
    fontWeight: "bold",
    maxWidth: "100%",
  },
  addBtn: {
    alignSelf: "flex-end",
  },
  addToBasket: { alignSelf: "flex-end" },
  infoBoxWrapper: { width: "100%", height: "56%" },
  infoBox: {
    backgroundColor: theme.colors.backSeed,
    height: 4,
  },
  innerInfoBox: {
    justifyContent: "space-between",
    padding: theme.paddings.large,
    height: "100%",
  },
  fruitImg: {
    borderRadius: 22,
    marginRight: theme.margins.large * 2,
  },
  borderCheck: { borderWidth: 5, borderColor: "black" },
});
