// PeopleScreen.js — lists all users with basic info and their favourite fruits, also shows fruits in common with the logged-in user

import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { CustomText } from "./helperComponents/CustomText";
import theme from "../theme";
import { getAllUsers } from "../services";
import { TinyFruitIcon } from "./TinyFruitIcon";
import { useAuth } from "./helperComponents/AuthContextProvider";
import { printAllErs } from "../helperFunctions";
import { populateRandomImgs } from "../helperFunctions";
import imgSourcesArray from "../assets/users_prof_pics/imgSourcesArray.js";
import { CountryFlag } from "./helperComponents/CountryFlag.js";

export const PeopleScreen = ({ navigation }) => {
  const [people, setPeople] = useState([]);
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  // controls images to display:
  const [peopleImgs, setpeopleImgs] = useState([]);

  useEffect(() => {
    (async () => {
      if (user) {
        try {
          let allUsers = await getAllUsers();

          if (allUsers.length) {
            setPeople(allUsers.filter((u) => u.username !== user.username));
            setpeopleImgs(populateRandomImgs(allUsers, imgSourcesArray));
          }
        } catch (e) {
          printAllErs(e);
        }
      }
    })();
  }, [user]);

  if (!people.length) return null;
  return (
    <SafeAreaView
      style={[theme.container, { backgroundColor: theme.colors.prim }]}
    >
      <CustomText
        fontSize="heading"
        fontWeight="bold"
        style={{
          fontFamily: theme.fonts.display,
          fontSize: 41.4,
          letterSpacing: 0.12,
          color: theme.colors.blueberry,
          textShadowColor: "#FFFFFF",
          textShadowOffset: { width: 2, height: 2 },
          textShadowRadius: 3,
          marginTop: 30,
          marginBottom: theme.margins.large * 3,
        }}
      >
        Fruity People
      </CustomText>
      <View style={{ position: "absolute", top: 3, right: 3, marginBottom: 5 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.colors.backSeed,
            borderRadius: 12,
            paddingHorizontal: 6,
            paddingVertical: 3,
          }}
        >
          <CustomText style={{ fontSize: 37 * 0.33 }}>🔍</CustomText>
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="search"
            style={{
              fontSize: 37 * 0.33,
              fontFamily: theme.fonts.main,
              width: 75,
            }}
          />
        </View>
      </View>
      {!people.length ? (
        <CustomText fontSize="subtitle">Fetching users</CustomText>
      ) : (
        <PeopleList
          people={people.filter((p) =>
            p.username.toLowerCase().startsWith(searchText.toLowerCase()),
          )}
          userFavFNames={user?.favouriteFruits}
          navigation={navigation}
          images={peopleImgs}
        />
      )}
      {/* {people.length &&
        people.map((p) => <CustomText>PeopleScreen</CustomText>)} */}
    </SafeAreaView>
  );
};

const PeopleList = ({ people, navigation, userFavFNames, images }) => {
  return (
    <View
      style={[
        theme.container,
        {
          width: "100%",
          alignItems: "center",
          backgroundColor: theme.colors.prim,
        },
      ]}
    >
      {/* change this to a flatlist for efficiency */}
      <FlatList
        contentContainerStyle={theme.content}
        style={styles.peopleList}
        data={people}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          // ----- A PERSON CONTAINER -----//
          <TouchableOpacity
            style={styles.person}
            onPress={() =>
              navigation.navigate("FriendProfScreen", { friend: item })
            }
          >
            {/* the left box  */}
            <View style={styles.personLeftBox}>
              {/* top row: name centered */}
              <CustomText
                fontSize="title"
                fontWeight="bold"
                numberOfLines={1}
                style={{ flexShrink: 1, textAlign: "center" }}
              >
                {item.username}
              </CustomText>
              {/* middle: photo */}
              <Image
                source={images[index]}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 100,
                  resizeMode: "cover",
                  borderWidth: 3,
                  borderColor: "rgba(255,255,255,0.5)",
                }}
              />
              {/* bottom: flag */}
              <CountryFlag countryName={item.country} size={30} />
            </View>
            {/* the right box */}
            <View style={styles.personRightBox}>
              {/* the person's favourite fruits */}
              <CustomText
                fontSize="small"
                fontWeight="bold"
                padding="std"
                style={{ paddingHorizontal: 5, marginTop: 3 }}
              >
                fav fruits:
              </CustomText>
              {item.favouriteFruits?.length ? (
                <ScrollView
                  horizontal
                  style={{
                    width: "100%",
                    backgroundColor: theme.colors.backSeed,
                  }}
                  showsHorizontalScrollIndicator={false}
                >
                  {item.favouriteFruits.map((f) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("FruitScreen", {
                          fruitName: f,
                        })
                      }
                      style={{ padding: theme.paddings.std }}
                      key={f}
                    >
                      <TinyFruitIcon f={f} size={28} />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              ) : (
                <>
                  <CustomText fontSize="title" fontWeight="bold" padding="std">
                    😎 NO favourite fruits
                  </CustomText>
                </>
              )}
              {/* the fruits in common */}
              <View
                style={{
                  width: "100%",
                  height: 0.9,
                  backgroundColor: theme.colors.sec,
                }}
              />
              <CustomText
                fontSize="small"
                fontWeight="bold"
                padding="std"
                style={{
                  paddingHorizontal: 5,
                  marginTop: 3,
                  color:
                    item.favouriteFruits?.length &&
                    userFavFNames?.length &&
                    item.favouriteFruits.some((f) => userFavFNames.includes(f))
                      ? undefined
                      : theme.colors.grey,
                }}
              >
                {item.favouriteFruits?.length &&
                userFavFNames?.length &&
                item.favouriteFruits.some((f) => userFavFNames.includes(f))
                  ? "fruits in common:"
                  : "no fruits in common"}
              </CustomText>
              {item.favouriteFruits?.length &&
              userFavFNames?.length &&
              item.favouriteFruits.some((f) => userFavFNames.includes(f)) ? (
                <ScrollView
                  horizontal
                  style={{
                    width: "100%",
                    backgroundColor: theme.colors.backSeed,
                  }}
                  showsHorizontalScrollIndicator={false}
                >
                  {item.favouriteFruits
                    .filter((f) => userFavFNames.includes(f))
                    .map((f) => (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("FruitScreen", {
                            fruitName: f,
                          })
                        }
                        style={{ padding: theme.paddings.std }}
                        key={f}
                      >
                        <TinyFruitIcon f={f} size={28} />
                      </TouchableOpacity>
                    ))}
                </ScrollView>
              ) : (
                <View
                  style={{
                    width: "100%",
                    backgroundColor: theme.colors.backSeed,
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  person: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: theme.margins.large,
    borderWidth: theme.borderWidths.large,
    borderColor: theme.colors.sec,
    borderRadius: 28,
    width: theme.widths.screen * 0.95,
    height: theme.heights.screen * 0.25,
    backgroundColor: theme.colors.prim,
    overflow: "hidden",
  },
  personLeftBox: {
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: theme.colors.backSeed,
    width: "35%",
    height: "100%",
    paddingHorizontal: 5,
    borderRightWidth: 0.9,
    borderRightColor: theme.colors.sec,
  },
  personRightBox: {
    width: "65%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: "100%",
    backgroundColor: theme.colors.backSeed,
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
