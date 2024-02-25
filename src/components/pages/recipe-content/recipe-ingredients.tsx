import { useLocation } from "react-router-dom";
import RecipeIngredientsInfo from "./recipe-ingredients-info";

const RecipeIngredients = () => {
	const location = useLocation();
	console.log("ingredients location", location);
	return <RecipeIngredientsInfo />;
};

export default RecipeIngredients;
