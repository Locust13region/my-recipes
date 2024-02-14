import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	getCategories,
	getCategoryList,
	postNewRecipe,
} from "../services/api-request";
import type {
	TAccessListArgs,
	TRecipesState,
	TNewRecipePostArgs,
} from "../types/types";

export const getRecipesCategories = createAsyncThunk(
	"recipes/getCategories",
	async (_, { rejectWithValue }) => {
		try {
			const response = await getCategories();
			if (!response.ok) {
				return rejectWithValue("Список не получен");
			}
			return await response.json();
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
			console.log(error);
		}
	}
);

export const getRecipesList = createAsyncThunk(
	"recipes/getRecipesList",
	async (accessListArgs: TAccessListArgs, { rejectWithValue }) => {
		const { accessToken, categoryId } = accessListArgs;
		try {
			const response = await getCategoryList(accessToken, categoryId);
			if (!response.ok) {
				return rejectWithValue("Список не получен");
			}
			return await response.json();
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
			console.log(error);
		}
	}
);
export const sendNewRecipe = createAsyncThunk(
	"recipes/postNewRecipe",
	async (newRecipePostArgs: TNewRecipePostArgs, { rejectWithValue }) => {
		try {
			const response = await postNewRecipe(newRecipePostArgs);
			console.log(await response.json());
			if (!response.ok) {
				return rejectWithValue("Рецепт не отправлен.");
			}
			return await response.json();
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
			console.log(error);
		}
	}
);

const initialState: TRecipesState = {
	categories: [],
	categoryList: [],
};

export const recipesSlice = createSlice({
	name: "recipes",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getRecipesCategories.fulfilled, (state, action) => {
				state.categories = action.payload;
			})
			.addCase(getRecipesList.fulfilled, (state, action) => {
				state.categoryList = action.payload;
			});
	},
});

// export const {} = recipesSlice.actions;
export default recipesSlice.reducer;
