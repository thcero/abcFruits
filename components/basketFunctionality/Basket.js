import { useState, useRef } from "react";
import OutsidePressHandler from "react-native-outside-press";
import theme from "../../theme";
import { CustomText } from "../helperComponents/CustomText";
import { Animated, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useBasket } from "./BaskProvider";

const collHeight = 110;
const collWidth = 110;
const expanHeight = theme.heights.screen / 1.5;
const expanWidth = theme.widths.screen / 1.5;

export default function Basket() {
  const { items } = useBasket();
  const [isExpanded, setIsExpanded] = useState(false);

  // so animation can keep track of the values without triggering an update
  const baskHeight = useRef(new Animated.Value(collHeight)).current;
  const baskWidth = useRef(new Animated.Value(collWidth)).current;

  // Toggle basket height
  const toggleBasket = () => {
    // if basket is expanded the target is the collapsed height and vice-versa
    const targetHeight = isExpanded ? collHeight : expanHeight;
    const targetWidth = isExpanded ? collWidth : expanWidth;
    setIsExpanded(!isExpanded);

    // The animation will always move the basket from the current height to the target height
    Animated.spring(baskHeight, {
      toValue: targetHeight,
      useNativeDriver: false,
    }).start();

    // The animation will always move the basket from the current height to the target height
    Animated.spring(baskWidth, {
      toValue: targetWidth,
      useNativeDriver: false,
    }).start();
  };

  return (
    <OutsidePressHandler
      onOutsidePress={() => (!isExpanded ? null : toggleBasket())}
    >
      <Animated.View
        style={[
          styles.basketContainer,
          { height: baskHeight, width: baskWidth },
          {
            backgroundColor: isExpanded
              ? "rgb(165, 42, 42)"
              : "rgba(165, 42, 42, .75)",
          },
        ]}
      >
        <TouchableOpacity onPress={toggleBasket} style={[styles.handle]}>
          <CustomText fontSize="heading" style={styles.handleText}>
            {isExpanded ? "↓" : "↑"}
          </CustomText>
        </TouchableOpacity>
        {items.length ? (
          items.map((fruit, index) => (
            <CustomText
              fontSize="subheading"
              key={index}
              style={styles.infoText}
            >
              {fruit.name} x {fruit.quantity}
            </CustomText>
          ))
        ) : (
          <CustomText padding="large">Basket is empty</CustomText>
        )}
      </Animated.View>
    </OutsidePressHandler>
  );
}

const styles = StyleSheet.create({
  basketContainer: {
    position: "absolute",
    bottom: -50,
    right: -50,
    borderTopStartRadius: 100,
    borderTopEndRadius: 100,
    padding: 15,
    // the basket z index needs to be the highest as it's always visible
    zIndex: 99,
    overflow: "hidden",
    alignItems: "center",
  },
  handle: {
    marginTop: theme.margins.marginStd,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: theme.borderRadius.round,
    width: 40,
    height: 30,
    transform: [{ rotate: "-45deg" }],
  },
  handleText: {
    color: "#fff",
  },
  infoText: {
    color: "#fff",
    padding: 15,
  },
});
