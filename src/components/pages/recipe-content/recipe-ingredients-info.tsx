import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hook/typed-hooks";
import {
	displaceFromShoppingList,
	placeToShoppingList,
	receiveRecipeIngredients,
} from "../../store/recipes-slice";
import { TRecipeIngredients } from "../../types/types";

const RecipeIngredientsInfo = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();

	useEffect(() => {
		dispatch(receiveRecipeIngredients(String(id)));
	}, [dispatch, id]);

	const ingredients = useAppSelector(
		(state) => state.recipesState.currentRecipeIngredients
	);
	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		ingredient: TRecipeIngredients
	) => {
		event.target.checked
			? dispatch(placeToShoppingList(ingredient))
			: dispatch(displaceFromShoppingList(ingredient));
	};
	return (
		<FormGroup>
			{!!ingredients &&
				ingredients.map((ingredient) => {
					return (
						<FormControlLabel
							key={ingredient.id}
							control={
								<Checkbox
									name={`${ingredient.id}`}
									onChange={(event) => {
										handleChange(event, ingredient);
									}}
								/>
							}
							label={ingredient.name}
						/>
					);
				})}
		</FormGroup>
	);
};

export default RecipeIngredientsInfo;
