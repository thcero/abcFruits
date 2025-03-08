import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "./helperComponents/AuthContextProvider";
import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import theme from "../theme";
import { CustomText } from "./helperComponents/CustomText";
import fruitIconImgSources from "../assets/fruitIconImgSources";
import useFlags from "../useFlags";
import { useBasket } from "./basketFunctionality/BaskProvider";
import fruitData from "../fruitsList.json";

export const FruitScreen = ({ navigation, route }) => {
  //const fruit = route.params.fruit;

  const fruitName = route.params.fruitName;
  const fruit = fruitData.find((f) => (f.name = fruitName));

  const flagsUris = useFlags(fruit);

  const { addFruit } = useBasket();

  return (
    <SafeAreaView style={theme.container}>
      {/* main box */}
      {fruit ? (
        <View style={styles.fruitBox}>
          {/* header */}
          <View style={styles.header}>
            <View>
              {/* title and image */}
              <Image source={fruitIconImgSources[fruit.name]} />

              <CustomText>{fruit.name}</CustomText>
            </View>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => {
                addFruit(fruit);
              }}
              // onPress={() => {
              //   user ? addFruit(fruit) : navigation.navigate("GoogleLogin");
              // }}
            >
              <CustomText>➕</CustomText>
              <CustomText>(to basket)</CustomText>
            </TouchableOpacity>
          </View>
          {/* info box */}
          <View style={styles.infoBoxWrapper}>
            <ScrollView
              style={styles.infoBox}
              contentContainerStyle={styles.innerInfoBox}
            >
              <CustomText>{fruit.name}</CustomText>
              {!fruit.richIn ? (
                <CustomText>no nutrient info available</CustomText>
              ) : (
                fruit.richIn.map((nutrient, index) => (
                  <CustomText key={index}>{nutrient}</CustomText>
                ))
              )}
              {flagsUris?.map((flagUri, index) => (
                <Image
                  key={index}
                  source={{ uri: flagUri }}
                  style={{ width: 32, height: 32 }}
                />
              ))}
              <CustomText>Native to: {fruit.nativeTo}</CustomText>
              <CustomText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque eget sapien in nisi volutpat fermentum. Fusce
                euismod, ligula at tristique tincidunt, purus nisi tincidunt
                lectus, a tempor elit nisi sit amet erat. Curabitur vehicula
                neque ut magna dictum, sed pharetra lectus tincidunt. Vivamus
                placerat, risus at scelerisque aliquet, nulla lectus
                sollicitudin lacus, nec interdum libero mauris id odio.
                Suspendisse potenti. Integer euismod convallis arcu, a hendrerit
                lacus molestie in. Proin sed libero risus. Duis bibendum urna at
                augue cursus, at tincidunt risus eleifend. In hac habitasse
                platea dictumst. Vestibulum consectetur nisi id ligula
                venenatis, et bibendum velit gravida. Ut faucibus, metus et
                interdum gravida, nisl sapien hendrerit felis, id sodales erat
                erat at elit. Quisque et vestibulum mauris. Aliquam erat
                volutpat. Donec id orci a justo vehicula bibendum. Curabitur ut
                turpis sed risus scelerisque vehicula non a est. Maecenas ac
                felis non orci rhoncus pharetra id eget sapien. Integer
                ullamcorper lacus sed magna cursus, in maximus lorem interdum.
                Donec nec nisl at justo ultrices pharetra. Nulla facilisi.
                Aenean nec dapibus enim, eget tincidunt lectus. Proin convallis,
                nunc eu sagittis imperdiet, justo turpis fermentum justo, ut
                dapibus ligula orci ut dui. Nunc non augue nisi. Vivamus tempor
                nisi a massa viverra, sit amet gravida elit varius.
              </CustomText>
            </ScrollView>
          </View>
          <TouchableOpacity style={styles.addBtn}>
            <CustomText>➕</CustomText>
            <CustomText>(to favs)</CustomText>
          </TouchableOpacity>
        </View>
      ) : (
        <CustomText>fruit not found</CustomText>
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
    flexDirection: "column",
    alignItems: "center",
    padding: theme.paddings.std,
    margin: theme.margins.std,
    borderWidth: theme.borderWidths.large,
    borderColor: theme.colors.light,
    borderRadius: theme.borderRadius.round,
    borderStyle: "dotted",
    width: theme.widths.screen * 0.95,
    height: theme.heights.screen * 0.9,
    flex: 1,
    backgroundColor: theme.colors.tercBlueFaded,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: theme.paddings.std,
  },
  addBtn: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",

    alignSelf: "flex-end",
  },
  infoBoxWrapper: { width: "100%", height: "56%" },
  infoBox: {
    backgroundColor: "lightgrey",
    height: 4,
  },
  innerInfoBox: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    padding: theme.paddings.std,
  },
});
