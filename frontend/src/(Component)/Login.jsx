import { useNavigate } from "react-router-dom";
import Container from "./utils/Container";
import { useEffect, useState } from "react";
import { getFromLocal, setToLocal } from "@/utils/utilis";
import { BACKEND_API, setAuthToken } from "@/config/config";
import { Button } from "./utils/Button";
import { Input } from "./utils/Input";
import { toast } from "react-toastify";
import useUser from "@/context/useUser";

const Login = () => {
  const navigate = useNavigate();
  const { setUserData } = useUser();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleKeyPress = (e) => {
    if (e.key == "Enter") document.getElementById("loginButton").click();
  };
  const handleLogin = async () => {
    if (user.username == "" || user.password == "") {
      toast.warning("Email and Password should be provided!");
      return;
    }

    try {
      const response = await BACKEND_API.post("/api/v1/users/login_user", user);
      if (response.data) {
        if (response.data.data.accessToken && response.data.data.user) {
          setAuthToken(response.data.data.accessToken);
          setToLocal("isAuthenticated", true);
          setToLocal("accessToken", response.data.data.accessToken);
          setToLocal("userData", response.data.data.user);
        }
        setUserData(response.data.user);
        toast.success(response.data.message);
        navigate("/user");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    const isAuthenticated = getFromLocal("isAuthenticated");
    if (isAuthenticated) {
      navigate("/user");
    }
  }, []);
  return (
    <Container className={"w-full min-h-screen"}>
      <Container className="max-w-sm w-full text-center gap-5">
        <h1 className="font-semibold text-2xl sm:text-4xl ">Login</h1>
        <Input
          name="username"
          value={user.username}
          onChange={handleChange}
          type="text"
          placeholder="Username"
          onKeyPress={handleKeyPress}
        />
        <Input
          name="password"
          value={user.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
          onKeyPress={handleKeyPress}
        />
        <Button id={"loginButton"} onClick={handleLogin} text={"Login"} />
      </Container>
    </Container>
  );
};

export default Login;
