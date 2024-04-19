/* eslint-disable react/prop-types */
import { getFromLocal } from "@/utils/utilis";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = getFromLocal("isAuthenticated");
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
