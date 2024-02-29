import TextField from "@mui/material/TextField";
import pDebounce from "p-debounce";
import { Reorder } from "framer-motion";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppDispatch, useAppSelector } from "../../hook/typed-hooks";
import {
	removeRecipeStep,
	sendReorderedRecipeSteps,
	setCurrentRecipeStepsOrder,
	updateRecipeStep,
} from "../../store/recipes-slice";
import type { TRecipeSteps } from "../../types/types";
import { useParams } from "react-router-dom";

const RecipeStepsEdit = () => {
	const params = useParams();
	const dispatch = useAppDispatch();
	const [onFocusedItem, setOnFocusedItem] = useState("");
	const steps = useAppSelector(
		(state) => state.recipesState.currentRecipeSteps
	);

	const debouncedDispatch = pDebounce(dispatch, 500);
	const setOrder = (reorderedSteps: TRecipeSteps[]) => {
		dispatch(setCurrentRecipeStepsOrder(reorderedSteps));
		(debouncedDispatch as typeof dispatch)(
			sendReorderedRecipeSteps({
				recipeId: Number(params.id),
				ids: reorderedSteps.map((step) => step.id),
			})
		);
	};
	return (
		<Reorder.Group
			as="ol"
			axis="y"
			values={steps}
			onReorder={setOrder}
		>
			{!!steps &&
				steps.map((step) => {
					const { id, text } = step;

					return (
						<Reorder.Item
							key={step.id}
							value={step}
						>
							<Swiper
								creativeEffect={{
									prev: {
										shadow: true,
										translate: [0, 0, -400],
									},
									next: {
										translate: ["100%", 0, 0],
									},
								}}
							>
								<SwiperSlide className="h-full">
									<TextField
										multiline
										fullWidth
										variant="standard"
										InputProps={{ disableUnderline: true }}
										id={`ingredient${id}`}
										name={`ingredient${id}`}
										defaultValue={text === "Новый этап" ? "" : text}
										placeholder="Новый этап"
										sx={{ resize: "vertical" }}
										onFocus={(
											event: React.FocusEvent<
												HTMLInputElement | HTMLTextAreaElement
											>
										) => {
											setOnFocusedItem(event.target.value);
										}}
										onBlur={(
											event: React.FocusEvent<
												HTMLInputElement | HTMLTextAreaElement
											>
										) => {
											if (onFocusedItem == event.target.value) {
												return;
											} else {
												dispatch(
													updateRecipeStep({
														id,
														text: event.target.value,
													})
												);
											}
										}}
									/>
								</SwiperSlide>
								<SwiperSlide className="w-full h-auto flex justify-center items-center ">
									<button className=" ">
										<span
											onClick={() => {
												dispatch(removeRecipeStep(id));
											}}
											className="text-amber-500 text-3xl material-symbols-outlined"
										>
											delete
										</span>
									</button>
								</SwiperSlide>
							</Swiper>
						</Reorder.Item>
					);
				})}
		</Reorder.Group>
	);
};

export default RecipeStepsEdit;
