# abcFruits

University of London - Mobile Development Final Project

React Native mobile app built with Expo, aimed at children.

It's an educational nutritional app with social nt functionality. It allows users to explore fruits, manage a fruit basket, connect with users based on their fruit preferences and find nearby farmers markets.

---

## Features

- Browse alphabetical list of fruits with nutritional info and general fruit info like country of origin
- Provides a basket overlay available on all screens, that is movable by click and also could be dragged
- Basic authentication functionality like: register, log in, update profile
- each user, after registered and logged in can also save their basket contents for other session, add friends, add favourite fruits
- anyone acan access fruit list, add items to fruit basket (not saved to toher session) and view nearby farmer markets

---

## Tech Stack

- [Expo](https://expo.dev/) SDK 54 / React Native 0.81.5
- React Hook Form — form validation
- React Navigation — stack navigation
- axios + axios-mock-adapter — simulated backend (no real server)
- AsyncStorage — local data persistence
- expo-location — GPS and reverse geocoding
- Overpass API (OpenStreetMap) — farmers market data
- flagsapi.com — country flag images

---

## How to Run

```bash
npm install
npx expo start
```

Then scan the QR code with Expo Go, or run on a connected Android device via USB/ADB.

The project was almost entirely developed locally, with a android samsumg device connected via usb to a windows laptop, using the command:

```bash
npx expo start --android
```

---

## Project Structure

- `App.js` — root component, initialises google fonts and providers
- `NavStructure.js` — navigation functionality, all screen registration
- `services.js` — API request functionality, mainly access fake backend
- `backend/controllers.js` — sim backend using axios-mock-adapter
- `helperFunctions.js` — general utility functions
- `theme.js` — design global options centralized (colours, fonts, spacing)
- `components/` — screens and reusable components

---

## Notes

- There is no real backend, this project focus on frontend — all data is stored locally using AsyncStorage and intercepted by axios-mock-adapter
  . But it's worth mentioning that the app is ready to be attached to a real backend at the current stage
- Password hashing is for demonstration purposes only and is not cryptographically secure
- The USDA fruit search API is not active, but its usage demonstrated and could be easily implemented at the current stage — fruit data is bundled locally as `fruitsList.json`
- The backend is intentionally simulated using axios-mock-adapter to keep the project scope focused on frontend and mobile development. Also making the project easily uploaded to snack and avoiding use of proprietary keys
