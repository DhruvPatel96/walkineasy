import { Navigate, Outlet, useRoutes } from "react-router-dom";
// layouts
// import DashboardLayout from "./layouts/dashboard";
import SimpleLayout, { SimpleLeft, SimpleRight } from "./layouts/simple";
import ClientLogin from "./pages/client/auth/Login";
import ClinicLogin from "./pages/clinic/auth/Login";
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
						{ path: "register", element: <></> },
					],
				},
				// { path: "products", element: <ProductsPage /> },
				// { path: "blog", element: <BlogPage /> },
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
						{ path: "register", element: <></> },
					],
				},
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
