// AlterInfo.js
import React from "react";
import { View } from "react-native";
import TopMenu from "./TopMenu";
import theme from "../theme";
import Text from "./helperComponents/CustomText";
import { StyleSheet } from "react-native";

export default function AlterInfo({ navigation }) {
  return (
    <View style={[theme.container, styles.screen]}>
      <TopMenu navigation={navigation} />
      <Text>AlterInfo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    // any custom styles here
  },
});
