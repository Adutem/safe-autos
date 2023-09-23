import React, { useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  toastInfo,
  removeFromLocalForage,
  removeFromLocalStorage,
} from "../contexts/GlobalContext";
import { getUser } from "../redux";

const PrivateRoute = () => {
  const { userData, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    dispatch(getUser(() => setLoader(false)));
  }, [location]);

  if (loader) return <h2>Loading...</h2>;

  return userData ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
