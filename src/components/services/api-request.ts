import type { TCredentials, TNewRecipe, TRecipe } from "../types/types";

const urlBase = "https://recipes-api.somee.com/";
const urlRegistration = urlBase + "register";
const urlLogin = urlBase + "login";
const urlRefreshToken = urlBase + "refresh";
const urlCategories = urlBase + "categories";
const urlCategoryList = urlBase + "recipes?categoryId=";
const urlUsers = urlBase + "users";
const urlNewRecipe = urlBase + "recipes";
const urlRecipe = urlBase + "recipes/";
const urlTag = urlBase + "tags/";
const urlIngredients = urlBase + "ingredients?RecipeId=";
const urlIngredient = urlBase + "ingredients/";
const urlSteps = urlBase + "steps?RecipeId=";
const urlStep = urlBase + "steps/";
const urlGetFavorites = urlBase + "recipes?IsFavourite=true";
const urlPostFavorites = urlBase + "favourites";
const urlDeleteFavorites = urlBase + "favourites/";
const urlWishlist = urlBase + "wishlist/";

export enum UrlUser {
	REGISTRATION = urlRegistration,
	LOGIN = urlLogin,
}
function getAccessToken() {
	const userLocalStorage = localStorage.getItem("_recipes");
	if (userLocalStorage) {
		const { accessToken } = JSON.parse(userLocalStorage);
		return accessToken;
	} else {
		return null;
	}
}
export const userRequest = async (credentials: TCredentials, url: UrlUser) => {
	return await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ ...credentials }),
	});
};
export const tokenRefresh = async (refreshToken: string) => {
	return await fetch(urlRefreshToken, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ refreshToken: refreshToken }),
	});
};
export const getCategories = async () => {
	return await fetch(urlCategories, { mode: "cors" });
};
export const getPath = (suffix: string) => {
	return urlBase + suffix;
};
export const getCategoryList = async (
	categoryId: number,
	filterSearch: string,
	filterTagIds: string,
	filterUsers: string
) => {
	console.log(
		urlCategoryList +
			categoryId +
			(filterSearch ? `&Search=${filterSearch}` : "") +
			(filterTagIds ? `&TagIds=${filterTagIds}` : "") +
			(filterUsers ? `&UserIds=${filterUsers}` : "")
	);
	return await fetch(
		urlCategoryList +
			categoryId +
			(filterSearch ? `&Search=${filterSearch}` : "") +
			(filterTagIds ? `&TagIds=${filterTagIds}` : "") +
			(filterUsers ? `&UserIds=${filterUsers}` : ""),
		{
			headers: {
				mode: "cors",
				Authorization: `Bearer ${getAccessToken()}`,
			},
		}
	);
};
export const getUsersList = async () => {
	return await fetch(urlUsers, {
		headers: {
			Authorization: `Bearer ${getAccessToken()}`,
		},
	});
};
export const getTags = async () => {
	return await fetch(urlTag, {
		headers: {
			Authorization: `Bearer ${getAccessToken()}`,
		},
	});
};
export const postNewTag = async (name: string) => {
	return await fetch(urlTag, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${getAccessToken()}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name }),
	});
};
export const postNewRecipe = async (
	newRecipe: TNewRecipe,
	tag: number | null
) => {
	const tagsArray = tag ? [tag] : [];
	return await fetch(urlNewRecipe, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${getAccessToken()}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ ...newRecipe, tagIds: tagsArray }),
	});
};
export const getRecipeDescription = async (recipeId: string) => {
	return await fetch(urlRecipe + recipeId, {
		headers: {
			Authorization: `Bearer ${getAccessToken()}`,
		},
	});
};
export const getRecipeIngredients = async (recipeId: string) => {
	return await fetch(urlIngredients + recipeId, {
		headers: {
			Authorization: `Bearer ${getAccessToken()}`,
		},
	});
};
export const getRecipeSteps = async (recipeId: string) => {
	return await fetch(urlSteps + recipeId, {
		headers: {
			Authorization: `Bearer ${getAccessToken()}`,
		},
	});
};
export const postToFavorites = async (recipeId: string) => {
	return await fetch(urlPostFavorites, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${getAccessToken()}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ recipeId }),
	});
};
export const getFavorites = async () => {
	return await fetch(urlGetFavorites, {
		headers: {
			Authorization: `Bearer ${getAccessToken()}`,
		},
	});
};
export const deleteFromFavorites = async (recipeId: string) => {
	return await fetch(urlDeleteFavorites + recipeId, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${getAccessToken()}`,
		},
	});
};
export const deleteRecipe = async (recipeId: string) => {
	return await fetch(urlRecipe + recipeId, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${getAccessToken()}`,
		},
	});
};
export const putUpdatedRecipeDescription = async (
	updatedRecipe: TRecipe,
	tag: number | null
) => {
	const tagIds = tag ? [tag] : [];
	const { id, name, categoryId, source, description } = updatedRecipe;
	return await fetch(urlRecipe + id, {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${getAccessToken()}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name, categoryId, tagIds, source, description }),
	});
};
export const putRecipeIngredient = async (id: number, name: string) => {
	return await fetch(urlIngredient + id, {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${getAccessToken()}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name }),
	});
};
export const putRecipeStep = async (id: number, text: string) => {
	return await fetch(urlStep + id, {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${getAccessToken()}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ text }),
	});
};
export const deleteRecipeIngredients = async (id: number) => {
	return await fetch(urlIngredient + id, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${getAccessToken()}`,
		},
	});
};
export const deleteRecipeSteps = async (id: number) => {
	return await fetch(urlStep + id, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${getAccessToken()}`,
		},
	});
};
export const postNewRecipeIngredient = async (recipeId: string) => {
	return await fetch(urlIngredient, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${getAccessToken()}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ recipeId, name: "Новый ингредиент" }),
	});
};
export const postNewRecipeStep = async (recipeId: string) => {
	return await fetch(urlStep, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${getAccessToken()}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ recipeId, text: "Новый этап" }),
	});
};
export const putReorderedRecipeIngredients = async (
	recipeId: number,
	ids: number[]
) => {
	return await fetch(urlIngredient + "order", {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${getAccessToken()}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ recipeId, ids }),
	});
};
export const putReorderedRecipeSteps = async (
	recipeId: number,
	ids: number[]
) => {
	return await fetch(urlStep + "order", {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${getAccessToken()}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ recipeId, ids }),
	});
};
export const getWishlist = async () => {
	return await fetch(urlWishlist, {
		headers: {
			Authorization: `Bearer ${getAccessToken()}`,
		},
	});
};
export const postToWishlist = async (ingredientId: number) => {
	return await fetch(urlWishlist, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${getAccessToken()}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ ingredientId }),
	});
};
export const deleteFromWishlist = async (id: number) => {
	return await fetch(urlWishlist + id, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${getAccessToken()}`,
			"Content-Type": "application/json",
		},
	});
};
