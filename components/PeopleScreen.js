import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { CustomText } from "./helperComponents/CustomText";
import theme from "../theme";
import { getAllUsers } from "../services";
import { TinyFruitIcon } from "./UiComponents";
import userInfo from "../userInfo.json";
import useFlags from "../useFlags";

export const PeopleScreen = ({ navigation }) => {
  const [people, setPeople] = useState([]);
  const [user, setUser] = useState(null);
  const userFavFNames = user?.favouriteFruits || [];

  useEffect(() => {
    setUser(userInfo);
    (async () => {
      const allUsers = await getAllUsers();
      allUsers && setPeople(allUsers);
    })();
  }, []);

  return (
    <SafeAreaView style={[theme.container]}>
      <CustomText>PeopleScreen</CustomText>
      {!people.length ? (
        <CustomText fontSize="subtitle">Fetching users</CustomText>
      ) : (
        <PeopleList
          people={people}
          userFavFNames={userFavFNames}
          navigation={navigation}
        />
      )}
      {/* {people.length &&
        people.map((p) => <CustomText>PeopleScreen</CustomText>)} */}
    </SafeAreaView>
  );
};

const PeopleList = ({ people, userFavFNames, navigation }) => {
  return (
    <View style={[theme.container, { width: "100%", alignItems: "center" }]}>
      {/* change this to a flatlist for efficiency and write on the report */}
      <FlatList
        contentContainerStyle={theme.content}
        style={styles.peopleList}
        data={people}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          // a person
          <View style={styles.person}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "space-evenly",
                backgroundColor: "red",
                width: "35%",
                height: "100%",
              }}
            >
              <CustomText fontSize="title" fontWeight="bold" padding="std">
                {item.username}
              </CustomText>
              <CustomText fontSize="huge" fontWeight="bold" padding="std">
                😎
              </CustomText>
            </View>
            <View
              style={{
                width: "65%",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                height: "100%",
                backgroundColor: "grey",
              }}
            >
              <CustomText fontSize="small" fontWeight="bold" padding="std">
                fruits in common:
              </CustomText>
              {item.favouriteFruits?.length &&
              userFavFNames?.length &&
              item.favouriteFruits.some((f) => userFavFNames.includes(f)) ? (
                <ScrollView
                  horizontal
                  style={{ width: "100%", backgroundColor: "yellow" }}
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
                        <TinyFruitIcon f={f} />
                      </TouchableOpacity>
                    ))}
                </ScrollView>
              ) : (
                <>
                  <CustomText fontSize="title" fontWeight="bold" padding="std">
                    😎 No fruits in common..
                  </CustomText>
                </>
              )}
              <CustomText fontSize="small" fontWeight="bold" padding="std">
                fav fruits:
              </CustomText>
              {item.favouriteFruits?.length ? (
                <ScrollView
                  horizontal
                  style={{ width: "100%", backgroundColor: "green" }}
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
                      <TinyFruitIcon f={f} />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              ) : (
                <>
                  <CustomText fontSize="title" fontWeight="bold" padding="std">
                    😎 No fruits in common..
                  </CustomText>
                </>
              )}
            </View>
          </View>
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
    padding: theme.paddings.std,
    margin: theme.margins.large,
    borderWidth: theme.borderWidths.large,
    borderColor: theme.colors.light,
    borderRadius: theme.borderRadius.round,
    borderStyle: "dotted",
    width: theme.widths.screen * 0.95,
    height: theme.heights.screen * 0.25,
    backgroundColor: theme.colors.light,
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
