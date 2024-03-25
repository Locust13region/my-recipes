import RecipeIngredientsInfo from "./recipe-ingredients-info";
import RecipeIngredientsEdit from "./recipe-ingredients-edit";
import { useAppSelector } from "../../hook/typed-hooks";
import WithAuth from "../../hoc/with-auth";

const RecipeIngredients = () => {
	const isEditMode = useAppSelector((state) => state.recipesState.isEditMode);

	return isEditMode ? (
		<WithAuth>
			<RecipeIngredientsEdit />
		</WithAuth>
	) : (
		<RecipeIngredientsInfo />
	);
};

export default RecipeIngredients;
