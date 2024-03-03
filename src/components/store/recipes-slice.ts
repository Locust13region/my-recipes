import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	deleteFromFavorites,
	deleteFromWishlist,
	deleteRecipe,
	deleteRecipeIngredients,
	deleteRecipeSteps,
	getCategories,
	getCategoryList,
	getFavorites,
	getRecipeDescription,
	getRecipeIngredients,
	getRecipeSteps,
	getTags,
	getWishlist,
	postNewRecipe,
	postNewRecipeIngredient,
	postNewRecipeStep,
	postNewTag,
	postToFavorites,
	postToWishlist,
	putRecipeIngredient,
	putRecipeStep,
	putReorderedRecipeIngredients,
	putReorderedRecipeSteps,
	putUpdatedRecipeDescription,
} from "../services/api-request";
import type { TRecipesState, TNewRecipe } from "../types/types";
import { RootState } from "./store";

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
			console.log(error);
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
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
			console.log(error);
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
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
			console.log(error);
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
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
			console.log(error);
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
		}
	}
);
export const sendNewRecipe = createAsyncThunk(
	"recipes/sendNewRecipe",
	async (newRecipe: TNewRecipe, { getState, rejectWithValue }) => {
		const { recipesState } = getState() as RootState;
		const { selectedTagValue } = recipesState;
		const selectedTag = selectedTagValue?.id ? selectedTagValue.id : null;
		try {
			const response = await postNewRecipe(newRecipe, selectedTag);
			if (!response.ok) {
				return rejectWithValue("Рецепт не отправлен.");
			}
			return await response.json();
		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
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
			console.log(error);
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
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
			console.log(error);
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
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
			console.log(error);
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
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
			console.log(error);
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
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
			console.log(error);
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
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
			console.log(error);
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
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
			console.log(error);
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
		}
	}
);
export const updateRecipeDescription = createAsyncThunk(
	"recipes/updateRecipeDescription",
	async (_, { getState, rejectWithValue }) => {
		const { recipesState } = getState() as RootState;
		const { selectedTagValue } = recipesState;
		const selectedTag = selectedTagValue?.id ? selectedTagValue.id : null;
		try {
			const response = await putUpdatedRecipeDescription(
				recipesState.editableRecipeDescription!,
				selectedTag || null
			);
			if (!response.ok) {
				return rejectWithValue("Рецепт не обновлен.");
			}
			return await response.json();
		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
		}
	}
);
export const updateRecipeIngredient = createAsyncThunk(
	"recipes/updateRecipeIngredient",
	async (
		updatedIngredient: { id: number; name: string },
		{ rejectWithValue }
	) => {
		const { id, name } = updatedIngredient;
		try {
			const response = await putRecipeIngredient(id, name);
			if (!response.ok) {
				return rejectWithValue("Ингредиент не обновлен.");
			}
			return await response.json();
		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
		}
	}
);
export const updateRecipeStep = createAsyncThunk(
	"recipes/updateRecipeStep",
	async (updatedStep: { id: number; text: string }, { rejectWithValue }) => {
		const { id, text } = updatedStep;
		try {
			const response = await putRecipeStep(id, text);
			if (!response.ok) {
				return rejectWithValue("Этап не обновлен.");
			}
			return await response.json();
		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
		}
	}
);
export const removeRecipeIngredient = createAsyncThunk(
	"recipes/removeRecipeIngredient",
	async (id: number, { rejectWithValue }) => {
		try {
			const response = await deleteRecipeIngredients(id);
			if (!response.ok) {
				return rejectWithValue("Ингредиент не удалён.");
			}
			return;
		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
		}
	}
);
export const removeRecipeStep = createAsyncThunk(
	"recipes/removeRecipeStep",
	async (id: number, { rejectWithValue }) => {
		try {
			const response = await deleteRecipeSteps(id);
			if (!response.ok) {
				return rejectWithValue("Этап не удалён.");
			}
			return;
		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
		}
	}
);
export const addNewRecipeIngredient = createAsyncThunk(
	"recipes/addNewRecipeIngredient",
	async (recipeId: string, { rejectWithValue }) => {
		try {
			const response = await postNewRecipeIngredient(recipeId);
			if (!response.ok) {
				return rejectWithValue("Ингредиент не добавлен.");
			}
			return await response.json();
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
		}
	}
);
export const addNewRecipeStep = createAsyncThunk(
	"recipes/addNewRecipeStep",
	async (recipeId: string, { rejectWithValue }) => {
		try {
			const response = await postNewRecipeStep(recipeId);
			if (!response.ok) {
				return rejectWithValue("Этап не добавлен.");
			}
			return await response.json();
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
		}
	}
);
export const sendReorderedRecipeIngredients = createAsyncThunk(
	"recipes/sendReorderedRecipeIngredients",
	async (
		reorderedIngredients: { recipeId: number; ids: number[] },
		{ rejectWithValue }
	) => {
		const { recipeId, ids } = reorderedIngredients;
		try {
			const response = await putReorderedRecipeIngredients(recipeId, ids);
			if (!response.ok) {
				return rejectWithValue("Сортировка ингредиентов не сохранена.");
			}
			return;
		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
		}
	}
);
export const sendReorderedRecipeSteps = createAsyncThunk(
	"recipes/sendReorderedRecipeSteps",
	async (
		reorderedSteps: { recipeId: number; ids: number[] },
		{ rejectWithValue }
	) => {
		const { recipeId, ids } = reorderedSteps;
		try {
			const response = await putReorderedRecipeSteps(recipeId, ids);
			if (!response.ok) {
				return rejectWithValue("Сортировка этапов не сохранена.");
			}
			return;
		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
		}
	}
);
export const sendToWishlist = createAsyncThunk(
	"recipes/sendToWishlist",
	async (_, { getState, rejectWithValue }) => {
		const { recipesState } = getState() as RootState;
		const { wishlist } = recipesState;
		const requests = wishlist.map((item) => postToWishlist(item.id));
		try {
			const responses = await Promise.all(requests);
			responses.forEach((response: Response) => {
				if (!response.ok) {
					return rejectWithValue("Не удалось сохранить список покупок.");
				}
			});
			return;
		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
		}
	}
);
export const removeFromWishlist = createAsyncThunk(
	"recipes/removeFromShoppingList",
	async (ingredientId: number, { rejectWithValue }) => {
		try {
			const response = await deleteFromWishlist(ingredientId);
			if (!response.ok) {
				return rejectWithValue("Ингредиент не удалён.");
			}
			return;
		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
		}
	}
);
export const receiveRecipeShoppingList = createAsyncThunk(
	"recipes/receiveRecipeShoppingList",
	async (_, { rejectWithValue }) => {
		try {
			const response = await getWishlist();
			if (!response.ok) {
				return rejectWithValue("Список не получен.");
			}
			return await response.json();
		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
		}
	}
);
export const clearWishlist = createAsyncThunk(
	"recipes/clearWishlist",
	async (_, { getState, rejectWithValue }) => {
		const { recipesState } = getState() as RootState;
		const { wishlist } = recipesState;
		const requests = Array.from(new Set(wishlist.map((i) => i.id))).map(
			(item) => deleteFromWishlist(item)
		);
		try {
			const responses = await Promise.all(requests);
			responses.forEach((response: Response) => {
				if (!response.ok) {
					return rejectWithValue("Не удалось очистить список покупок.");
				}
			});
			return;
		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
		}
	}
);
export const clearFavoritesList = createAsyncThunk(
	"recipes/clearFavoritesList",
	async (_, { getState, rejectWithValue }) => {
		const { recipesState } = getState() as RootState;
		const { favoritesList } = recipesState;
		const requests = favoritesList.map((i) =>
			deleteFromFavorites(String(i.id))
		);
		try {
			const responses = await Promise.all(requests);
			responses.forEach((response: Response) => {
				if (!response.ok) {
					return rejectWithValue(
						"Не удалось очистить список избранных рецептов."
					);
				}
			});
			return;
		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
		}
	}
);

const initialState: TRecipesState = {
	categories: [],
	categoryList: [],
	tags: [],
	selectedTagValue: null,
	currentRecipeDescription: null,
	editableRecipeDescription: null,
	currentRecipeIngredients: [],
	currentRecipeSteps: [],
	favoritesList: [],
	wishlist: [],
	isEditMode: false,
	recipeFieldErrorText: "",
};

export const recipesSlice = createSlice({
	name: "recipes",
	initialState,
	reducers: {
		setSelectedTagValue: (state, action) => {
			state.selectedTagValue = action.payload;
		},
		clearSelectedTagValue: (state, action) => {
			state.selectedTagValue = action.payload;
		},
		setEditMode: (state, action) => {
			state.isEditMode = action.payload;
		},
		setEditableRecipeDescription: (state, action) => {
			state.editableRecipeDescription = {
				...state.editableRecipeDescription,
				...action.payload,
			};
		},
		setRecipeFieldErrorText: (state, action) => {
			state.recipeFieldErrorText = action.payload;
		},
		setCurrentRecipeIngredientsOrder: (state, action) => {
			state.currentRecipeIngredients = action.payload;
		},
		setCurrentRecipeStepsOrder: (state, action) => {
			state.currentRecipeSteps = action.payload;
		},
		placeToShoppingList: (state, action) => {
			state.wishlist.push(action.payload);
		},
		displaceFromShoppingList: (state, action) => {
			state.wishlist = state.wishlist.filter(
				(item) => item.id !== action.payload.id
			);
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
				state.editableRecipeDescription = null;
				state.selectedTagValue = null;
				state.tags = [];
				state.currentRecipeIngredients = [];
				state.currentRecipeSteps = [];
				state.wishlist = [];
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
				state.editableRecipeDescription = action.payload;
			})
			.addCase(receiveRecipeIngredients.fulfilled, (state, action) => {
				state.currentRecipeIngredients = action.payload;
				state.wishlist = [];
			})
			.addCase(receiveRecipeSteps.fulfilled, (state, action) => {
				state.currentRecipeSteps = action.payload;
			})
			.addCase(getFavoritesList.fulfilled, (state, action) => {
				state.favoritesList = action.payload;
				state.currentRecipeDescription = null;
				state.editableRecipeDescription = null;
				state.selectedTagValue = null;
				state.tags = [];
				state.currentRecipeIngredients = [];
				state.currentRecipeSteps = [];
				state.wishlist = [];
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
			})
			.addCase(updateRecipeDescription.pending, (state) => {
				state.isEditMode = false;
			})
			.addCase(updateRecipeDescription.fulfilled, (state, action) => {
				state.currentRecipeDescription!.name = action.payload.name;
				state.currentRecipeDescription!.categoryId = action.payload.categoryId;
				state.currentRecipeDescription!.tags = state.selectedTagValue
					? [state.selectedTagValue]
					: [];
				state.currentRecipeDescription!.source = action.payload.source;
				state.currentRecipeDescription!.description =
					action.payload.description;
				//////////////////////////////ADD TAG UPDATE////////////////////////
			})
			.addCase(updateRecipeIngredient.fulfilled, (state, action) => {
				state.currentRecipeIngredients = state.currentRecipeIngredients.map(
					(item) => {
						if (item.id === action.payload?.id) {
							return { ...item, ...action.payload };
						}
						return item;
					}
				);
			})
			.addCase(updateRecipeStep.fulfilled, (state, action) => {
				state.currentRecipeSteps = state.currentRecipeSteps.map((item) => {
					if (item.id === action.payload?.id) {
						return { ...item, ...action.payload };
					}
					return item;
				});
			})
			.addCase(removeRecipeIngredient.fulfilled, (state, action) => {
				state.currentRecipeIngredients = state.currentRecipeIngredients.filter(
					(item) => {
						return item.id !== action.meta.arg;
					}
				);
			})
			.addCase(removeRecipeStep.fulfilled, (state, action) => {
				state.currentRecipeSteps = state.currentRecipeSteps.filter((item) => {
					return item.id !== action.meta.arg;
				});
			})
			.addCase(addNewRecipeIngredient.fulfilled, (state, action) => {
				state.currentRecipeIngredients.push(action.payload);
			})
			.addCase(addNewRecipeStep.fulfilled, (state, action) => {
				state.currentRecipeSteps.push(action.payload);
			})
			.addCase(receiveRecipeShoppingList.fulfilled, (state, action) => {
				state.wishlist = action.payload;
			})
			.addCase(clearWishlist.fulfilled, (state) => {
				state.wishlist = [];
			})
			.addCase(clearFavoritesList.fulfilled, (state) => {
				state.favoritesList = [];
			})
			.addCase(removeFromWishlist.fulfilled, (state, action) => {
				state.wishlist = state.wishlist.filter((item) => {
					return item.id !== action.meta.arg;
				});
			});
	},
});

export const {
	setSelectedTagValue,
	clearSelectedTagValue,
	setEditMode,
	setEditableRecipeDescription,
	setRecipeFieldErrorText,
	setCurrentRecipeIngredientsOrder,
	setCurrentRecipeStepsOrder,
	placeToShoppingList,
	displaceFromShoppingList,
} = recipesSlice.actions;
export default recipesSlice.reducer;
