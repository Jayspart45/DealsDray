import { Button, Container } from "@/(Component)/index";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const NavLink = [
    {
      name: "Create Employee",
      link: "/user/createemployee",
    },
    {
      name: "Employee List",
      link: "/user/employeelist",
    },
  ];
  return (
    <Container className={"w-full h-screen"}>
      <h1 className="font-semibold text-2xl">
        Welcome Admin Panel
      </h1>
      <ul className="flex items-center gap-10 py-10">
        {NavLink.map((navlink, index) => (
          <Link to={navlink.link} key={index}>
            <Button className={"w-full"} text={navlink.name} />
          </Link>
        ))}
      </ul>
    </Container>
  );
};

export default Dashboard;
