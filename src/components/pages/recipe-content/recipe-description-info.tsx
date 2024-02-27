import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../hook/typed-hooks";

const RecipeDescriptionInfo = () => {
	const recipeSource = useAppSelector(
		(state) => state.recipesState.currentRecipeDescription?.source
	);
	return (
		<>
			{recipeSource ? (
				<Link href={recipeSource}>Перейти к источнику рецепта</Link>
			) : null}
			<Typography marginTop={2}>
				{useAppSelector(
					(state) => state.recipesState.currentRecipeDescription?.description
				)}
			</Typography>
		</>
	);
};

export default RecipeDescriptionInfo;
