import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";
// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
//
import secureLocalStorage from "react-secure-storage";
import { useAppDispatch } from "./store";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { doc, getDoc } from "@firebase/firestore";
import { ClinicUserObject, login, UserObject } from "./slices/authSlice";
import { Box, CircularProgress } from "@mui/material";

// ----------------------------------------------------------------------

export default function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useAppDispatch();
	useEffect(() => {
		try {
			const email = secureLocalStorage.getItem("email") as string;
			const type = secureLocalStorage.getItem("userType") as
				| "client"
				| "clinic";
			if (email && type) {
				const ref = doc(
					db,
					type[0].toUpperCase() + type.slice(1) + " Record",
					email
				);
				getDoc(ref).then((docSnap) => {
					if (docSnap.exists()) {
						const userData = docSnap.data() as
							| UserObject
							| ClinicUserObject;
						dispatch(login({ userType: type, user: userData }));
					} else {
						console.log(
							"You weren't supposed to be able to do this."
						);
					}
					setLoaded(true);
				});
			} else {
				setLoaded(true);
			}
		} catch (error) {
			console.error(error);
		}
	}, []);

	return loaded ? (
		<HelmetProvider>
			<BrowserRouter>
				<ThemeProvider>
					<Router />
				</ThemeProvider>
			</BrowserRouter>
		</HelmetProvider>
	) : (
		<Box
			sx={{
				alignItems: "center",
				justifyContent: "center",
				flex: "1",
				height: "100vh",
				display: "flex",
			}}
		>
			<CircularProgress size={80} color="primary" />
		</Box>
	);
}
