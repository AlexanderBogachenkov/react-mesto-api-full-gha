import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, loggedIn }) => {
  // console.log("loggedIn -> ", loggedIn);

  return loggedIn ? children : <Navigate to="./sign-up" />;
};

export default ProtectedRoute;
