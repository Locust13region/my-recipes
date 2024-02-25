import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hook/typed-hooks";
import { useParams } from "react-router-dom";
import { receiveRecipeIngredients } from "../store/recipes-slice";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { amber } from "@mui/material/colors";

const RecipeIngredients = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();

	useEffect(() => {
		dispatch(receiveRecipeIngredients(String(id)));
	}, [dispatch, id]);

	const ingredients = useAppSelector(
		(state) => state.recipesState.currentRecipeIngredients
	);
	return (
		<FormGroup>
			{!!ingredients &&
				ingredients.map(({ name, order }, index) => {
					return (
						<FormControlLabel
							key={index}
							control={
								<Checkbox
									name={`number${order}`}
									sx={{
										"& .MuiSvgIcon-root": { fontSize: 32 },
										"&.Mui-checked": {
											color: amber[700],
										},
									}}
								/>
							}
							label={name}
						/>
					);
				})}
		</FormGroup>
	);
};

export default RecipeIngredients;
