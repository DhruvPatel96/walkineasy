import { Navigate, Outlet, useRoutes } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
// layouts
// import DashboardLayout from "./layouts/dashboard";
import SimpleLayout, { SimpleLeft, SimpleRight } from "./layouts/simple";
import ClientForgot from "./pages/client/auth/Forgot";
import ClientLogin from "./pages/client/auth/Login";
import ClientRegister from "./pages/client/auth/Register";
import ClientProfile from "./pages/client/Profile";
import Search from "./pages/client/Search";
import ClinicForgot from "./pages/clinic/auth/Forgot";
import ClinicLogin from "./pages/clinic/auth/Login";
import ClinicRegister from "./pages/clinic/auth/Register";
import Doctors from "./pages/clinic/dashboard/Doctors";
import Equipments from "./pages/clinic/dashboard/Equipments";
import Overview from "./pages/clinic/dashboard/Overview";
import Requests from "./pages/clinic/dashboard/Requests";
import ClinicProfile from "./pages/clinic/Profile";
//
// import BlogPage from "./pages/BlogPage";
// import UserPage from "./pages/UserPage";
// import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
// import ProductsPage from "./pages/ProductsPage";
// import DashboardAppPage from "./pages/DashboardAppPage";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: "client",
      element: <SimpleLayout />,
      children: [
        {
          element: <Navigate to="auth" />,
          index: true,
        },
        {
          path: "auth",
          element: <SimpleLeft />,
          children: [
            { element: <Navigate to="login" />, index: true },
            { path: "login", element: <ClientLogin /> },
            { path: "register", element: <ClientRegister /> },
            { path: "forgot", element: <ClientForgot /> },
          ],
        },
        { path: "search", element: <Search /> },
        { path: "profile", element: <ClientProfile /> },
      ],
    },
    {
      path: "clinic",
      element: <SimpleLayout />,
      children: [
        {
          element: <Navigate to="auth" />,
          index: true,
        },
        {
          path: "auth",
          element: <SimpleRight />,
          children: [
            { element: <Navigate to="login" />, index: true },
            { path: "login", element: <ClinicLogin /> },
            { path: "register", element: <ClinicRegister /> },
            { path: "forgot", element: <ClinicForgot /> },
          ],
        },
        {
          path: "dashboard",
          element: <DashboardLayout />,
          children: [
            { element: <Navigate to="overview" />, index: true },
            { path: "overview", element: <Overview /> },
            { path: "doctors", element: <Doctors /> },
            { path: "equipments", element: <Equipments /> },
            { path: "requests", element: <Requests /> },
          ],
        },
        { path: "profile", element: <ClinicProfile /> },
      ],
    },
    {
      element: <Outlet />,
      children: [
        { element: <Navigate to="/client/auth" />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
