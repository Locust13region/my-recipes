import type { TCredentials, TNewRecipePostArgs } from "../types/types";

// const urlBase = "http://localhost:5000/";
const urlBase = "https://recipes-api.somee.com/";
const urlRegistration = urlBase + "register";
const urlLogin = urlBase + "login";
const urlRefreshToken = urlBase + "refresh";
const urlCategories = urlBase + "сategories";
const urlCategoryList = urlBase + "recipes?categoryId=";
const urlNewRecipe = urlBase + "recipes";

export enum UrlUser {
	REGISTRATION = urlRegistration,
	LOGIN = urlLogin,
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

export const getCategoryList = async (
	accessToken: string,
	categoryId: number
) => {
	return await fetch(urlCategoryList + categoryId, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const postNewRecipe = async (newRecipePostArgs: TNewRecipePostArgs) => {
	const { accessToken, newRecipe } = newRecipePostArgs;
	return await fetch(urlNewRecipe, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newRecipe),
	});
};
