import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import amber from "@mui/material/colors/amber";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hook/typed-hooks";
import {
	clearWishlist,
	receiveRecipeShoppingList,
	removeFromWishlist,
} from "../store/recipes-slice";
import { Link, useNavigate } from "react-router-dom";
import MessageModal from "../modal/message";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { TRecipeIngredients } from "../types/types";

const ShoppingList: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(receiveRecipeShoppingList());
	}, [dispatch]);

	const wishlist = useAppSelector((state) => state.recipesState.wishlist);

	return (
		<div className="flex flex-col mx-auto max-w-md min-h-screen border">
			<header className="header-footer-link top-0">
				<button
					className="flex"
					onClick={() => {
						navigate(-1);
					}}
				>
					<span className=" text-amber-500 text-3xl material-symbols-outlined">
						arrow_back
					</span>
				</button>
				<h2 className="leading-3  text-xl">Список покупок</h2>
			</header>
			<Container
				component="main"
				className="bg-link grow relative overflow-y-scroll"
			>
				<CssBaseline />
				<ul className="mt-2 mb-4 px-7  flex flex-wrap justify-between">
					{!!wishlist &&
						wishlist.map((ingredient: TRecipeIngredients, index: number) => {
							return (
								<Swiper
									key={`${index} - ${ingredient}`}
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
									<SwiperSlide>
										<FormControlLabel
											control={
												<Checkbox
													name={`${ingredient.id}`}
													onChange={() => {}}
													sx={{
														"& .MuiSvgIcon-root": { fontSize: 32 },
														"&.Mui-checked": {
															color: amber[700],
														},
													}}
												/>
											}
											label={ingredient.name}
											sx={{ flexGrow: 1, overflow: "hidden" }}
										/>
									</SwiperSlide>
									<SwiperSlide className=" flex flex-row justify-between items-center">
										<button className="w-full flex justify-center items-center">
											<span
												onClick={() => {
													dispatch(removeFromWishlist(ingredient.id));
												}}
												className="text-amber-500 text-3xl material-symbols-outlined"
											>
												delete
											</span>
										</button>
									</SwiperSlide>
								</Swiper>
							);
						})}
				</ul>
			</Container>
			<footer className="header-footer-link bottom-0 ">
				<button
					className="leading-3  text-xl"
					onClick={() => {
						if (confirm("Внимание! Удаляем весь список!")) {
							dispatch(clearWishlist());
						}
					}}
				>
					Очистить
				</button>
				<Link to={"/favorites"}>
					<span className="flex text-amber-500 text-3xl material-symbols-outlined">
						favorite
					</span>
				</Link>
			</footer>
			<MessageModal />
		</div>
	);
};

export default ShoppingList;
