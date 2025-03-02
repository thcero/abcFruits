import React, { useContext, useState, useRef } from "react";
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { BaskContext } from "./BaskProvider";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const colHeight = 50;
const expanHeight = SCREEN_HEIGHT / 3.5;

export default function Basket() {
  const { items } = useContext(BaskContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const baskHeight = useRef(new Animated.Value(colHeight)).current;

  // Toggle expansion
  const toggleBasket = () => {
    const targetHeight = isExpanded ? colHeight : expanHeight;
    setIsExpanded(!isExpanded);

    // Animate from current height to target height
    Animated.spring(baskHeight, {
      toValue: targetHeight,
      useNativeDriver: false, // must be false when animating layout (height)
    }).start();
  };

  return (
    <Animated.View style={[styles.basketContainer, { height: baskHeight }]}>
      <TouchableOpacity onPress={toggleBasket} style={styles.handle}>
        <Text style={styles.handleText}>{isExpanded ? "↓" : "↑"}</Text>
      </TouchableOpacity>
      <Text style={styles.infoText}>
        You have {items.length} fruits in your basket.
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  basketContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "brown",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    zIndex: 99,
    overflow: "hidden",
    alignItems: "center",
  },
  handle: {
    marginTop: 4,
    padding: 8,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 12,
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
