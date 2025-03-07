import { useState, useEffect } from "react";
import { getLocalURIforCountryFlag, getCountryCode } from "./helperFunctions";
import countryCodesList from "./countryCodesList.json";

// custom hook that will download flag images and store them in the local file system if they're not already there
// ortherwise just grab them from there
export default function useFlags(fruit) {
  const [flagsUris, setFlagsUris] = useState([]);

  const countryCodes = fruit?.nativeTo
    ? fruit.nativeTo.map((country) => getCountryCode(countryCodesList, country))
    : [];

  useEffect(() => {
    (async () => {
      if (countryCodes.length) {
        try {
          const flagsUris = await Promise.all(
            countryCodes.map((code) => getLocalURIforCountryFlag(code))
          );
          setFlagsUris(flagsUris);
        } catch (e) {
          console.log(e);
        }
      }
    })();
  }, [fruit]);
  return flagsUris;
}
