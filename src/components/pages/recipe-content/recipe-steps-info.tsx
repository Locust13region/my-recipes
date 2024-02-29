import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hook/typed-hooks";
import { useParams } from "react-router-dom";
import { receiveRecipeSteps } from "../../store/recipes-slice";
import { Typography } from "@mui/material";

const RecipeStepsInfo = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();

	useEffect(() => {
		dispatch(receiveRecipeSteps(String(id)));
	}, [dispatch, id]);

	const steps = useAppSelector(
		(state) => state.recipesState.currentRecipeSteps
	);
	return (
		<>
			{!!steps.length &&
				steps.map((step) => {
					return (
						<Typography
							key={step.id}
							sx={{ mb: 2 }}
						>
							{step.text}
						</Typography>
					);
				})}
		</>
	);
};

export default RecipeStepsInfo;
