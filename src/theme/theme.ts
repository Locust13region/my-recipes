import createTheme from "@mui/material/styles/createTheme";

export const theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 414,
			md: 768,
			lg: 1200,
			xl: 1536,
		},
	},
});
