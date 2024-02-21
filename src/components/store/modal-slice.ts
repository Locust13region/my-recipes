import {
	createSlice,
	isFulfilled,
	isPending,
	isRejected,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import { registration, login } from "./user-slice";
// import {
// 	getFavoriteList,
// 	getRecipesCategories,
// 	getRecipesList,
// 	receiveRecipeDescription,
// 	receiveRecipeIngredients,
// 	receiveRecipeSteps,
// 	receiveTags,
// 	sendNewRecipe,
// 	sendNewTag,
// 	setToFavorites,
// } from "./recipes-slice";

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
			// .addCase(registration.pending, (state, action) => {
			// 	state.isMessageOn = true;
			// 	state.messageContent = action.payload;
			// })
			// .addCase(registration.fulfilled, (state, action) => {
			// 	state.isMessageOn = true;
			// 	state.messageContent = action.payload;
			// })
			// .addCase(registration.rejected, (state, action) => {
			// 	state.isMessageOn = true;
			// 	state.messageContent =
			// 		typeof action.payload === "string" ? action.payload : undefined;
			// })
			// .addCase(login.pending, (state, action) => {
			// 	state.isMessageOn = true;
			// 	state.messageContent = action.payload;
			// })
			// .addCase(login.fulfilled, (state) => {
			// 	state.isMessageOn = false;
			// })
			// .addCase(login.rejected, (state, action) => {
			// 	state.isMessageOn = true;
			// 	state.messageContent =
			// 		typeof action.payload === "string" ? action.payload : undefined;
			// })
			// // .addCase(getRecipesCategories.pending, (state, action) => {
			// // 	console.log("getRecipesCategories.pending");
			// // 	state.isMessageOn = true;
			// // 	state.messageContent = action.payload;
			// // })
			// .addCase(getRecipesCategories.fulfilled, (state) => {
			// 	state.isMessageOn = false;
			// })
			// .addCase(getRecipesCategories.rejected, (state, action) => {
			// 	state.isMessageOn = true;
			// 	state.messageContent =
			// 		typeof action.payload === "string" ? action.payload : undefined;
			// })
			// .addCase(getRecipesList.pending, (state, action) => {
			// 	state.isMessageOn = true;
			// 	state.messageContent = action.payload;
			// })
			// .addCase(getRecipesList.fulfilled, (state) => {
			// 	state.isMessageOn = false;
			// })
			// .addCase(getRecipesList.rejected, (state, action) => {
			// 	state.isMessageOn = true;
			// 	state.messageContent =
			// 		typeof action.payload === "string" ? action.payload : undefined;
			// })
			// .addCase(sendNewRecipe.pending, (state, action) => {
			// 	state.isMessageOn = true;
			// 	state.messageContent = action.payload;
			// })
			// .addCase(sendNewRecipe.fulfilled, (state) => {
			// 	state.isMessageOn = false;
			// })
			// .addCase(sendNewRecipe.rejected, (state, action) => {
			// 	state.isMessageOn = true;
			// 	state.messageContent =
			// 		typeof action.payload === "string" ? action.payload : undefined;
			// })
			// .addCase(sendNewTag.pending, (state, action) => {
			// 	state.isMessageOn = true;
			// 	state.messageContent = action.payload;
			// })
			// .addCase(sendNewTag.fulfilled, (state) => {
			// 	state.isMessageOn = false;
			// })
			// .addCase(sendNewTag.rejected, (state, action) => {
			// 	state.isMessageOn = true;
			// 	state.messageContent =
			// 		typeof action.payload === "string" ? action.payload : undefined;
			// })
			// .addCase(receiveTags.pending, (state, action) => {
			// 	state.isMessageOn = true;
			// 	state.messageContent = action.payload;
			// })
			// .addCase(receiveTags.fulfilled, (state) => {
			// 	state.isMessageOn = false;
			// })
			// .addCase(receiveTags.rejected, (state, action) => {
			// 	state.isMessageOn = true;
			// 	state.messageContent =
			// 		typeof action.payload === "string" ? action.payload : undefined;
			// })
			// .addCase(receiveRecipeDescription.pending, (state, action) => {
			// 	state.isMessageOn = true;
			// 	state.messageContent = action.payload;
			// })
			// .addCase(receiveRecipeDescription.fulfilled, (state) => {
			// 	state.isMessageOn = false;
			// })
			// .addCase(receiveRecipeDescription.rejected, (state, action) => {
			// 	state.isMessageOn = true;
			// 	state.messageContent =
			// 		typeof action.payload === "string" ? action.payload : undefined;
			// })
			// .addCase(receiveRecipeIngredients.pending, (state, action) => {
			// 	state.isMessageOn = true;
			// 	state.messageContent = action.payload;
			// })
			// .addCase(receiveRecipeIngredients.fulfilled, (state) => {
			// 	state.isMessageOn = false;
			// })
			// .addCase(receiveRecipeIngredients.rejected, (state, action) => {
			// 	state.isMessageOn = true;
			// 	state.messageContent =
			// 		typeof action.payload === "string" ? action.payload : undefined;
			// })
			// .addCase(receiveRecipeSteps.pending, (state, action) => {
			// 	state.isMessageOn = true;
			// 	state.messageContent = action.payload;
			// })
			// .addCase(receiveRecipeSteps.fulfilled, (state) => {
			// 	state.isMessageOn = false;
			// })
			// .addCase(receiveRecipeSteps.rejected, (state, action) => {
			// 	state.isMessageOn = true;
			// 	state.messageContent =
			// 		typeof action.payload === "string" ? action.payload : undefined;
			// })
			// .addCase(setToFavorites.pending, (state, action) => {
			// 	state.isMessageOn = true;
			// 	state.messageContent = action.payload;
			// })
			// .addCase(setToFavorites.fulfilled, (state) => {
			// 	state.isMessageOn = false;
			// })
			// .addCase(setToFavorites.rejected, (state, action) => {
			// 	state.isMessageOn = true;
			// 	state.messageContent =
			// 		typeof action.payload === "string" ? action.payload : undefined;
			// })
			// .addCase(getFavoriteList.pending, (state, action) => {
			// 	state.isMessageOn = true;
			// 	state.messageContent = action.payload;
			// })
			// .addCase(getFavoriteList.fulfilled, (state) => {
			// 	state.isMessageOn = false;
			// })
			// .addCase(getFavoriteList.rejected, (state, action) => {
			// 	state.isMessageOn = true;
			// 	state.messageContent =
			// 		typeof action.payload === "string" ? action.payload : undefined;
			// })
			.addMatcher(isPending, (state, action) => {
				state.isMessageOn = true;
				state.messageContent = action.payload;
			})
			.addMatcher(isFulfilled, (state) => {
				state.isMessageOn = false;
			})
			.addMatcher(isRejected, (state, action) => {
				state.isMessageOn = true;
				state.messageContent =
					typeof action.payload === "string" ? action.payload : undefined;
			});
	},
});

export const { setMessageOn, setMessageOff } = modalSlice.actions;
export default modalSlice.reducer;
