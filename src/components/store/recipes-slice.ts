import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	getCategories,
	getCategoryList,
	getFavorites,
	getRecipeDescription,
	getRecipeIngredients,
	getRecipeSteps,
	getTags,
	postNewRecipe,
	postNewTag,
	postToFavorites,
} from "../services/api-request";
import type {
	TRecipesState,
	TNewRecipePostArgs,
	TNewTagArgs,
} from "../types/types";
import { RootState } from "@reduxjs/toolkit/query";

export const getRecipesCategories = createAsyncThunk(
	"recipes/getCategories",
	async (_, { rejectWithValue }) => {
		try {
			const response = await getCategories();
			if (!response.ok) {
				return rejectWithValue("Список не получен.");
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
	async (categoryId: number, { rejectWithValue }) => {
		try {
			const response = await getCategoryList(categoryId);
			if (!response.ok) {
				return rejectWithValue("Список не получен.");
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

export const receiveTags = createAsyncThunk(
	"recipes/receiveTags",
	async (_, { rejectWithValue }) => {
		try {
			const response = await getTags();
			if (!response.ok) {
				return rejectWithValue("Теги не получены.");
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

export const sendNewTag = createAsyncThunk(
	"recipes/sendNewTag",
	async (newTagArgs: TNewTagArgs, { rejectWithValue }) => {
		try {
			const response = await postNewTag(newTagArgs);
			if (!response.ok) {
				return rejectWithValue("Новый тег не отправлен.");
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
	"recipes/sendNewRecipe",
	async (
		newRecipePostArgs: TNewRecipePostArgs,
		{ getState, rejectWithValue }
	) => {
		const state = getState() as RootState;
		try {
			const response = await postNewRecipe(newRecipePostArgs, [
				state.recipesState.selectedTagValue.id,
			]);
			if (!response.ok) {
				console.log(response.statusText);
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
export const receiveRecipeDescription = createAsyncThunk(
	"recipes/receiveRecipeDescription",
	async (recipeId: string, { rejectWithValue }) => {
		try {
			const response = await getRecipeDescription(recipeId);
			if (!response.ok) {
				return rejectWithValue("Рецепт не получен.");
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

export const receiveRecipeIngredients = createAsyncThunk(
	"recipe/receiveRecipeIngredients",
	async (recipeId: string, { rejectWithValue }) => {
		try {
			const response = await getRecipeIngredients(recipeId);
			if (!response.ok) {
				return rejectWithValue("Ингредиенты не получены.");
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

export const receiveRecipeSteps = createAsyncThunk(
	"recipes/receiveRecipeSteps",
	async (recipeId: string, { rejectWithValue }) => {
		try {
			const response = await getRecipeSteps(recipeId);
			if (!response.ok) {
				return rejectWithValue("Этапы не получены.");
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

export const setToFavorites = createAsyncThunk(
	"recipes/setToFavorites",
	async (recipeId: string, { rejectWithValue }) => {
		try {
			const response = await postToFavorites(recipeId);
			if (!response.ok) {
				return rejectWithValue(
					"Не удалось включить рецепт в список избранных."
				);
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

export const getFavoriteList = createAsyncThunk(
	"recipes/getFavoriteList",
	async (_, { rejectWithValue }) => {
		try {
			const response = await getFavorites();
			if (!response.ok) {
				return rejectWithValue("Список не получен.");
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
	tags: [],
	selectedTagValue: null,
	currentRecipeDescription: null,
	currentRecipeIngredients: [],
	currentRecipeSteps: [],
};

export const recipesSlice = createSlice({
	name: "recipes",
	initialState,
	reducers: {
		setSelectedTagValue: (state, action) => {
			state.selectedTagValue = action.payload;
		},
		clearSelectedTagValue: (state) => {
			state.selectedTagValue = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getRecipesCategories.fulfilled, (state, action) => {
				state.categoryList = [];
				state.categories = action.payload;
			})
			.addCase(getRecipesList.fulfilled, (state, action) => {
				state.categoryList = action.payload;
				state.currentRecipeDescription = null;
				state.currentRecipeIngredients = [];
				state.currentRecipeSteps = [];
			})
			.addCase(sendNewTag.fulfilled, (state, action) => {
				console.log(action.payload);
				state.tags.push(action.payload);
				state.selectedTagValue = action.payload;
			})
			.addCase(receiveTags.fulfilled, (state, action) => {
				state.tags = action.payload;
			})
			.addCase(receiveRecipeDescription.fulfilled, (state, action) => {
				state.currentRecipeDescription = action.payload;
			})
			.addCase(receiveRecipeIngredients.fulfilled, (state, action) => {
				state.currentRecipeIngredients = action.payload;
			})
			.addCase(receiveRecipeSteps.fulfilled, (state, action) => {
				state.currentRecipeSteps = action.payload;
			});
	},
});

export const { setSelectedTagValue, clearSelectedTagValue } =
	recipesSlice.actions;
export default recipesSlice.reducer;
