import Home from "../views/home/home";
import Login from "../views/login/login";
import { Navigate } from "react-router-dom";
const routeBasic = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/",
    element: <Navigate to={"/home"} />,
  },
];
export default routeBasic;
