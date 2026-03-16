// Basket.js — floating dynamic basket overlay, to be available on screens, via NavStructure
import { useState, useRef } from "react";
import theme from "../../theme";
import { CustomText } from "../helperComponents/CustomText";
import {
  Animated,
  Image,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useBasket } from "./BaskProvider";
import fruitIconImgSources from "../../assets/fruit-icons/imgSourcesArray";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// dimensions for collapsed and expanded basket
const collHeight = 110;
const collWidth = 110;
const expanHeight = theme.heights.screen / 1.5;
const expanWidth = (theme.widths.screen / 1.5) * 1.3;

export default function Basket() {
  const { items, addFruit, removeFruit } = useBasket();
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);
  // ref: isExpanded so the PanResponder closure can read the latest value without risk of turning stale
  const isExpandedRef = useRef(false);

  // Animated.Value refs avoid re-renders on every animation frame
  const baskHeight = useRef(new Animated.Value(collHeight)).current;
  const baskWidth = useRef(new Animated.Value(collWidth)).current;

  const expand = () => {
    isExpandedRef.current = true;
    setIsExpanded(true);
    Animated.spring(baskHeight, {
      toValue: expanHeight,
      useNativeDriver: false,
    }).start();
    Animated.spring(baskWidth, {
      toValue: expanWidth,
      useNativeDriver: false,
    }).start();
  };

  const collapse = () => {
    isExpandedRef.current = false;
    setIsExpanded(false);
    Animated.spring(baskHeight, {
      toValue: collHeight,
      useNativeDriver: false,
    }).start();
    Animated.spring(baskWidth, {
      toValue: collWidth,
      useNativeDriver: false,
    }).start();
  };

  // Toggle basket height
  const toggleBasket = () => (isExpandedRef.current ? collapse() : expand());

  // PanResponder handles swipe gestures: swipe up to expand, swipe down to collapse
  const panResponder = useRef(
    PanResponder.create({
      // only claim gesture when vertical movement is detected
      onMoveShouldSetPanResponder: (_, { dy }) => Math.abs(dy) > 10,
      onPanResponderRelease: (_, { dy }) => {
        if (dy < -30 && !isExpandedRef.current)
          expand(); // swipe up → open
        else if (dy > 30 && isExpandedRef.current) collapse(); // swipe down → close
      },
    }),
  ).current;

  return (
    <View>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.basketContainer,
          { height: baskHeight, width: baskWidth },
          {
            backgroundColor: isExpanded
              ? theme.colors.coconutBrown
              : "rgba(158, 123, 75, 0.75)",
          },
        ]}
      >
        <TouchableOpacity
          onPress={toggleBasket}
          style={[styles.handle, isExpanded && { marginLeft: 20 }]}
        >
          <Ionicons
            name={isExpanded ? "arrow-down" : "arrow-up"}
            size={18}
            color="#fff"
          />
        </TouchableOpacity>
        {isExpanded && (
          <CustomText
            style={{
              color: theme.colors.backSeed,
              fontSize: 22,
              marginTop: 19,
              marginBottom: 2,
              alignSelf: "flex-start",
              marginLeft: 14,
              fontFamily: "Sniglet_400Regular",
            }}
          >
            Today's Fruits Basket
          </CustomText>
        )}
        {isExpanded &&
          (items.length ? (
            items.map((fruit, index) => (
              <View key={index} style={styles.itemRow}>
                <TouchableOpacity onPress={() => removeFruit(fruit)}>
                  <CustomText style={styles.itemBtn}>-</CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.itemIconName}
                  onPress={() =>
                    navigation.navigate("FruitScreen", {
                      fruitName: fruit.name,
                    })
                  }
                >
                  <Image
                    source={fruitIconImgSources[fruit.name]}
                    style={styles.itemIcon}
                  />
                  <CustomText style={styles.itemText} numberOfLines={1}>
                    {" "}
                    {fruit.name}
                  </CustomText>
                </TouchableOpacity>
                <CustomText
                  style={[styles.itemText, { color: theme.colors.bananaSkin }]}
                >
                  {"  "}x {fruit.quantity}
                  {"   "}
                </CustomText>
                <TouchableOpacity onPress={() => addFruit(fruit)}>
                  <CustomText style={styles.itemBtn}>+</CustomText>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <CustomText
              padding="large"
              style={{ color: "#fff", fontSize: 17.6 }}
            >
              Basket is empty
            </CustomText>
          ))}
      </Animated.View>
    </View>
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
    alignItems: "center",
    borderWidth: 7,
    borderColor: "rgba(255, 190, 51, 0.36)",
  },
  handle: {
    marginTop: theme.margins.std,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: theme.borderRadius.round,
    width: 40,
    height: 30,
    transform: [{ rotate: "-45deg" }],
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "flex-start",
    marginLeft: 13,
    width: "75%",
    paddingVertical: 10,
    paddingTop: 28,
  },
  itemIconName: {
    flexDirection: "row",
    alignItems: "center",
    width: 130,
    paddingLeft: 25,
    overflow: "hidden",
  },
  itemBtn: {
    fontFamily: theme.fonts.display,
    fontSize: 32,
    lineHeight: 34,
    color: theme.colors.blueberry,
  },
  itemText: {
    color: "#fff",
    fontSize: 17,
  },
  itemIcon: {
    width: 22,
    height: 22,
    borderRadius: 5,
  },
});
