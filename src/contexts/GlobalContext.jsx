import { createContext, useContext } from "react";
import { models, makes, modelYears, states } from "../data";

const GlobalContext = createContext(null);

const GlobalContextProvider = ({ children }) => {
  return (
    <GlobalContext.Provider value={{ models, makes, modelYears, states }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalContextProvider;
