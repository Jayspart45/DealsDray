import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/useUser.jsx";
import "./App.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Login,
  Error,
  ProtectedRoute,
  Dashboard,
  CreateEmployee,
  UpdateEmployee,
  EmployeeList,
} from "./(Component)/index.js";

const router = createBrowserRouter([
  {
    path: "",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "user",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        errorElement: <Error />,
      },
      {
        path: "createemployee",
        element: <CreateEmployee />,
        errorElement: <Error />,
      },
      {
        path: "updateemployee",
        element: <UpdateEmployee />,
        errorElement: <Error />,
      },
      {
        path: "employeelist",
        element: <EmployeeList />,
        errorElement: <Error />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <UserProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </UserProvider>
);
