import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../hook/typed-hooks";

const RecipeDescriptionInfo = () => {
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

export default RecipeDescriptionInfo;
