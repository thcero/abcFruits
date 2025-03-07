import { useState } from "react";
import { Button, Image, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export const pickImage = async () => {
  // image library requires no permission
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    // if user doesn't cancel the action returns the uri of the image in the fsystem
    if (!result.canceled) return result.assets[0].uri;
  } catch (e) {
    console.log(e);
  }
};

// i found this is the most strightforward way of taking a pic, it uses the same nice library
// working simlessly in andr and ios
export const takePictureAndReturnUri = async () => {
  try {
    const permResult = await ImagePicker.requestCameraPermissionsAsync();
    // if user denied permission
    if (permResult.granted === false) {
      return "access denied";
    } else {
      // user allowed, lounch camer on their device (they can switch between front and back)
      const result = await ImagePicker.launchCameraAsync();
      // if user doesn't decide to cancel, then return the uri of the pic just taken
      if (!result.canceled) return result.assets[0].uri;
    }
  } catch (e) {
    console.log(e);
  }
};
