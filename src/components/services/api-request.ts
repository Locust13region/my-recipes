import type { TCredentials, TNewRecipe, TRecipe } from "../types/types";

const urlBase = "https://recipes-api.somee.com/";
const urlRegistration = urlBase + "register";
const urlLogin = urlBase + "login";
const urlRefreshToken = urlBase + "refresh";
const urlCategories = urlBase + "categories";
const urlCategoryList = urlBase + "recipes?categoryId=";
const urlNewRecipe = urlBase + "recipes";
const urlTag = urlBase + "tags/";
const urlRecipe = urlBase + "recipes/";
const urlIngredients = urlBase + "ingredients?RecipeId=";
const urlSteps = urlBase + "steps?RecipeId=";
const urlGetFavorites = urlBase + "recipes?IsFavourite=true";
const urlPostFavorites = urlBase + "favourites";
const urlDeleteFavorites = urlBase + "favourites/";

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
	return await fetch(urlCategories);
};
export const getPath = (suffix: string) => {
	return urlBase + suffix;
};

export const getCategoryList = async (categoryId: number) => {
	return await fetch(urlCategoryList + categoryId, {
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
export const putUpdatedRecipeDescription = async (updatedRecipe: TRecipe) => {
	const { id, name, categoryId, tags, source, description } = updatedRecipe;
	return await fetch(urlRecipe + id, {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${getAccessToken()}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name, categoryId, tags, source, description }),
	});
};
