/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [updatedData, setUpdatedData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "HR",
    gender: "",
    avatar: "",
    course: [],
  });
  const [tableData, setTableData] = useState([]);

  const value = {
    userData,
    setUserData,
    updatedData,
    setUpdatedData,
    tableData,
    setTableData,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default useUser;
