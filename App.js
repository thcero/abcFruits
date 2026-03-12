import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { EventProvider } from "react-native-outside-press";
import { AuthContextProvider } from "./components/helperComponents/AuthContextProvider";
import { BaskProvider } from "./components/basketFunctionality/BaskProvider";
import { NavStructure } from "./NavStructure";
import { initializeSimDB } from "./backend/controllers";

// Arbitrary name for the simulated db

export default function App() {
  // initializes simulated db
  useEffect(() => {
    (async () => {
      await initializeSimDB();
    })();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <EventProvider>
        <AuthContextProvider>
          <BaskProvider>
            <SafeAreaProvider>
              <NavStructure />
            </SafeAreaProvider>
          </BaskProvider>
        </AuthContextProvider>
      </EventProvider>
    </GestureHandlerRootView>
  );
}
