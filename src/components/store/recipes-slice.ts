import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	deleteFromFavorites,
	deleteRecipe,
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
import type { TRecipesState, TNewRecipe } from "../types/types";

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
	async (name: string, { rejectWithValue }) => {
		try {
			const response = await postNewTag(name);
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
export const sendNewRecipe = createAsyncThunk(
	"recipes/sendNewRecipe",
	async (newRecipe: TNewRecipe, { getState, rejectWithValue }) => {
		const { selectedTagValue } = getState() as TRecipesState;
		const selectedTag = selectedTagValue?.id ? selectedTagValue.id : null;
		try {
			const response = await postNewRecipe(newRecipe, selectedTag);
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
export const getFavoritesList = createAsyncThunk(
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
export const removeFromFavorites = createAsyncThunk(
	"recipe/removeFavorite",
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await deleteFromFavorites(id);
			if (!response.ok) {
				return rejectWithValue("Не удалён из избранного.");
			}
			return;
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
export const removeRecipe = createAsyncThunk(
	"recipes/removeRecipe",
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await deleteRecipe(id);
			if (!response.ok) {
				return rejectWithValue("Рецепт не удален.");
			}

			return;
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
	favoritesList: [],
	isEditMode: false,
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
		setEditMode: (state, action) => {
			state.isEditMode = action.payload;
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
			})
			.addCase(getFavoritesList.fulfilled, (state, action) => {
				state.favoritesList = action.payload;
			})
			.addCase(removeFromFavorites.fulfilled, (state, action) => {
				state.favoritesList = state.favoritesList.filter(
					(item) => item.id !== Number(action.meta.arg)
				);
			})
			.addCase(removeRecipe.fulfilled, (state, action) => {
				state.categoryList = state.categoryList.filter(
					(item) => item.id !== Number(action.meta.arg)
				);
			});
	},
});

export const { setSelectedTagValue, clearSelectedTagValue, setEditMode } =
	recipesSlice.actions;
export default recipesSlice.reducer;
