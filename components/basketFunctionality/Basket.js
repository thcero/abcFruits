import { useState, useRef } from "react";
import theme from "../../theme";
import CustomText from "../helperComponents/CustomText";
import { Animated, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useBasket } from "./BaskProvider";

const collHeight = 50;
const expanHeight = theme.heights.screen / 3.5;

export default function Basket() {
  const { items } = useBasket();
  const [isExpanded, setIsExpanded] = useState(false);

  const baskHeight = useRef(new Animated.Value(collHeight)).current;

  // Toggle basket height
  const toggleBasket = () => {
    const targetHeight = isExpanded ? collHeight : expanHeight;
    setIsExpanded(!isExpanded);

    // The animation will always move the basket from the current height to the target height
    Animated.spring(baskHeight, {
      toValue: targetHeight,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.basketContainer,
        { height: baskHeight },
        {
          backgroundColor: isExpanded
            ? "rgb(165, 42, 42)"
            : "rgba(165, 42, 42, .75)",
        },
      ]}
    >
      <TouchableOpacity onPress={toggleBasket} style={styles.handle}>
        <Text style={styles.handleText}>{isExpanded ? "↓" : "↑"}</Text>
      </TouchableOpacity>
      {items.length ? (
        items.map((fruit, index) => (
          <CustomText
            fontSize="subheading"
            padding="paddingSmall"
            key={index}
            style={styles.infoText}
          >
            {fruit.name} x {fruit.quantity}
          </CustomText>
        ))
      ) : (
        <CustomText>Basket is empty</CustomText>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  basketContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    borderTopLeftRadius: theme.borderRadius.round,
    borderTopRightRadius: theme.borderRadius.round,
    // the basket z index needs to be the highest as it's always visible
    zIndex: 99,
    overflow: "hidden",
    alignItems: "center",
  },
  handle: {
    marginTop: theme.margins.marginStd,
    padding: theme.paddings.paddingStd,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: theme.borderRadius.round,
  },
  handleText: {
    color: "#fff",
    fontSize: 25,
  },
  infoText: {
    color: "#fff",
    marginTop: 8,
  },
});
