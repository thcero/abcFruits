import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { CustomText } from "./helperComponents/CustomText";
import theme from "../theme";
import { getAllUsers, updateUser } from "../services";
import { TinyFruitIcon } from "./TinyFruitIcon";
import { useAuth } from "./helperComponents/AuthContextProvider";
import { printAllErs } from "../helperFunctions";
import { populateRandomImgs } from "../helperFunctions";
import imgSourcesArray from "../assets/users_prof_pics/imgSourcesArray.js";
import { CountryFlag } from "./helperComponents/CountryFlag.js";
import useFlags from "../useFlags";

export const PeopleScreen = ({ navigation }) => {
  const [people, setPeople] = useState([]);
  const { user, setUser } = useAuth();
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

  const addFriend = async (person) => {
    user?.friendsList.push(person.id);
    if (user)
      try {
        const usrUpdt = await updateUser(user);
        if (usrUpdt) {
          setUser(usrUpdt);
          navigation.navigate("ProfScreen");
        }
      } catch (e) {
        printAllErs(e);
      }
    else console.log("no user");
  };

  if (!people.length) return null;
  return (
    <SafeAreaView style={[theme.container]}>
      <CustomText>PeopleScreen</CustomText>
      {!people.length ? (
        <CustomText fontSize="subtitle">Fetching users</CustomText>
      ) : (
        <PeopleList
          people={people}
          userFavFNames={user?.favouriteFruits}
          navigation={navigation}
          addFriend={addFriend}
          images={peopleImgs}
        />
      )}
      {/* {people.length &&
        people.map((p) => <CustomText>PeopleScreen</CustomText>)} */}
    </SafeAreaView>
  );
};

const PeopleList = ({
  people,
  navigation,
  addFriend,
  userFavFNames,
  images,
}) => {
  return (
    <View style={[theme.container, { width: "100%", alignItems: "center" }]}>
      {/* change this to a flatlist for efficiency */}
      <FlatList
        contentContainerStyle={theme.content}
        style={styles.peopleList}
        data={people}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          // ----- A PERSON CONTAINER -----//
          <View style={styles.person}>
            {/* the left box  */}
            <View style={styles.personLeftBox}>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => {
                  addFriend(item);
                }}
              >
                <CustomText>➕</CustomText>
                <CustomText fontSize="small">add friend</CustomText>
              </TouchableOpacity>
              <CustomText fontSize="title" fontWeight="bold" padding="std">
                {item.username}
              </CustomText>
              <Image
                source={images[index]}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 100,
                  resizeMode: "cover",
                  borderWidth: 8,
                  borderColor: "white",
                }}
              />
              <CountryFlag countryName={item.country} size={30} />
            </View>
            {/* the right box */}
            <View style={styles.personRightBox}>
              {/* the fruits in common */}
              <CustomText fontSize="small" fontWeight="bold" padding="std">
                fruits in common:
              </CustomText>
              {item.favouriteFruits?.length &&
              userFavFNames.length &&
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
                        <TinyFruitIcon f={f} size={28} />
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
              {/* the person's favourite fruits */}
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
  personLeftBox: {
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "red",
    width: "35%",
    height: "100%",
  },
  personRightBox: {
    width: "65%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: "100%",
    backgroundColor: "grey",
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
