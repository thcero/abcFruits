// BaskProvider.js — provides global basket state and add/remove logic, also syncs with the logged-in user

import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { useAuth } from "../helperComponents/AuthContextProvider";
import { updateUser } from "../../services";

// allows basket functionality to be accessed across any component
export const BaskContext = createContext();

export const BaskProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const { user, setUser } = useAuth();

  // keep basket in sync when the user logs in or out
  useEffect(() => {
    setItems(user?.fruitBasket || []);
  }, [user]);

  // if the fruit is already in the basket, increment its quantity; otherwise add it as a new entry
  // if user is logged in, persist the updated basket to their account
  const addFruit = async (fruit) => {
    const itemPresent = items.some((item) => item.name === fruit.name);
    const newItems = itemPresent
      ? items.map((item) =>
          item.name === fruit.name
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      : [...items, { name: fruit.name, quantity: 1 }];
    setItems(newItems);
    if (user) {
      try {
        const usrUpdt = await updateUser({ ...user, fruitBasket: newItems });
        if (usrUpdt) setUser(usrUpdt);
      } catch (e) {
        console.log(e);
      }
    }
  };

  // if quantity > 1, decrement it; otherwise remove the fruit entirely from the basket
  const removeFruit = async (fruit) => {
    const item = items.find((item) => item.name === fruit.name);
    if (!item) return;
    const newItems =
      item.quantity > 1
        ? items.map((i) =>
            i.name === fruit.name ? { ...i, quantity: i.quantity - 1 } : i,
          )
        : items.filter((i) => i.name !== fruit.name);
    setItems(newItems);
    if (user) {
      try {
        const usrUpdt = await updateUser({ ...user, fruitBasket: newItems });
        if (usrUpdt) setUser(usrUpdt);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <BaskContext.Provider value={{ items, addFruit, removeFruit }}>
      {children}
    </BaskContext.Provider>
  );
};

// custom hook to make basket management simpler
export const useBasket = () => useContext(BaskContext);
