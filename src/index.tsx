import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";

// import SignIn from "./components/pages/signin.tsx";
// import SignUp from "./components/pages/signup.tsx";
import WithAuth from "./components/hoc/with-auth.tsx";
// import Favorites from "./components/pages/favorites.tsx";
import Main from "./components/pages/main.tsx";
// import NewRecipe from "./components/pages/new-recipe.tsx";
// import Recipe from "./components/pages/recipe.tsx";
// import RecipeDescription from "./components/pages/recipe-content/recipe-description.tsx";
// import RecipeIngredients from "./components/pages/recipe-content/recipe-ingredients.tsx";
// import RecipeSteps from "./components/pages/recipe-content/recipe-steps.tsx";
import RecipesList from "./components/pages/recipes-list.tsx";
// import ShoppingList from "./components/pages/shopping-list.tsx";

import Spinner from "./components/pages/spinner.tsx";
import { store } from "./components/store/store.ts";

const SignIn = lazy(() => import("./components/pages/signin.tsx"));
const SignUp = lazy(() => import("./components/pages/signup.tsx"));
// const WithAuth = lazy(() => import("./components/hoc/with-auth.tsx"));
const Favorites = lazy(() => import("./components/pages/favorites.tsx"));
// const Main = lazy(() => import("./components/pages/main.tsx"));
const NewRecipe = lazy(() => import("./components/pages/new-recipe.tsx"));
const Recipe = lazy(() => import("./components/pages/recipe.tsx"));
const RecipeDescription = lazy(
	() => import("./components/pages/recipe-content/recipe-description.tsx")
);
const RecipeIngredients = lazy(
	() => import("./components/pages/recipe-content/recipe-ingredients.tsx")
);
const RecipeSteps = lazy(
	() => import("./components/pages/recipe-content/recipe-steps.tsx")
);
// const RecipesList = lazy(() => import("./components/pages/recipes-list.tsx"));
const ShoppingList = lazy(() => import("./components/pages/shopping-list.tsx"));

import { createTheme, ThemeProvider } from "@mui/material";
// import MainMui from "./components/pages/main-mui.tsx";
import "./index.css";
// import FullScreenMeta from "./components/full-screen-meta/full-screen-meta.tsx";

const theme = createTheme({
	palette: {
		primary: {
			main: "#ffa000",
		},
	},
});
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
	],
	{ basename: "/my-recipes" }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<Suspense fallback={<Spinner />}>
					<RouterProvider
						router={router}
						fallbackElement={<Spinner />}
					/>
				</Suspense>
			</Provider>
		</ThemeProvider>
	</React.StrictMode>
);
