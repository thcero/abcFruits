import { Dimensions } from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const theme = {
  colors: {
    textPrimary: "#1d2026",
    textSecondary: "#312b45",
    primBlue: "#3e37ff",
    secyPink: "#ff3794",
    secYellow: "#f8ff37",
    secGreen: "#37ffa2",
    tercBlueFaded: "#3883fe",
    greenLogin: "#00b862",
    redDelete: "#fe3844",
    light: "#f5f4ff",

    // green: primary accent guava peel use with white
    prim: "#6BCB3F",
    // highlight guafa flesh also with white text
    sec: "#FF6F70",
    // beije: guave seed
    backSeed: "#FFF0D5",
    // alternative light canvas
    back: "#F5F3EE",
    // dark neutral
    text: "#3A3A3A",

    // white text
    white: "#FFFFFF",
  },
  fontSizes: {
    small: 17,
    body: 22,
    subheading: 18,
    heading: 28,
    huge: 38,
  },
  fonts: {
    main: "System",
  },
  weights: {
    normal: "500",
    bold: "900",
  },
  paddings: {
    std: 8,
    large: 16,
  },
  margins: {
    std: 5,
    large: 10,
  },
  borderWidths: {
    std: 1,
    large: 3,
  },
  borderRadius: {
    round: 10,
  },
  widths: {
    screen: SCREEN_WIDTH,
  },
  heights: {
    screen: SCREEN_HEIGHT,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "spaced-evenly",
    backgroundColor: "#FFF0D5",
  },
  content: {
    justifyContent: "spaceAround",
    alignItems: "flex-start",
    width: "100%",
  },
};

export default theme;
