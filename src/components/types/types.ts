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
	// description?: string;
};
export type TStep = {
	text: string;
};
export type TTag = {
	inputValue?: string;
	id?: number;
	name: string;
};

export type TRecipe = {
	id: number;
	name: string;
	source: string;
	description: string;
	categoryId: number;
	isOwned: boolean;
	isFavourite: boolean;
	owner: {
		id: string;
		email: string;
	};
	userId: string;
	categoryName: string;
	tags: TTag[];
};

export type TNewRecipe = {
	categoryId: number;
	name: string;
	source: string;
	description: string;
	ingredients: TIngredients[];
	steps: TStep[];
};
export type TRecipesState = {
	categories: TCategories[];
	categoryList: TRecipe[];
	tags: TTag[];
	selectedTagValue: TTag | null;
	currentRecipeDescription: TRecipe | null;
	editableRecipeDescription: TRecipe | null;
	currentRecipeIngredients: TRecipeIngredients[];
	currentRecipeSteps: TRecipeSteps[];
	favoritesList: TRecipe[];
	isEditMode: boolean;
	recipeFieldErrorText: string;
};
export type TRecipeIngredients = {
	id: number;
	name: string;
	order: number;
	recipeId: number;
};
export type TRecipeSteps = {
	id: number;
	text: string;
	order: number;
};
