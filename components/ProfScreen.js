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
import { CustomText } from "./helperComponents/CustomText";
import { useEffect, useState } from "react";
import { useBasket } from "./basketFunctionality/BaskProvider";
import fruitData from "../fruitsList.json";
import fruitIconImgSources from "../assets/fruitIconImgSources";
import userInfo from "../userInfo.json";
import allPeople from "../allPeople.json";
import { TinyFruitIcon } from "./UiComponents";

export const ProfScreen = ({ navigation }) => {
  const [user, setCurrentUser] = useState(null);
  const { items } = useBasket();

  useEffect(() => {
    setCurrentUser(userInfo);
  }, []);

  const favFNames = user?.favouriteFruits;

  console.log(user);

  let popFriends = [];
  if (user && user.friends.length)
    popFriends = allPeople.filter((person) => user.friends.includes(person.id));

  if (!user) return null;
  else
    return (
      <SafeAreaView
        style={[theme.container, { paddingHorizontal: theme.paddings.large }]}
      >
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {/* ----- settings icon ----- */}
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              paddingRight: theme.paddings.large,
            }}
            onPress={() => navigation.navigate("RegForm")}
          >
            <CustomText fontSize="huge" fontWeight="bold" style={{}}>
              💿
            </CustomText>
          </TouchableOpacity>
          {/* ----- user prof img username andcountry ----- */}
          <View
            style={{
              alignSelf: "fleStart",
              justifyContent: "space-evenly",
              maxWidth: theme.widths.screen / 2.7,
              height: theme.heights.screen / 3.5,
            }}
          >
            {/* change to image */}
            <CustomText fontWeight="bold" style={{ fontSize: 100 }}>
              😎
            </CustomText>
            <CustomText fontWeight="bold" style={{}}>
              {user.username}
            </CustomText>
            <CustomText fontWeight="bold" style={{}}>
              ⛳
            </CustomText>
          </View>
          {/* ----- favourite fruits ----- */}
          {favFNames.length ? (
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
                My fav fruits:
              </CustomText>
              <View
                style={{
                  alignSelf: "flex-start",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  padding: theme.paddings.large,
                }}
              >
                {favFNames.map((f, i) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("FruitScreen", {
                        fruitName: f,
                      })
                    }
                    style={{ padding: theme.paddings.std }}
                    key={i}
                  >
                    <TinyFruitIcon f={f} />
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
              You currently don't have any favourite fruits
            </CustomText>
          )}

          {/* ----- Friends  ----- */}
          {popFriends.length ? (
            <View
              style={{
                alignSelf: "flex-start",
                justifyContent: "space-evenly",
                backgroundColor: "lightblue",
              }}
            >
              <CustomText
                fontWeight="bold"
                fontSize="title"
                style={{ padding: theme.paddings.large }}
              >
                Friends:
              </CustomText>
              <View
                style={{
                  alignSelf: "flex-start",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-evenly",
                  backgroundColor: "lightgreen",
                }}
              >
                {popFriends.map((friend) => (
                  <TouchableOpacity
                    style={{
                      flexDirection: "column",
                      padding: theme.paddings.std,
                      borderColor: "lightblue",
                      borderWidth: 5,
                      width: "33%",
                    }}
                    key={friend.id}
                    onPress={() =>
                      navigation.navigate("FriendProfScreen", {
                        friend,
                        favFNames,
                      })
                    }
                  >
                    <CustomText style={{}}>{friend.username}</CustomText>
                    <CustomText style={{}}>{friend.country}</CustomText>
                    {/* <Image
                      source={friends.image source here}
                      style={styles.tinyFruitIcon}
                    /> */}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : (
            <CustomText
              style={
                ([styles.addIcon],
                {
                  alignSelf: "flex-start",
                  paddingVertical: theme.paddings.large,
                })
              }
              color="textSecondary"
              fontSize="subheading"
              fontWeight="bold"
            >
              You didn't eat any fruit yet..
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
