import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import theme from "../theme";
import { CustomText } from "./helperComponents/CustomText";
import { useEffect, useState } from "react";
import { TinyFruitIcon } from "./TinyFruitIcon";
import { useAuth } from "./helperComponents/AuthContextProvider";
import { CountryFlag } from "./helperComponents/CountryFlag.js";
import { getAllUsers, deleteUser, logoutUser } from "../services";
import { printAllErs, populateRandomImgs } from "../helperFunctions.js";
import imgSourcesArray from "../assets/users_prof_pics/imgSourcesArray.js";
import { SecondaryButton } from "./helperComponents/SecondaryButton";

//----- USER PROFILE SCREEN -----//
export const ProfScreen = ({ navigation }) => {
  const { setUser, setIsAuth, user } = useAuth();
  const [popFriends, setPopFriends] = useState([]);
  const [friendImgs, setFriendImgs] = useState([]);

  // make a list of friends with full features
  useEffect(() => {
    (async () => {
      try {
        const allUsers = await getAllUsers();
        if (allUsers?.length && user?.friendsList?.length) {
          const friends = allUsers.filter((u) => user.friendsList.includes(u.id));
          setPopFriends(friends);
          setFriendImgs(populateRandomImgs(friends, imgSourcesArray));
        }
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
        {/* ----- username left, update info top right ----- */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: theme.margins.large * 3 }}>
          <CustomText
            fontWeight="bold"
            style={{ fontSize: theme.fontSizes.body * 1.75 }}
          >
            {user.username}
          </CustomText>
          <SecondaryButton onPress={() => navigation.navigate("AlterInfo")}>
            update info
          </SecondaryButton>
        </View>

        {/* ----- profile picture + country ----- */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: theme.margins.large * 2.4 }}>
          <Image
            style={styles.userImge}
            source={{ uri: user.picture }}
            resizeMode="cover"
          />
          <View style={{ marginLeft: theme.margins.large * 4 }}>
            <CustomText fontWeight="bold">{user.country}</CustomText>
            <CountryFlag countryName={user.country} size={65} />
          </View>
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
              fontSize="subheading"
              style={{ paddingVertical: 4 }}
            >
              My fav fruits:
            </CustomText>
            <View
              style={{
                alignSelf: "flex-start",
                flexDirection: "row",
                justifyContent: "space-evenly",
                padding: 4,
              }}
            >
              <ScrollView
                horizontal
                style={{ width: "100%" }}
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
              justifyContent: "flex-start",
              marginTop: theme.margins.large * 2.4,
            }}
          >
            <CustomText
              fontWeight="bold"
              fontSize="subheading"
              style={{ paddingBottom: 0 }}
            >
              Friends:
            </CustomText>
            <ScrollView horizontal style={{ width: "100%" }} showsHorizontalScrollIndicator={false}>
              {popFriends.map((friend, index) => (
                <TouchableOpacity
                  key={friend.id}
                  style={{ alignItems: "center", padding: theme.paddings.std }}
                  onPress={() => navigation.navigate("FriendProfScreen", { friend })}
                >
                  <CustomText style={{ fontSize: 13, marginBottom: 4 }}>{friend.username}</CustomText>
                  <Image source={friendImgs[index]} style={{ width: 35, height: 35, borderRadius: 35 }} resizeMode="cover" />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ) : (
          <CustomText
            style={[styles.addIcon, {
              alignSelf: "flex-start",
              paddingVertical: theme.paddings.large,
            }]}
            color="textSecondary"
            fontSize="subheading"
          >
            You still haven't added any friend
          </CustomText>
        )}

      </ScrollView>
      {/* ----- bottom action buttons ----- */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: theme.margins.large, marginBottom: theme.margins.large }}>
        <SecondaryButton onPress={logOut}>
          logout
        </SecondaryButton>
        <SecondaryButton
          onPress={() =>
            Alert.alert(
              "Delete account",
              "Are you sure? You'll loose your info.",
              [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: delAccount },
              ]
            )
          }
        >
          delete account
        </SecondaryButton>
      </View>
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
