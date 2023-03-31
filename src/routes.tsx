import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
// layouts
// import DashboardLayout from "./layouts/dashboard";
import ClientHeader from "./layouts/clientHeader";
import { SimpleLeft, SimpleRight } from "./layouts/simple";
import OTPAuth from "./pages/client/auth/firebaseAuth";
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
import Page404 from "./pages/Page404";
import { useAppSelector } from "./store";

// ----------------------------------------------------------------------

const Router = () => {
	const { loggedIn, userType } = useAppSelector((state) => state.auth);
	return (
		<Routes>
			<Route
				path="/client/auth"
				element={
					!loggedIn ? (
						<SimpleLeft />
					) : (
						<Navigate to="/client/search" />
					)
				}
			>
				<Route index element={<Navigate to="login" />} />
				<Route path="login" element={<ClientLogin />} />
				<Route path="register" element={<ClientRegister />} />
				<Route path="forgot" element={<ClientForgot />} />
				<Route path="firebaseAuth" element={<OTPAuth />} />
			</Route>
			<Route
				path="client"
				element={
					loggedIn && userType === "clinic" ? (
						<Navigate to="/clinic" />
					) : (
						<ClientHeader />
					)
				}
			>
				<Route index element={<Navigate to="auth" />} />
				<Route
					path="search"
					element={
						loggedIn ? <Search /> : <Navigate to="/client/auth" />
					}
				/>
				<Route
					path="profile"
					element={
						loggedIn ? (
							<ClientProfile />
						) : (
							<Navigate to="/client/auth" />
						)
					}
				/>
			</Route>
			<Route
				path="clinic"
				element={
					loggedIn && userType === "client" ? (
						<Navigate to="/client" />
					) : (
						<Outlet />
					)
				}
			>
				<Route index element={<Navigate to="auth" />} />
				<Route
					path="auth"
					element={
						!loggedIn ? (
							<SimpleRight />
						) : (
							<Navigate to="/clinic/dashboard" />
						)
					}
				>
					<Route index element={<Navigate to="login" />} />
					<Route path="login" element={<ClinicLogin />} />
					<Route path="register" element={<ClinicRegister />} />
					<Route path="forgot" element={<ClinicForgot />} />
				</Route>
				<Route
					path="dashboard"
					element={
						loggedIn ? (
							<DashboardLayout />
						) : (
							<Navigate to="/clinic/auth" />
						)
					}
				>
					<Route index element={<Navigate to="overview" />} />
					<Route path="overview" element={<Overview />} />
					<Route path="doctors" element={<Doctors />} />
					<Route path="equipments" element={<Equipments />} />
					<Route path="requests" element={<Requests />} />
					<Route path="profile" element={<ClinicProfile />} />
				</Route>
			</Route>
			<Route path="404" element={<Page404 />} />
			<Route index element={<Navigate to="/client/auth" />} />
			<Route path="*" element={<Navigate to="/404" replace />} />
		</Routes>
	);
};
export default Router;
