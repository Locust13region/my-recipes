import { Link, Typography } from "@mui/material";
import { useAppSelector } from "../hook/typed-hooks";

const RecipeDescription = () => {
	return (
		<>
			<Link
				href={useAppSelector(
					(state) => state.recipesState.currentRecipeDescription?.source
				)}
			>
				Перейти к источнику рецепта
			</Link>
			<Typography marginTop={2}>
				{useAppSelector(
					(state) => state.recipesState.currentRecipeDescription?.description
				)}
			</Typography>
		</>
	);
};

export default RecipeDescription;
