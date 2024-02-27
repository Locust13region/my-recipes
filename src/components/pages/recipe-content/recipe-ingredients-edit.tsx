import { useAppDispatch, useAppSelector } from "../../hook/typed-hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import {
	removeRecipeIngredient,
	updateRecipeIngredient,
} from "../../store/recipes-slice";
import TextField from "@mui/material/TextField";

const RecipeIngredientsEdit = () => {
	const dispatch = useAppDispatch();
	const [onFocusedItem, setOnFocusedItem] = useState("");
	const ingredients = useAppSelector(
		(state) => state.recipesState.currentRecipeIngredients
	);
	return (
		<>
			{!!ingredients &&
				ingredients.map(({ id, name, order }) => {
					return (
						<Swiper
							key={id}
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
									fullWidth
									variant="standard"
									InputProps={{ disableUnderline: true }}
									id={`ingr${id}`}
									name={`ingr${id}`}
									defaultValue={name}
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
												updateRecipeIngredient({ id, name: event.target.value })
											);
										}
									}}
								/>
							</SwiperSlide>
							<SwiperSlide className=" flex flex-row justify-between items-center">
								<button
									className="w-full flex justify-center items-center"
									onClick={() => {
										console.log("удаление ингредиента", id);
										// dispatch(removeRecipeIngredient(id));
									}}
								>
									<span className="text-amber-500 text-3xl material-symbols-outlined">
										delete
									</span>
								</button>
							</SwiperSlide>
						</Swiper>
					);
				})}
		</>
	);
};

export default RecipeIngredientsEdit;
