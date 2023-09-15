import { createContext, useContext, useState, useEffect } from "react";
import { models, makes, modelYears, states, services } from "../data";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";

const GlobalContext = createContext(null);

function handleInViewPort(el) {
  let elPos = el.getBoundingClientRect();
  return (
    (elPos.top <= 0 && elPos.bottom >= -16500) ||
    (elPos.top >= 0 && elPos.bottom <= window.innerHeight) ||
    (elPos.bottom >= window.innerHeight && elPos.top <= window.innerHeight - 60)
  );
}

export const PROMISE_RESPONSE_TOAST_OBJ = {
  SUCCESS: { type: "success", isLoading: false, autoClose: true },
  ERROR: { type: "error", isLoading: false, autoClose: true },
  UPDATING: { isLoading: true, autoClose: false },
};

export const FILE_FORMATS =
  ".pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export const httpErrorHandler = (error, toastId, shouldToastErrorMessage) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (toastId)
      return toast.update(toastId, {
        render: error.response?.data?.message || "An error occured!",
        ...PROMISE_RESPONSE_TOAST_OBJ.ERROR,
      });
    if (shouldToastErrorMessage) {
      toast.error(error.response?.data?.message || "An error occured!");
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
    if (toastId)
      return toast.update(toastId, {
        render: "No response from server...",
        ...PROMISE_RESPONSE_TOAST_OBJ.ERROR,
      });
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
    if (toastId)
      return toast.update(toastId, {
        render: "Error while sending request...",
        ...PROMISE_RESPONSE_TOAST_OBJ.ERROR,
      });
  }
};

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://192.168.137.1:5000";

const GlobalContextProvider = ({ children }) => {
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth);
  const [showSearch, setShowSearch] = useState(false);

  const displaySearchModal = (e) => {
    e && e.preventDefault();
    setShowSearch(true);
  };
  const hideSearchModal = (e) => {
    e && e.preventDefault();
    setShowSearch(false);
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, [window.innerWidth]);

  const parseName = (str) =>
    str
      .replace("&", "")
      .replace("/", "-")
      .split(" ")
      .filter((word) => word)
      .join("-")
      .toLowerCase();

  const reverseParse = (serviceName) => {
    return services.find((serv) => parseName(serv) === serviceName);
  };

  const allFieldsPresent = (requiredFields, providedData) => {
    let keys = [];
    if (providedData instanceof FormData) {
      for (const field of requiredFields) {
        if (!providedData.has(field) || !providedData.get(field)) return false;
      }
    } else {
      keys = Object.keys(providedData);
      for (const field of requiredFields) {
        if (!keys.includes(field) || !providedData[field]) return false;
      }
    }
    return true;
  };

  const emailValidator = (email) => {
    let regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  const telephoneValidator = (stateUpdater, event) => {
    let name = event.target.name;
    let telephone = event.target.value.trim();
    telephone = telephone.replace(/[a-zA-Z]+/g, "");
    stateUpdater(name, telephone);
  };

  const formatTelephone = (str) => {
    if (!str) return str;
    let splitedStr = str.replace(/\W+/g, "").split("");
    if (splitedStr.length === 0) return splitedStr.join("");
    splitedStr.unshift("(");
    if (splitedStr.length > 4) splitedStr.splice(4, 0, ")-");
    if (splitedStr.length > 8) splitedStr.splice(8, 0, "-");
    return splitedStr.join("");
  };

  const submitEmail = async (data, callback, successCallback) => {
    const toastId = toast.loading("Sending message...");
    try {
      let response = await axios.post(`${BASE_URL}/send-email`, data);
      if (response.status === 200) {
        toast.update(toastId, {
          ...PROMISE_RESPONSE_TOAST_OBJ.SUCCESS,
          render: "Email sent...",
        });
      }
      if (callback && callback instanceof Function) {
        callback();
      }
      if (successCallback) {
        console.log("Success callback called...");
        successCallback();
      }
    } catch (error) {
      if (callback && callback instanceof Function) {
        callback();
      }
      httpErrorHandler(error, toastId);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        models,
        makes,
        modelYears,
        states,
        services,
        parseName,
        reverseParse,
        allFieldsPresent,
        emailValidator,
        telephoneValidator,
        formatTelephone,
        httpErrorHandler,
        submitEmail,
        handleInViewPort,
        showSearch,
        windowWidth,
        displaySearchModal,
        hideSearchModal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalContextProvider;
