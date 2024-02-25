import React from "react";
import ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import { store } from "./components/store/store.ts";
import { Provider } from "react-redux";
import WithAuth from "./components/hoc/with-auth.tsx";
import Main from "./components/pages/main.tsx";
import SignIn from "./components/pages/signin.tsx";
import SignUp from "./components/pages/signup.tsx";
import Spinner from "./components/pages/spinner.tsx";
import RecipesList from "./components/pages/recipes-list.tsx";
import NewRecipe from "./components/pages/new-recipe.tsx";
import Recipe from "./components/pages/recipe.tsx";
import RecipeDescription from "./components/pages/recipe-description.tsx";
import RecipeIngredients from "./components/pages/recipe-ingredients.tsx";
import RecipeSteps from "./components/pages/recipe-steps.tsx";
import Favorites from "./components/pages/favorites.tsx";
import ShoppingList from "./components/pages/shopping-list.tsx";

import "./index.css";
import EditRecipe from "./components/pages/edit-recipe.tsx";

const router = createBrowserRouter(
	[
		{
			path: "/",
			element: <Main />,
		},
		{
			path: "signin",
			element: <SignIn />,
		},
		{
			path: "signup",
			element: <SignUp />,
		},
		{
			path: ":id",
			element: (
				<WithAuth>
					<RecipesList />
				</WithAuth>
			),
		},
		{
			path: ":categoryId/:id",
			element: (
				<WithAuth>
					<Recipe />
				</WithAuth>
			),
			children: [
				{
					index: true,
					element: <RecipeDescription />,
				},
				{
					path: "/:categoryId/:id/ingredients",
					element: <RecipeIngredients />,
				},
				{
					path: "/:categoryId/:id/steps",
					element: <RecipeSteps />,
				},
			],
		},
		{
			path: ":categoryId/new",
			element: (
				<WithAuth>
					<NewRecipe />
				</WithAuth>
			),
		},
		{
			path: "favorites",
			element: (
				<WithAuth>
					<Favorites />
				</WithAuth>
			),
		},
		{
			path: "shopping",
			element: (
				<WithAuth>
					<ShoppingList />
				</WithAuth>
			),
		},
		{
			path: "*",
			element: (
				<Navigate
					to="/"
					replace={true}
				/>
			),
		},
	]
	// { basename: "/my-recipes" }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider
				router={router}
				fallbackElement={<Spinner />}
			/>
		</Provider>
	</React.StrictMode>
);
