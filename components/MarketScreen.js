import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useRef } from "react";
import theme from "../theme";
import { pickRandomImgSource } from "../helperFunctions";
import imgSourcesArray from "../assets/farmer_market_pics/imgSourcesArray.js";
import CustomText from "./helperComponents/CustomText";
import * as Location from "expo-location";
import axios from "axios";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Linking,
} from "react-native";

// the aim of this component is to get user last known, or current location and recommend some nearby
// farmer markets within 3km, displaying website and address available of farmers market made available by
// the openstreet.org, using a simple query built with the overpass API
export const MarketScreen = ({ navigation }) => {
  // stores the an array of current markets
  const [strMarkets, setStrMarkets] = useState([]);
  // if something else happens, like gps services turn unavailable or low battery
  const [msg, setMsg] = useState("Waiting for permission..");
  // controls style of selected item
  const [selectedId, setSelectedId] = useState();
  // controls images to display:
  const [marketImgs, setMarkImgs] = useState([]);

  strMarkets.length ? console.log(strMarkets) : console.log("");

  useEffect(() => {
    //setCurrentUser(userInfo);

    // *** LOCATION FUNCTIONALITY *** //
    // ask for user permission the first time they use the app:
    // (this option be remembered, so they need to go to app settings to change if desired)
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setMsg(
            "The permission to access your location was denied, if you didn't mean to revoke, you can change this option on the apps settings of your mobile"
          );
          return;
        } else setMsg("Permission granted");

        let loc = null;
        // first try to grab the users previous location as it's faster
        loc = await Location.getLastKnownPositionAsync();

        // if it fails, try to get the currentposition (more expensive, takes longer)
        if (loc == null) {
          loc = await Location.getCurrentPositionAsync({});
        }

        // if it's still unsuccessful, something else happened
        if (loc === null) {
          setMsg("Your location currently cannot be accessed, try again later");
          return;
        }

        // extract coords from location object
        const { latitude, longitude } = loc.coords;

        const radius = 3000;
        // query openstreet servers to get a list of nearby street markets
        const retMarkets = await getMarketsNearby(radius, latitude, longitude);
        if (retMarkets === undefined)
          setMsg(
            "Sorry, can't currently get markets recommendations try again later"
          );
        else if (!retMarkets.length) setMsg("No markets nearby found");
        // success:
        else {
          // first gets address of all markets as it's not by default offered by the api:
          for (let i = 0; i < retMarkets.length; i++) {
            const { lat, lon } = retMarkets[i];
            try {
              const [addr] = await Location.reverseGeocodeAsync({
                latitude: lat,
                longitude: lon,
              });
              console.log(addr);
              // populates with adress info:
              retMarkets[i].addressInfo = {
                street: addr?.street,
                number: addr?.streetNumber,
                postalCode: addr?.postalCode,
              };
            } catch (err) {
              console.log(err);
            }
          }
          setStrMarkets(retMarkets);
          setMarkImgs(populateRandomImgs(retMarkets));
          setMsg("");
        }
      } catch (e) {
        setMsg("There was a problem with the request");
        console.log(e);
      }
    })();
  }, []);

  // ** build random images source array  ** //
  const populateRandomImgs = (array) => {
    const randomImgs = [];
    if (array.length) {
      for (let i = 0; i < array.length; i++)
        randomImgs[i] = pickRandomImgSource(imgSourcesArray);
    }
    return randomImgs;
  };

  const renderItem = ({ item, index }) => {
    const backgroundColor = item.id === selectedId ? "white" : "#D2B48C";
    const textWeight = item.id === selectedId ? "bold" : "normal";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textWeight={textWeight}
        source={marketImgs[index]}
      />
    );
  };

  return (
    <SafeAreaView
      style={[
        theme.container,
        {
          padding: theme.paddings.std,
          backgroundColor: "brown",
        },
      ]}
    >
      <CustomText
        fontSize="heading"
        fontWeight="bold"
        style={{
          marginBottom: theme.margins.large * 2,
          color: "white",
        }}
      >
        Farmer markets near you:
      </CustomText>
      {msg && <CustomText>{msg}</CustomText>}

      <FlatList
        style={{
          width: "100%",
          alignSelf: "center",
        }}
        contentContainerStyle={{}}
        data={strMarkets}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const Item = ({
  item,
  onPress,
  backgroundColor,
  textWeight,
  index,
  source,
  ...props
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      {
        height: theme.heights.screen / 3.8,
        backgroundColor,
        padding: theme.paddings.large,
        marginBottom: theme.margins.std,
        justifyContent: "space-between",
      },
    ]}
  >
    <CustomText style={[{ fontWeight: textWeight }]}>
      {item.tags?.name}
    </CustomText>

    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Image
        source={source}
        style={{
          width: theme.heights.screen / 6,
          height: theme.heights.screen / 6,
          borderRadius: 100,
        }}
        resizeMode="cover"
      />
      <View style={{ width: "50%", justifyContent: "space-between" }}>
        <CustomText>{item.tags?.opening_hours}</CustomText>
        <CustomText>
          Address:{" "}
          <CustomText fontSize="small">
            {item.addressInfo?.number}, {item.addressInfo?.street},{" "}
            {item.addressInfo?.postalCode}
          </CustomText>
        </CustomText>

        <CustomText
          color="primary"
          onPress={() => Linking.openURL(item.tags?.website)}
        >
          Visit webpage
        </CustomText>
      </View>
    </View>
  </TouchableOpacity>
);

// function to get nearby farmers markets nearby:
const getMarketsNearby = async (radius, lat, lon) => {
  try {
    const baseUrl = "https://overpass-api.de/api/interpreter";

    // build the query using the simplest structure, only providing the format of data returned
    // and the type amenity desired
    const query = `[out:json];
      node["amenity"="marketplace"](around:${radius},${lat},${lon});
      out;`;

    // send request - req is a simple 'get' with no api key required thanks to overpass api functionality
    const res = await axios.get(baseUrl, {
      params: {
        data: query,
      },
    });

    // returns an object with array 'elements' containing with maket data objects
    console.log("Overpass raw response:", res.data);

    return res.data.elements;
  } catch (error) {
    // so the error get to the consumer function
    throw error;
  }
};
