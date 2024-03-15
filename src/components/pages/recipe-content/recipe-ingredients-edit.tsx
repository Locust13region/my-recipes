import TextField from "@mui/material/TextField";
import pDebounce from "p-debounce";
import { Reorder } from "framer-motion";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppDispatch, useAppSelector } from "../../hook/typed-hooks";
import {
	removeRecipeIngredient,
	sendReorderedRecipeIngredients,
	setCurrentRecipeIngredientsOrder,
	updateRecipeIngredient,
} from "../../store/recipes-slice";
import type { TRecipeIngredients } from "../../types/types";

const RecipeIngredientsEdit = () => {
	const dispatch = useAppDispatch();
	const [onFocusedItem, setOnFocusedItem] = useState("");
	const ingredients = useAppSelector(
		(state) => state.recipesState.currentRecipeIngredients
	);

	const debouncedDispatch = pDebounce(dispatch, 400);
	const setOrder = (reorderedIngredients: TRecipeIngredients[]) => {
		dispatch(setCurrentRecipeIngredientsOrder(reorderedIngredients));
		(debouncedDispatch as typeof dispatch)(
			sendReorderedRecipeIngredients({
				recipeId: reorderedIngredients[0].recipeId,
				ids: reorderedIngredients.map((ingredient) => ingredient.id),
			})
		);
	};
	return (
		<Reorder.Group
			as="ol"
			axis="y"
			values={ingredients}
			onReorder={setOrder}
		>
			{!!ingredients &&
				ingredients.map((ingredient) => {
					const { id, name } = ingredient;

					return (
						<Reorder.Item
							key={ingredient.id}
							value={ingredient}
						>
							<Swiper
								className="w-full h-12 overflow-hidden flex justify-between items-center"
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
								<SwiperSlide className=" flex flex-row justify-between items-center">
									<TextField
										variant="standard"
										InputProps={{ disableUnderline: true }}
										id={`ingredient${id}`}
										name={`ingredient${id}`}
										defaultValue={name === "Новый ингредиент" ? "" : name}
										placeholder="Новый ингредиент"
										sx={{ flexGrow: 1, overflow: "auto" }}
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
													updateRecipeIngredient({
														id,
														name: event.target.value,
													})
												);
											}
										}}
									/>
									<span className=" material-symbols-outlined text-3xl text-gray-400">
										drag_handle
									</span>
								</SwiperSlide>
								<SwiperSlide className=" flex flex-row justify-between items-center">
									<button className="w-full flex justify-center items-center">
										<span
											onClick={() => {
												dispatch(removeRecipeIngredient(id));
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

export default RecipeIngredientsEdit;
