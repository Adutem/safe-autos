import { createContext, useContext } from "react";
import { models, makes, modelYears, states, services } from "../data";

const GlobalContext = createContext(null);

const GlobalContextProvider = ({ children }) => {
  const parseName = (str) =>
    str
      .replace("&", "")
      .replace("/", "-")
      .split(" ")
      .filter((word) => word)
      .join("-")
      .toLowerCase();

  return (
    <GlobalContext.Provider
      value={{ models, makes, modelYears, states, services, parseName }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalContextProvider;
