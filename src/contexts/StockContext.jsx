import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const StockContext = createContext({});
StockContextProvider.propTypes = {
  children: PropTypes.node,
};

export default function StockContextProvider({ children }) {
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem("bar-estoque");
    if (!storedItems) return [];
    const items = JSON.parse(storedItems);
    items.forEach((item) => {
      item.createddAt = new Date(item.createdAt);
      item.updatedAt = new Date(item.updatedAt);
    });

    return items;
  });

  const addItem = (item) => {
    setItems((currentState) => {
      const updateItems = [item, ...currentState];
      localStorage.setItem("bar-estoque", JSON.stringify(updateItems));
      return updateItems;
    });
  };

  const getItem = (itemId) => {
    return items.find((item) => item.id === +itemId);
  };

  const deleteItem = (itemId) => {
    setItems((currentState) => {
      const updateItems = currentState.filter((item) => item.id !== itemId);
      localStorage.setItem("bar-estoque", JSON.stringify(updateItems));
      return updateItems;
    });
  };

  const updateItem = (itemId, newAttributes) => {
    setItems((current) => {
      const itemIndex = current.findIndex((i) => i.id === itemId);
      const updatedItems = [...current];
      Object.assign(updatedItems[itemIndex], newAttributes, {
        updatedAt: new Date(),
      });
      localStorage.setItem("obc-react-stock", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const stock = {
    items,
    addItem,
    getItem,
    updateItem,
    deleteItem,
  };

  return (
    <StockContext.Provider value={stock}>{children}</StockContext.Provider>
  );
}
