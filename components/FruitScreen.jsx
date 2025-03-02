import { NavigationRouteContext } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import TopMenu from "./TopMenu";
import theme from "../theme";
import Text from "./helperComponents/CustomText";
import { StyleSheet } from "react-native";

export default function FruitScreen({ navigation, route }) {
  return (
    <View style={[theme.container]}>
      <TopMenu navigation={navigation} />
      <Text>FruitPage</Text>
      <Text>{route.params.fFruit.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  alphabetLetter: {
    color: theme.colors.textPrimary,
    marginLeft: theme.margins.marginStd,
    marginRight: theme.margins.marginLarge,
  },
  smallFruitIcon: {
    width: 58,
    height: 58,
    borderWidth: theme.borderWidths.borderStd,
    borderColor: theme.colors.secGreen,
    borderRadius: theme.borderRadius.round,
  },
});
