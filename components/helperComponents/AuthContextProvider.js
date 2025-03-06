import { createContext, useState, useContext } from "react";

// Allows the basket functionality to be accessed across any component
export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook for convenience
export const useAuth = () => useContext(AuthContext);
