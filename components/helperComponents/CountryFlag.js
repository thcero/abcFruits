// CountryFlag.js — fetches and displays a country flag image, using the cache from helperFunctions

import { useState, useEffect } from "react";
import { Image } from "react-native";
import {
  getLocalURIforCountryFlag,
  getCountryCode,
} from "../../helperFunctions";
import countryCodesList from "../../countryCodesList.json";

// custom hook that will download flag images and store them in the local file system if they're not already there
// ortherwise just grab them from there
export const CountryFlag = ({ countryName, size }) => {
  const [flagUri, setFlagUri] = useState(null);

  const countryCode = getCountryCode(countryCodesList, countryName);

  useEffect(() => {
    (async () => {
      if (countryCode) {
        try {
          const fUri = await getLocalURIforCountryFlag(countryCode);
          fUri && setFlagUri(fUri);
        } catch (e) {
          console.log(e);
        }
      }
    })();
  }, []);
  if (!flagUri) return null;
  return (
    <>
      <Image
        style={{
          width: size,
          height: size,
        }}
        source={{ uri: flagUri }}
        resizeMode="cover"
      />
    </>
  );
};
