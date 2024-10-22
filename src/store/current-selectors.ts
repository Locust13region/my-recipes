import { RootState } from "./store";

export const selectDrawerWidth = (state: RootState) =>
	state.current.drawerWidth;
export const selectDrawerMobileOpen = (state: RootState) =>
	state.current.drawerMobileOpen;
export const selectDrawerIsClosing = (state: RootState) =>
	state.current.drawerIsClosing;
