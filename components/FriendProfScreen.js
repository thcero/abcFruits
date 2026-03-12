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
import { useEffect, useState } from "react";
import { TinyFruitIcon } from "./TinyFruitIcon";
import { useAuth } from "./helperComponents/AuthContextProvider";
import imgSourcesArray from "../assets/users_prof_pics/imgSourcesArray.js";
import { pickRandomImgSource } from "../helperFunctions";
import { CountryFlag } from "./helperComponents/CountryFlag.js";

export const FriendProfScreen = ({ navigation, route }) => {
  const { user } = useAuth();
  // const [friend, setCurrentFriend] = useState(null);
  // const [commonFruits, setCommonFruits] = useState([]);
  // const [img, setImg] = useState(null);

  const friend = route.params.friend;
  let commonFruits = [];
  console.log(friend);
  if (friend.favouriteFruits)
    commonFruits =
      friend.favouriteFruits?.length && user?.favouriteFruits?.length
        ? user?.favouriteFruits.filter((f) =>
            friend.favouriteFruits.includes(f)
          )
        : [];
  const img = pickRandomImgSource(imgSourcesArray);

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
            <CustomText
              fontWeight="bold"
              fontSize="huge"
              style={{ marginBottom: theme.margins.large * 1.5 }}
            >
              {friend.username}
            </CustomText>
            {/* change to image */}
          </View>

          <Image
            source={img}
            style={{
              width: 120,
              height: 120,
              borderRadius: 100,
              resizeMode: "cover",
              borderWidth: 8,
              borderColor: "white",
            }}
          />
          <CountryFlag countryName={user.country} size={45} />

          {/* ----- favourite fruits ----- */}
          {friend.favouriteFruits?.length ? (
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
                {friend.favouriteFruits.map((f) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("FruitScreen", {
                        fruitName: f,
                      })
                    }
                    style={{ padding: theme.paddings.std }}
                    key={f}
                  >
                    <TinyFruitIcon f={f} size={30} />
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
          {commonFruits?.length ? (
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
                {commonFruits.map((f, index) => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("FruitScreen", { f })}
                    style={{ padding: theme.paddings.std }}
                    key={index}
                  >
                    <TinyFruitIcon f={f} size={30} />
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

const styles = StyleSheet.create({});
