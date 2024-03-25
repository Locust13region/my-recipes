import RecipeDescriptionInfo from "./recipe-description-info";
import RecipeDescriptionEdit from "./recipe-description-edit";
import { useAppSelector } from "../../hook/typed-hooks";
import WithAuth from "../../hoc/with-auth";

const RecipeDescription = () => {
	const isEditMode = useAppSelector((state) => state.recipesState.isEditMode);

	return isEditMode ? (
		<WithAuth>
			<RecipeDescriptionEdit />
		</WithAuth>
	) : (
		<RecipeDescriptionInfo />
	);
};

export default RecipeDescription;
