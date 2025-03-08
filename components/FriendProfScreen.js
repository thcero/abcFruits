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
import fruitIconImgSources from "../assets/fruitIconImgSources";
import { TinyFruitIcon } from "./UiComponents";

export const FriendProfScreen = ({ navigation, route }) => {
  const [friend, setCurrentFriend] = useState(null);

  const friendFavFNames = friend?.favouriteFruits || [];

  useEffect(() => {
    setCurrentFriend(route.params.friend);
  }, []);

  let commonFNames = [];
  if (friendFavFNames.length && route.params.favFNames.length) {
    commonFNames = route.params.favFNames.filter((f) =>
      friendFavFNames.includes(f)
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
          {friendFavFNames ? (
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
                {friendFavFNames.map((f) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("FruitScreen", {
                        fruitName: f,
                      })
                    }
                    style={{ padding: theme.paddings.std }}
                    key={f}
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
              {friend.username} currently doesn't have any favourite fruits
            </CustomText>
          )}
          {/* ----- fruits in common ----- */}
          {commonFNames.length ? (
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
                {commonFNames.map((f, index) => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("FruitScreen", { f })}
                    style={{ padding: theme.paddings.std }}
                    key={index}
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
              you two don't have any fruit in common
            </CustomText>
          )}
        </ScrollView>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({});
