import { useState } from "react";
import { Button, Image, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [3, 3],
    quality: 1,
  });

  if (!result.canceled) return result.assets[0].uri;
};

export const takePictureAndReturnUri = async () => {
  const permResult = await ImagePicker.requestCameraPermissionsAsync();

  if (permResult.granted === false) {
    return "access denied";
  } else {
    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) return result.assets[0].uri;
  }
};
