// FruitScreen.js — detail screen for a single fruit: shows nutrients, origin flags, add to basket, and add/remove from favourites

import { useState } from "react";
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
  // isFav is initialised from the user's saved favourites list
  const [isFav, setIsFav] = useState(user?.favouriteFruits?.includes(fruitName));
  const fruit = fruitData.find((f) => f.name === fruitName);

  const flagsUris = useFlags(fruit);

  const { addFruit } = useBasket();

  const addToFavs = async (f) => {
    setIsFav(true);
    if (user)
      try {
        if (user.favouriteFruits.indexOf(f.name) !== -1) return;
        user.favouriteFruits.push(f.name);
        const usrUpdt = await updateUser(user);
        if (usrUpdt) setUser(usrUpdt);
      } catch (e) {
        printAllErs(e);
      }
  };
  const removeFromFavs = async (f) => {
    setIsFav(false);
    if (user)
      try {
        user.favouriteFruits = user.favouriteFruits.filter((name) => name !== f.name);
        const usrUpdt = await updateUser(user);
        if (usrUpdt) setUser(usrUpdt);
      } catch (e) {
        printAllErs(e);
      }
  };

  if (!fruit)
    return (
      <SafeAreaView style={[theme.container, styles.fruitBox]}>
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
              <CustomText style={{ alignSelf: "flex-end", fontFamily: theme.fonts.display, fontSize: 46.10, lineHeight: 47, color: theme.colors.blueberry, textShadowColor: "#FFFFFF", textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 6 }}>+</CustomText>
              <CustomText fontSize="small" style={[styles.addToBasket, { marginTop: -8 }]}>
                add to basket
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
              <CustomText fontWeight="bold">Main health benefits:</CustomText>
              {fruit.richIn.map((nutrient, index) => (
                <CustomText key={index}>
                  {nutrient}
                </CustomText>
              ))}
            </View>
          )}
          {/* countries of origin */}
          <View style={{ flexDirection: "row", marginTop: theme.margins.large, marginBottom: theme.margins.large }}>
            <CustomText fontWeight="bold">Native to: </CustomText>
            {/* country detail box */}
            <View style={{ alignItems: "center" }}>
              <CustomText>{fruit.nativeTo}</CustomText>
              {/* flagsUris is a list, see later how to adapt it to one country, or how it's structure looks like */}
              {flagsUris?.filter(Boolean).map((flagUri, index) => (
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
            <CustomText>{fruit.healthBenefits}</CustomText>
          </View>
          {/* sources */}
          <CustomText fontSize="subheading" style={{ alignSelf: "flex-end", fontSize: 15.2, marginTop: theme.margins.large * 2 }}>
            Fonts: USDA and NIH
          </CustomText>
        </ScrollView>
      </View>
      {user && (
        <View
          style={{ marginTop: theme.margins.large, width: "100%" }}
        >
          {isFav ? (
            <TouchableOpacity style={{ alignSelf: "flex-start" }} onPress={() => removeFromFavs(fruit)}>
              <CustomText style={{ fontFamily: theme.fonts.display, fontSize: 46.10, lineHeight: 47, color: theme.colors.blueberry, textShadowColor: "#FFFFFF", textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 6 }}>-</CustomText>
              <CustomText fontSize="small" style={{ marginTop: -8 }}>remove from favs</CustomText>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={() => addToFavs(fruit)}>
              <CustomText style={{ alignSelf: "flex-end", fontFamily: theme.fonts.display, fontSize: 46.10, lineHeight: 47, color: theme.colors.blueberry, textShadowColor: "#FFFFFF", textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 6 }}>+</CustomText>
              <CustomText fontSize="small" style={{ marginTop: -8 }}>add to favs</CustomText>
            </TouchableOpacity>
          )}
        </View>
      )}
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
    ) * 0.75,
    marginBottom: "auto",
    fontFamily: "Sniglet_400Regular",
    maxWidth: "100%",
  },
  addBtn: {
    alignSelf: "flex-end",
  },
  addToBasket: { alignSelf: "flex-end" },
  infoBoxWrapper: { width: "100%", height: "56%", borderRadius: theme.borderRadius.round },
  infoBox: {
    backgroundColor: theme.colors.backSeed,
    height: 4,
    borderRadius: theme.borderRadius.round,
    overflow: "hidden",
  },
  innerInfoBox: {
    justifyContent: "space-between",
    padding: theme.paddings.large,
    flexGrow: 1,
  },
  fruitImg: {
    width: 95,
    height: 95,
    borderRadius: 22,
    borderWidth: theme.borderWidths.large,
    borderColor: theme.colors.coconutBrown,
    marginRight: theme.margins.large * 2,
  },
  borderCheck: { borderWidth: 5, borderColor: "black" },
});
