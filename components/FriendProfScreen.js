import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import theme from "../theme";
import { CustomText } from "./helperComponents/CustomText";
import { TinyFruitIcon } from "./TinyFruitIcon";
import { useState } from "react";
import { useAuth } from "./helperComponents/AuthContextProvider";
import imgSourcesArray from "../assets/users_prof_pics/imgSourcesArray.js";
import { pickRandomImgSource, printAllErs } from "../helperFunctions";
import { CountryFlag } from "./helperComponents/CountryFlag.js";
import { updateUser } from "../services";

export const FriendProfScreen = ({ navigation, route }) => {
  const { user, setUser } = useAuth();
  const friend = route.params.friend;
  const [isFriend, setIsFriend] = useState(user?.friendsList?.includes(friend.id));

  const addFriend = async () => {
    setIsFriend(true);
    user?.friendsList.push(friend.id);
    if (user)
      try {
        const usrUpdt = await updateUser(user);
        if (usrUpdt) setUser(usrUpdt);
      } catch (e) {
        printAllErs(e);
      }
  };

  const removeFriend = async () => {
    setIsFriend(false);
    user.friendsList = user.friendsList.filter((id) => id !== friend.id);
    if (user)
      try {
        const usrUpdt = await updateUser(user);
        if (usrUpdt) setUser(usrUpdt);
      } catch (e) {
        printAllErs(e);
      }
  };
  let commonFruits = [];
  if (friend.favouriteFruits)
    commonFruits =
      friend.favouriteFruits?.length && user?.favouriteFruits?.length
        ? user?.favouriteFruits.filter((f) =>
            friend.favouriteFruits.includes(f)
          )
        : [];

  const [img] = useState(friend.picture ? { uri: friend.picture } : pickRandomImgSource(imgSourcesArray));

  if (!friend) return null;
  return (
    <SafeAreaView style={[theme.container, { paddingHorizontal: theme.paddings.large }]}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* ----- username + add friend ----- */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: theme.margins.large * 3 }}>
          <CustomText fontWeight="bold" style={{ fontSize: theme.fontSizes.body * 1.75 }}>
            {friend.username}
          </CustomText>
          {!isFriend && (
            <TouchableOpacity onPress={addFriend} style={{ flexDirection: "row", alignItems: "center" }}>
              <CustomText style={{ fontFamily: theme.fonts.display, fontSize: 45, lineHeight: 46, color: theme.colors.blueberry, textShadowColor: "#FFFFFF", textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 8 }}>+</CustomText>
              <CustomText fontWeight="bold" style={{ color: theme.colors.blueberry, marginLeft: 4 }}>add as friend</CustomText>
            </TouchableOpacity>
          )}
        </View>

        {/* ----- profile picture + country ----- */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: theme.margins.large * 2 }}>
          <Image
            style={styles.userImge}
            source={img}
            resizeMode="cover"
          />
          <View style={{ marginLeft: theme.margins.large * 4 }}>
            <CustomText fontWeight="bold">{friend.country}</CustomText>
            <CountryFlag countryName={friend.country} size={65} />
          </View>
        </View>

        {/* ----- favourite fruits ----- */}
        {friend.favouriteFruits?.length ? (
          <View style={{ alignSelf: "flex-start", justifyContent: "space-evenly" }}>
            <CustomText fontWeight="bold" fontSize="title" style={{ paddingVertical: 4 }}>
              {friend.username}'s fav fruits:
            </CustomText>
            <View style={{ alignSelf: "flex-start", flexDirection: "row", justifyContent: "space-evenly", padding: 4 }}>
              <ScrollView horizontal style={{ width: "100%" }} showsHorizontalScrollIndicator={false}>
                {friend.favouriteFruits.map((f) => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("FruitScreen", { fruitName: f })}
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
          <CustomText color="textSecondary" fontSize="subheading">
            {friend.username} doesn't have any favourite fruits
          </CustomText>
        )}

        {/* ----- fruits in common ----- */}
        {commonFruits?.length ? (
          <View style={{ alignSelf: "flex-start", justifyContent: "space-evenly" }}>
            <CustomText fontWeight="bold" fontSize="title" style={{ paddingVertical: 4 }}>
              Fruits in common:
            </CustomText>
            <View style={{ alignSelf: "flex-start", flexDirection: "row", justifyContent: "space-evenly", padding: 4 }}>
              <ScrollView horizontal style={{ width: "100%" }} showsHorizontalScrollIndicator={false}>
                {commonFruits.map((f, index) => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("FruitScreen", { fruitName: f })}
                    style={{ padding: theme.paddings.std }}
                    key={index}
                  >
                    <TinyFruitIcon f={f} size={35} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        ) : (
          <CustomText color="textSecondary" fontSize="subheading">
            You two don't have any fruit in common
          </CustomText>
        )}
        {/* ----- remove friend ----- */}
        {isFriend && (
          <TouchableOpacity onPress={removeFriend} style={{ flexDirection: "row", alignItems: "center", alignSelf: "flex-end", marginTop: theme.margins.large * 3 }}>
            <CustomText fontWeight="bold" style={{ color: theme.colors.redDelete, marginRight: 4 }}>remove as friend</CustomText>
            <CustomText style={{ fontFamily: theme.fonts.display, fontSize: 45, lineHeight: 46, color: theme.colors.redDelete }}>−</CustomText>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userImge: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
