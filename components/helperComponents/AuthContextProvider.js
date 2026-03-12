import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState, useContext, useEffect } from "react";
import { authenticateUser } from "../../services";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  const key = "bearerTkn";
  useEffect(() => {
    // performs the check: is there a valid token in local storage?
    (async () => {
      try {
        const tokenStored = await AsyncStorage.getItem(key);
        if (!tokenStored) return;
        // the token is valid: refresh user state
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
