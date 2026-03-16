// App.js this is the root component: sets up global context providers, fonts, and the simulated database
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthContextProvider } from "./components/helperComponents/AuthContextProvider";
import { BaskProvider } from "./components/basketFunctionality/BaskProvider";
import { NavStructure } from "./NavStructure";
import { initializeSimDB } from "./backend/controllers";
import {
  useFonts,
  Sniglet_400Regular,
  Sniglet_800ExtraBold,
} from "@expo-google-fonts/sniglet";
import {
  Quicksand_500Medium,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";

export default function App() {
  // load custom fonts: Sniglet for display headings, Quicksand for body text
  const [fontsLoaded] = useFonts({
    Sniglet_400Regular,
    Sniglet_800ExtraBold,
    Quicksand_500Medium,
    Quicksand_700Bold,
  });

  // initializes simulated dbon first mount, seeds AsyncStorage with the initial users dataset if not done already
  useEffect(() => {
    (async () => {
      await initializeSimDB();
    })();
  }, []);

  // prevents unstyled text appear
  if (!fontsLoaded) return null;

  return (
    // requiredfor gesture-based components like the basket
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* manages logged-in user state globally */}
      <AuthContextProvider>
        {/* manages fruit basket state globally */}
        <BaskProvider>
          {/* provides safe-area to all screens */}
          <SafeAreaProvider>
            <NavStructure />
          </SafeAreaProvider>
        </BaskProvider>
      </AuthContextProvider>
    </GestureHandlerRootView>
  );
}
