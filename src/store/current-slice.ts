import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IError {
	errorOccurred: boolean;
	errorStatus: string;
}
interface ICurrentState {
	drawerWidth: number;
	drawerMobileOpen: boolean;
	drawerIsClosing: boolean;
	category: number | null;
	apiError: IError;
}
const initialState: ICurrentState = {
	drawerWidth: 340,
	drawerMobileOpen: true,
	drawerIsClosing: false,
	category: null,
	apiError: {
		errorOccurred: false,
		errorStatus: "",
	},
};

const currentSlice = createSlice({
	name: "current",
	initialState,
	reducers: {
		drawerMobile: (state, action: PayloadAction<boolean>) => {
			state.drawerMobileOpen = action.payload;
		},
		drawerMobileToggle: (state) => {
			if (!state.drawerIsClosing) {
				state.drawerMobileOpen = !state.drawerMobileOpen;
			}
		},
		drawerClosing: (state, action: PayloadAction<boolean>) => {
			state.drawerIsClosing = action.payload;
		},
	},
});

export const { drawerMobile, drawerClosing, drawerMobileToggle } =
	currentSlice.actions;

export default currentSlice;
