import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import countryCodesList from "./countryCodesList.json";
import * as FileSystem from "expo-file-system";
import fruitData from "./fruitsList.json";

// export const getCountryFlag = async (countryCode) => {
//   try {
//     const response = await axios.get(
//       `https://flagsapi.com/${countryCode}/flat/16.png`
//     );
//     return response.data[0].flags[0];
//   } catch (error) {
//     return null;
//   }
// };

/* file location in local file system stored in local storage as such:
{

    "BR": "file://some/path/br.png",
    "BE": "file://some/path/be.png"
 }
*/

// takes a country code and returns the location of its flag in the local file system
const key = "countryFlagDictionary"; // the key for the local storage
export const getLocalURIforCountryFlag = async (countryCode) => {
  if (countryCode == null || !countryCode.length) {
    return null;
  }
  let jsonFlDict = null;
  // get the dictionary from the local storage
  try {
    jsonFlDict = await AsyncStorage.getItem(key);
  } catch (e) {
    console.log(e);
  }
  const flagDict = jsonFlDict != null ? JSON.parse(jsonFlDict) : null;
  // the dict exists so we can search for the flag file path
  if (flagDict != null) {
    // the flag is found, reutrn its path
    if (countryCode in flagDict) {
      return flagDict[countryCode];
      // the flag is not in dict yet, we need to add it
    } else {
      //download the flag and save it
      const localUri = await downloadFlagAndSaveFlag(countryCode);
      // save local path to local storage dict
      try {
        const newFlagDict = { ...flagDict, [countryCode]: localUri };
        await AsyncStorage.setItem(key, JSON.stringify(newFlagDict));
        return localUri;
      } catch (e) {
        console.log(e);
      }
    }
  } // the dict not yet exists, create flag dict if it doesn't exist
  else {
    //download the flag and save it
    const localUri = await downloadFlagAndSaveFlag(countryCode);
    // create local storage dict and then save local path to local storage
    try {
      const newFlagDict = { [countryCode]: localUri };
      await AsyncStorage.setItem(key, JSON.stringify(newFlagDict));
      return localUri;
    } catch (e) {
      console.log(e);
    }
  }
};

// gets country code by name
export const getCountryCode = (codeArray, countryName) => {
  for (let country of codeArray) {
    if (country.name === countryName) {
      return country.code;
    }
  }
  return null;
};

// first this line creates a dir if it still doesn't exist, if it does, it does nothing
const downloadFlagAndSaveFlag = async (countryCode) => {
  try {
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "flags",
      {
        intermediates: true,
      }
    );
    // create a new path to the file system for the downloaded flag
    const localUri = FileSystem.documentDirectory + `flags/${countryCode}.png`;
    // download the flag
    await FileSystem.downloadAsync(
      `https://flagsapi.com/${countryCode}/flat/32.png`,
      localUri
    );
    return localUri;
  } catch (e) {
    console.log("error in downloadFlagAndSaveFlag", e);
    return null;
  }
};
