import RecipeStepsInfo from "./recipe-steps-info";
import RecipeStepsEdit from "./recipe-steps-edit";
import { useAppSelector } from "../../hook/typed-hooks";
import WithAuth from "../../hoc/with-auth";

const RecipeSteps = () => {
	const isEditMode = useAppSelector((state) => state.recipesState.isEditMode);

	return isEditMode ? (
		<WithAuth>
			<RecipeStepsEdit />
		</WithAuth>
	) : (
		<RecipeStepsInfo />
	);
};

export default RecipeSteps;
