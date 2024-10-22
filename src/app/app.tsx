import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { theme } from "../theme/theme";
import MainLayout from "./main-layout";
import CssBaseline from "@mui/material/CssBaseline";

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<MainLayout />;
		</ThemeProvider>
	);
}
