import React, { createContext, useState } from "react";

// This allows the basket functionality to be used across any component
export const BaskContext = createContext(0);

export const BaskProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addFruit = (fruit) => {
    // uses functional approach to ensure state is updated properly based on the previous state
    setItems((prev) => [...prev, fruit]);
  };

  return (
    //the provider makes context's value available to all components nested within it
    <BaskContext.Provider value={{ items, addFruit }}>
      {children}
    </BaskContext.Provider>
  );
};
