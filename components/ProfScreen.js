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
import userInfo from "../userInfo.json";
import useFlags from "../useFlags";
import { TinyFruitIcon } from "./TinyFruitIcon";
import { useAuth } from "./helperComponents/AuthContextProvider";
import { CountryFlag } from "./helperComponents/CountryFlag.js";
import { getAllUsers, deleteUser, logoutUser } from "../services";
import countryCodesList from "../countryCodesList.json";

import {
  getCountryCode,
  getLocalURIforCountryFlag,
  printAllErs,
} from "../helperFunctions.js";

//----- USER PROFILE SCREEN -----//
export const ProfScreen = ({ navigation }) => {
  const { setUser, setIsAuth } = useAuth();
  const { items } = useBasket();
  const { user } = useAuth();
  const [popFriends, setPopFriends] = useState([]);
  const [countryFlag, setCountryFlag] = useState(null);

  // make a list of friends with full features
  useEffect(() => {
    (async () => {
      try {
        const allUsers = await getAllUsers();
        if (allUsers?.length && user?.friendsList?.length) {
          setPopFriends(
            allUsers.filter((u) => user.friendsList.includes(u.id))
          );
        }
        const flag = await getLocalURIforCountryFlag(
          getCountryCode(countryCodesList, user.country)
        );
        flag && setCountryFlag(flag);
      } catch (e) {
        printAllErs(e);
      }
    })();
  }, []);

  // -- logs out user
  const logOut = async () => {
    if (user)
      try {
        const usrLgOut = await logoutUser(user);
        usrLgOut && console.log("user lgdout:", usrLgOut);
        if (usrLgOut) {
          setUser(null);
          setIsAuth(false);
          navigation.navigate("MainScreen");
        }
      } catch (e) {
        printAllErs(e);
      }
    else console.log("no user");
  };

  // -- dels user account
  const delAccount = async () => {
    if (user)
      try {
        const usrDel = await deleteUser(user);
        usrDel && console.log("user deleted:", usrDel);
        if (usrDel) {
          setUser(null);
          setIsAuth(false);
          navigation.navigate("MainScreen");
        }
      } catch (e) {
        printAllErs(e);
      }
    else console.log("no user");
  };

  if (!user) return null;
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
        >
          <CustomText fontSize="subtitle" fontWeight="bold" style={{}}>
            Update info:
            <CustomText fontSize="huge" fontWeight="bold" style={{}}>
              💿
            </CustomText>
          </CustomText>
        </TouchableOpacity>
        {/* ----- user prof img username and country later----- */}
        <View
          style={{
            alignSelf: "fleStart",
            justifyContent: "space-evenly",
            maxWidth: theme.widths.screen / 2.7,
            height: theme.heights.screen / 3.5,
          }}
        >
          <Image
            style={styles.userImge}
            source={{ uri: user.picture }}
            resizeMode="cover"
          />
          <CustomText fontWeight="bold" style={{}}>
            {user.username}
          </CustomText>
          <CustomText fontWeight="bold" style={{}}>
            {user.country}
          </CustomText>
          <CountryFlag countryName={user.country} size={45} />
        </View>
        {/* ----- favourite fruits ----- */}
        {user?.favouriteFruits?.length ? (
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
              <ScrollView
                horizontal
                style={{ width: "100%", backgroundColor: "yellow" }}
                showsHorizontalScrollIndicator={false}
              >
                {user.favouriteFruits.map((f) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("FruitScreen", {
                        fruitName: f,
                      })
                    }
                    style={{ padding: theme.paddings.std }}
                    key={f}
                  >
                    <TinyFruitIcon f={f} size={35} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        ) : (
          <CustomText
            style={styles.addIcon}
            color="textSecondary"
            fontSize="subheading"
          >
            You currently don't have any favourite fruits.
          </CustomText>
        )}

        {/* ----- Friends  ----- */}
        {popFriends?.length ? (
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
            You don't have any friends yet.
          </CustomText>
        )}

        {/* logout button */}
        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            paddingRight: theme.paddings.large,
            alignSelf: "flex-end",
          }}
        >
          <CustomText
            fontSize="subtitle"
            fontWeight="bold"
            style={{}}
            onPress={logOut}
          >
            Logout:
            <CustomText fontSize="huge" fontWeight="bold" style={{}}>
              💿
            </CustomText>
          </CustomText>
        </TouchableOpacity>

        {/* del account button */}
        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            paddingRight: theme.paddings.large,
            alignSelf: "flex-end",
          }}
        >
          <CustomText
            fontSize="subtitle"
            fontWeight="bold"
            style={{}}
            onPress={delAccount}
          >
            Del account:
            <CustomText fontSize="huge" fontWeight="bold" style={{}}>
              💿
            </CustomText>
          </CustomText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fruitList: {
    height: theme.heights.screen * 2.3,
  },
  userImge: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  flagImg: {
    width: 45,
    height: 45,
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
