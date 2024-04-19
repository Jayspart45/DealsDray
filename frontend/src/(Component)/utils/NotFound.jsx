import { useLocation, Link } from "react-router-dom";
import Container from "./Container";
import { Button } from "./Button";

const NotFound = () => {
  const location = useLocation();

  return (
    <Container className={"w-full h-screen bg-color1 space-y-5"}>
      <h1 className="font-semibold text-color2 text-4xl">404 - Not Found</h1>
      <p className="text-red-500 text-xl font-Poppins">
        The requested URL <code className="text-yellow-500">{location.pathname}</code> was not found on this
        server
      </p>
      <Link to="/user">
        <Button className={"w-full text-gray-200 hover:text-color1"} text={"Go to Home Page"} />
      </Link>
    </Container>
  );
};

export default NotFound;
