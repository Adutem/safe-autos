import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import GlobalContextProvider from "./contexts/GlobalContext.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Provider } from "react-redux";
import store from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <GlobalContextProvider>
          <App />
        </GlobalContextProvider>
      </LocalizationProvider>
    </Provider>
  </BrowserRouter>
);
