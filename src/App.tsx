import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";
// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";

// ----------------------------------------------------------------------

export default function App() {
	return (
		<HelmetProvider>
			<BrowserRouter>
				<ThemeProvider>
					<Router />
				</ThemeProvider>
			</BrowserRouter>
		</HelmetProvider>
	);
}
