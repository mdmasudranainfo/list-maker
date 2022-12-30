import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";
import { AuthContext } from "../../Tools/ContentApi/UserContext";
import Loader from "../../Tools/Loader/Loader";

const PrivateRoute = ({ children }) => {
  const { loader, user } = useContext(AuthContext);
  let location = useLocation();

  if (!loader) {
    return <Loader></Loader>;
  }

  if (user?.uid) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
