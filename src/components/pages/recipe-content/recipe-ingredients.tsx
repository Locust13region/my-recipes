import RecipeIngredientsInfo from "./recipe-ingredients-info";
import RecipeIngredientsEdit from "./recipe-ingredients-edit";
import { useAppSelector } from "../../hook/typed-hooks";

const RecipeIngredients = () => {
	const isEditMode = useAppSelector((state) => state.recipesState.isEditMode);

	return isEditMode ? <RecipeIngredientsEdit /> : <RecipeIngredientsInfo />;
};

export default RecipeIngredients;
