import RecipeStepsInfo from "./recipe-steps-info";
import RecipeStepsEdit from "./recipe-steps-edit";
import { useAppSelector } from "../../hook/typed-hooks";

const RecipeSteps = () => {
	const isEditMode = useAppSelector((state) => state.recipesState.isEditMode);

	return isEditMode ? <RecipeStepsEdit /> : <RecipeStepsInfo />;
};

export default RecipeSteps;
