export type TCredentials = {
	email: string;
	password: string;
};
export type TUserState = {
	user: {
		username: string;
		tokenType: string;
		accessToken: string;
		expiresIn: number;
		tokenTimestamp: number;
		refreshToken: string;
	};
};
export type TCategories = {
	id: number;
	name: string;
	image: string;
};
export type TIngredients = {
	name: string;
	description?: string;
};
export type TStep = {
	text: string;
};
export type TRecipe = {
	id: number;
	categoryId: number;
	tag: string;
	name: string;
	image: string;
	description: string;
	ingredients: TIngredients[];
	steps: TStep[];
};
export type TNewRecipe = {
	categoryId: number;
	// tag: string;
	name: string;
	image: string;
	description: string;
	ingredients: TIngredients[];
	steps: TStep[];
};
export type TRecipesState = {
	categories: TCategories[];
	categoryList: TRecipe[];
};
export type TAccessListArgs = {
	accessToken: string;
	categoryId: number;
};
export type TNewRecipePostArgs = {
	accessToken: string;
	newRecipe: TNewRecipe;
};
