import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import amber from "@mui/material/colors/amber";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hook/typed-hooks";
import { receiveRecipeIngredients } from "../../store/recipes-slice";

const RecipeIngredientsInfo = () => {
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

export default RecipeIngredientsInfo;
