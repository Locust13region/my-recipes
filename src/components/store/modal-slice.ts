import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { registration, login } from "./user-slice";
import {
	getRecipesCategories,
	getRecipesList,
	sendNewRecipe,
} from "./recipes-slice";

type TModalState = {
	isMessageOn: boolean;
	messageContent: string | undefined;
};
const initialState: TModalState = {
	isMessageOn: false,
	messageContent: undefined,
};

export const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		setMessageOn: (state, action: PayloadAction<string | undefined>) => {
			state.isMessageOn = true;
			state.messageContent = action.payload;
		},
		setMessageOff: (state) => {
			state.isMessageOn = false;
			state.messageContent = undefined;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registration.pending, (state, action) => {
				state.isMessageOn = true;
				state.messageContent = action.payload;
			})
			.addCase(registration.fulfilled, (state, action) => {
				state.isMessageOn = true;
				state.messageContent = action.payload;
			})
			.addCase(registration.rejected, (state, action) => {
				state.isMessageOn = true;
				state.messageContent =
					typeof action.payload === "string" ? action.payload : undefined;
			})
			.addCase(login.pending, (state, action) => {
				state.isMessageOn = true;
				state.messageContent = action.payload;
			})
			.addCase(login.fulfilled, (state) => {
				state.isMessageOn = false;
			})
			.addCase(login.rejected, (state, action) => {
				state.isMessageOn = true;
				state.messageContent =
					typeof action.payload === "string" ? action.payload : undefined;
			})
			.addCase(getRecipesCategories.pending, (state, action) => {
				state.isMessageOn = true;
				state.messageContent = action.payload;
			})
			.addCase(getRecipesCategories.fulfilled, (state) => {
				state.isMessageOn = false;
			})
			.addCase(getRecipesCategories.rejected, (state, action) => {
				state.isMessageOn = true;
				state.messageContent =
					typeof action.payload === "string" ? action.payload : undefined;
			})
			.addCase(getRecipesList.pending, (state, action) => {
				state.isMessageOn = true;
				state.messageContent = action.payload;
			})
			.addCase(getRecipesList.fulfilled, (state) => {
				state.isMessageOn = false;
			})
			.addCase(getRecipesList.rejected, (state, action) => {
				state.isMessageOn = true;
				state.messageContent =
					typeof action.payload === "string" ? action.payload : undefined;
			})
			.addCase(sendNewRecipe.pending, (state, action) => {
				state.isMessageOn = true;
				state.messageContent = action.payload;
			})
			.addCase(sendNewRecipe.fulfilled, (state) => {
				state.isMessageOn = false;
			})
			.addCase(sendNewRecipe.rejected, (state, action) => {
				state.isMessageOn = true;
				state.messageContent =
					typeof action.payload === "string" ? action.payload : undefined;
			});
	},
});

export const { setMessageOn, setMessageOff } = modalSlice.actions;
export default modalSlice.reducer;
