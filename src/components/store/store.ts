import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modal-slice";
import userSlice from "./user-slice";
import recipesSlice from "./recipes-slice";

export const store = configureStore({
	reducer: {
		modalState: modalSlice,
		userState: userSlice,
		recipesState: recipesSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
