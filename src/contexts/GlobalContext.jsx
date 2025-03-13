import { createContext, useContext, useState, useEffect } from "react";
import { models, makes, modelYears, states, services } from "../data";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";
import serviceLocations from "../data/service-location-data";
import localforage from "localforage";

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

export const BASE_URL =
  import.meta.env.VITE_BASE_URL || "http://192.168.137.1:5000";

export const saveToLocalForage = async (key, value) => {
  try {
    return await localforage.setItem(key, value);
  } catch (error) {
    return console.log(error);
  }
};

export const saveToLocalStorage = (key, value) => {
  return localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const removeFromLocalStorage = (key) => {
  return localStorage.removeItem(key);
};

export const getFromLocalForage = async (key) => {
  try {
    console.log(key);
    return await localforage.getItem(key);
  } catch (error) {
    return console.log(error);
  }
};

export const removeFromLocalForage = async (key) => {
  try {
    return await localforage.removeItem(key);
  } catch (error) {
    return console.log(error);
  }
};

export const toastError = (message, toastId, shouldUpdate) => {
  return shouldUpdate
    ? toast.update(toastId, {
        render: message,
        ...toaster("error"),
      })
    : toast.error(message, { toastId });
};

export const toastSuccess = (message, toastId, shouldUpdate) => {
  return shouldUpdate
    ? toast.update(toastId, {
        render: message,
        ...toaster("success"),
      })
    : toast.success(message, { toastId });
};

export const toastInfo = (message, toastId, shouldUpdate) => {
  return shouldUpdate
    ? toast.update(toastId, {
        render: message,
        ...toaster("info"),
      })
    : toast.info(message, { toastId });
};

const toaster = (type) => ({ isLoading: false, autoClose: true, type });

const GlobalContextProvider = ({ children }) => {
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth);
  const [showSearch, setShowSearch] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [currentStoreLocation, setCurrentStoreLocation] = useState(
    // () => serviceLocations[0]
    null
  );
  const [nearbyStores, setNearbyStores] = useState([]);

  const displayLocationModal = (e) => {
    e && e.preventDefault();
    setShowLocationModal(true);
    document.body.style.overflow = "hidden";
  };

  const hideLocationModal = (e) => {
    e && e.preventDefault();
    setShowLocationModal(false);
    document.body.style.overflow = "initial";
  };

  const handleWindowResize = (e) => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const displaySearchModal = (e) => {
    e && e.preventDefault();
    setShowSearch(true);
  };
  const hideSearchModal = (e) => {
    e && e.preventDefault();
    setShowSearch(false);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

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

  const fetchNearbyStores = async (latitude, longitude) => {
    try {
      const response = await axios.get(`${BASE_URL}/stores`, {
        params: { latitude, longitude },
      });
      setNearbyStores(response.data);
    } catch (error) {
      console.error("Error fetching nearby stores:", error);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchNearbyStores(latitude, longitude);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

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
        currentStoreLocation,
        setCurrentStoreLocation,
        toastError,
        toastInfo,
        toastSuccess,
        showLocationModal,
        setShowLocationModal,
        displayLocationModal,
        hideLocationModal,
        nearbyStores,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalContextProvider;