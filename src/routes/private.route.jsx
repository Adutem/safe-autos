import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { toastInfo, removeFromLocalForage } from "../contexts/GlobalContext";

const PrivateRoute = () => {
  const { userData, error } = useSelector((state) => state.user);

  if (error && error === "jwt expired") {
    toastInfo("Session Expired! Please login again.", { toastId: "adfkasdf" });
    removeFromLocalForage("accessToken");
  }

  return userData ? <Outlet /> : <Navigate to={"/admin"} />;
};

export default PrivateRoute;
