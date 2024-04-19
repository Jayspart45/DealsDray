import { Link, useNavigate } from "react-router-dom";
import Container from "./utils/Container";
import { getFromLocal } from "@/utils/utilis";
import { useEffect, useState } from "react";
import { Button } from "./utils/Button";
import { BACKEND_API } from "@/config/config";
import { toast } from "react-toastify";

const Navbar = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const NavLink = [
    {
      name: "Home",
      link: "/user",
    },
    {
      name: "Employee List",
      link: "/user/employeelist",
    },
  ];
  const handleLogout = async () => {
    const response = await BACKEND_API.post("/api/v1/users/logout_user");
    localStorage.removeItem("accessToken", "");
    localStorage.removeItem("userData", "");
    localStorage.removeItem("isAuthenticated", "");
    navigate("/");
    toast.success(response.data.data);
  };
  useEffect(() => {
    const userData = getFromLocal("userData");
    setUserData(userData);
  }, []);
  return (
    <Container
      className={"py-5 w-full flex-row justify-around top-0 left-0 absolute"}
    >
      <Link to="/user">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
          />
        </svg>
      </Link>
      <ul className="flex justify-around max-w-sm w-full font-semibold">
        {NavLink.map((nav, index) => (
          <Link key={index} to={nav.link}>
            {nav.name}
          </Link>
        ))}
      </ul>
      <div className="flex items-center gap-4">
        <h1 className="font-medium border-2 py-2 px-4 rounded-full border-color3">
          {userData?.username}
        </h1>
        <Button onClick={handleLogout} text={"LogOut"}></Button>
      </div>
    </Container>
  );
};

export default Navbar;
