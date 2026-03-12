import rawCountries from "./countryCodesList.json";

// formats correctly for usage by form picker
export const countriesForPicker = rawCountries.map((country) => ({
  label: country.name,
  value: country.name,
}));
