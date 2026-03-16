// AuthContextProvider.js — provides global auth state (user, isAuth), providing auto-authenticates on app launch

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState, useContext, useEffect } from "react";
import { authenticateUser } from "../../services";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  // key used to store the session token in AsyncStorage
  const key = "bearerTkn";

  // on mount: check if a session token exists and re-authenticate the user automatically
  useEffect(() => {
    (async () => {
      try {
        const tokenStored = await AsyncStorage.getItem(key);
        if (!tokenStored) return;
        // token found — validate it against the backend and restore user state
        const usr = await authenticateUser({ sessionToken: tokenStored });
        if (!usr) return;
        setUser(usr);
        setIsAuth(true);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuth, setIsAuth, key }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook for convenience
export const useAuth = () => useContext(AuthContext);
