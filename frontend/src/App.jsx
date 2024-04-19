import { Outlet } from "react-router-dom";
import { Container, Navbar } from "./(Component)/index";
import { useEffect } from "react";
import { setAuthToken } from "./config/config";
import { getFromLocal } from "./utils/utilis";

function App() {
  useEffect(() => {
    let token = getFromLocal("accessToken");
    setAuthToken(token);
  }, []);
  return (
    <Container>
      <Navbar />
      <Outlet />
    </Container>
  );
}

export default App;
