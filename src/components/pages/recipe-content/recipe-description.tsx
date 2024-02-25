import RecipeDescriptionInfo from "./recipe-description-info";
import RecipeDescriptionEdit from "./recipe-description-edit";
import { useAppSelector } from "../../hook/typed-hooks";

const RecipeDescription = () => {
	const isEditMode = useAppSelector((state) => state.recipesState.isEditMode);

	return isEditMode ? <RecipeDescriptionEdit /> : <RecipeDescriptionInfo />;
};

export default RecipeDescription;
