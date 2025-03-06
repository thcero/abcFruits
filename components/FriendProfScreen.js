import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import theme from "../theme";
import CustomText from "./helperComponents/CustomText";
import { useEffect, useState } from "react";
import { useBasket } from "./basketFunctionality/BaskProvider";
import fruitData from "../fruitsList.json";
import fruitIconImgSources from "../assets/fruitIconImgSources";
import userInfo from "../userInfo.json";
import allPeople from "../allPeople";

export const FriendProfScreen = ({ navigation, route }) => {
  const friend = route.params.friend;
  const myFavFNames = route.params.myFavFNames;

  let popFavFruits = [];
  if (friend && friend.favouriteFruits.length) {
    popFavFruits = fruitData.filter((fruit) =>
      friend.favouriteFruits.includes(fruit.name)
    );
  }

  let fruitsInCommon = [];
  if (popFavFruits && myFavFNames.length) {
    fruitsInCommon = popFavFruits.filter((fruit) =>
      myFavFNames.includes(fruit.name)
    );
  }

  if (!friend) return null;
  else
    return (
      <SafeAreaView
        style={[theme.container, { paddingHorizontal: theme.paddings.large }]}
      >
        <ScrollView
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
        >
          {/* ----- friend prof img username andcountry ----- */}
          <View
            style={{
              flex: 1,
              alignSelf: "stretch",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <CustomText fontWeight="bold" fontSize="huge" style={{}}>
              {friend.username}
            </CustomText>
            {/* change to image */}
            <CustomText
              fontWeight="bold"
              padding="large"
              style={{ fontSize: 100 }}
            >
              😎
            </CustomText>
            <CustomText fontWeight="bold" padding="large" style={{}}>
              {friend.username}
            </CustomText>
            <CustomText fontWeight="bold" padding="large" style={{}}>
              ⛳ {friend.country}
            </CustomText>
          </View>
          {/* ----- favourite fruits ----- */}
          {popFavFruits.length ? (
            <View
              style={{
                alignSelf: "flex-start",
                justifyContent: "space-evenly",
              }}
            >
              <CustomText
                fontWeight="bold"
                fontSize="title"
                style={{ paddingVertical: theme.paddings.large }}
              >
                {friend.username} fav fruits:
              </CustomText>
              <View
                style={{
                  alignSelf: "flex-start",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                {popFavFruits.map((fruit) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("FruitScreen", { fruit })
                    }
                    style={{ padding: theme.paddings.std }}
                    key={fruit.name}
                  >
                    <Image
                      source={fruitIconImgSources[fruit.name]}
                      style={styles.tinyFruitIcon}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : (
            <CustomText
              style={styles.addIcon}
              color="textSecondary"
              fontSize="subheading"
            >
              {friend.username} currently doesn't have any favourite fruits
            </CustomText>
          )}
          {/* ----- fruits in common ----- */}
          {fruitsInCommon.length ? (
            <View
              style={{
                alignSelf: "flex-start",
                justifyContent: "space-evenly",
              }}
            >
              <CustomText
                fontWeight="bold"
                fontSize="title"
                style={{ paddingVertical: theme.paddings.large }}
              >
                {friend.username} fruits in common:
              </CustomText>
              <View
                style={{
                  alignSelf: "flex-start",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                {fruitsInCommon.map((fruit) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("FruitScreen", { fruit })
                    }
                    style={{ padding: theme.paddings.std }}
                    key={fruit.name}
                  >
                    <Image
                      source={fruitIconImgSources[fruit.name]}
                      style={styles.tinyFruitIcon}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : (
            <CustomText
              style={styles.addIcon}
              color="textSecondary"
              fontSize="subheading"
            >
              you two don't have any fruit in common
            </CustomText>
          )}
        </ScrollView>
      </SafeAreaView>
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
  tinyFruitIcon: {
    width: 33,
    height: 33,
    borderWidth: theme.borderWidths.std,
    borderColor: theme.colors.secGreen,
    borderRadius: theme.borderRadius.round,
  },
});
