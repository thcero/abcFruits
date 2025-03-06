import { useContext } from "react";
import { createContext, useState } from "react";

// Allows the basket functionality to be accessed across any component
export const BaskContext = createContext();

export const BaskProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  // const [show, setShow] = useState(true);

  // const controlBaskView = (show) => {
  //   setShow(() => show);
  //   console.log("from bask provider", show);
  // };

  // this is a common pattern of updating an state arrays based on its object props
  // uses functional approach to ensure state is updated properly based on the previous state
  const addFruit = (fruit) => {
    setItems((prev) => {
      //first check if the item is present in the array
      const itemPresent = prev.some((item) => item.name === fruit.name);
      // than we use map to generate a new updated array based on the condition
      if (itemPresent) {
        return prev.map((item) =>
          item.name === fruit.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ); // incase the item was not in the array, we destructure the previous array and add the new item
      } else {
        return [...prev, { name: fruit.name, quantity: 1 }];
      }
    });
  };

  return (
    <BaskContext.Provider value={{ items, addFruit }}>
      {children}
    </BaskContext.Provider>
  );
};

// custom hook to make basket management simpler
export const useBasket = () => useContext(BaskContext);
