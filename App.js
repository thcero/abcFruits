import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthContextProvider } from "./components/helperComponents/AuthContextProvider";
import { BaskProvider } from "./components/basketFunctionality/BaskProvider";
import { NavStructure } from "./NavStructure";
import { initializeSimDB } from "./backend/controllers";
import { useFonts, Sniglet_400Regular, Sniglet_800ExtraBold } from "@expo-google-fonts/sniglet";
import { Quicksand_500Medium, Quicksand_700Bold } from "@expo-google-fonts/quicksand";

// Arbitrary name for the simulated db

export default function App() {
  const [fontsLoaded] = useFonts({
    Sniglet_400Regular,
    Sniglet_800ExtraBold,
    Quicksand_500Medium,
    Quicksand_700Bold,
  });

  // initializes simulated db
  useEffect(() => {
    (async () => {
      await initializeSimDB();
    })();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthContextProvider>
        <BaskProvider>
          <SafeAreaProvider>
            <NavStructure />
          </SafeAreaProvider>
        </BaskProvider>
      </AuthContextProvider>
    </GestureHandlerRootView>
  );
}
