import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppDispatch, useAppSelector } from "../hook/typed-hooks";
import Dialog from "../modal/dialog";
import MessageModal from "../modal/message";
import {
	clearWishlist,
	receiveRecipeShoppingList,
	removeFromWishlist,
} from "../store/recipes-slice";
import { TRecipeIngredients } from "../types/types";
import { amber } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const ShoppingList: React.FC = () => {
	const [showDialog, setShowDialog] = useState(false);
	const [addGoods, setAddGoods] = useState(false);
	const [extraGoods, setExtraGoods] = useState<string[]>(
		JSON.parse(localStorage.getItem("_recipesExtraGoods") ?? `""`) || []
	);
	const handleExtraGoods = (event: React.ChangeEvent<HTMLInputElement>) => {
		const original = event.target.value;
		const target = original !== "" ? original.split("\n") : [];
		setExtraGoods(target);
	};
	const handleFab = () => {
		if (addGoods) {
			localStorage.setItem("_recipesExtraGoods", JSON.stringify(extraGoods));
			setAddGoods(false);
		} else {
			setAddGoods(true);
		}
	};
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(receiveRecipeShoppingList());
	}, [dispatch]);

	const wishlist = useAppSelector((state) => state.recipesState.wishlist);

	return (
		<div className="flex flex-col mx-auto max-w-md min-h-dvh border">
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
									key={`${index} - ${ingredient.id}`}
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
									<SwiperSlide className="w-full flex items-center grow overflow-hidden">
										<Typography>{ingredient.name}</Typography>
									</SwiperSlide>
									<SwiperSlide className=" flex flex-row justify-between items-center">
										<button className="w-full flex justify-center items-center">
											<span
												onClick={() =>
													dispatch(removeFromWishlist(ingredient.id))
												}
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
				{extraGoods.length && !addGoods ? (
					<Divider aria-hidden="true">а ещё нужно купить...</Divider>
				) : null}
				{addGoods ? (
					<TextField
						multiline
						fullWidth
						id="extraGoods"
						name="extraGoods"
						variant="standard"
						label="а ещё нужно купить..."
						value={extraGoods && extraGoods.join("\n")}
						onChange={handleExtraGoods}
						sx={{ mt: 1, resize: "vertical" }}
					/>
				) : (
					<ul className="mt-2 mb-4 px-7  flex flex-wrap justify-between">
						{!!extraGoods &&
							extraGoods.map((product: string, index: number) => {
								return (
									<Swiper
										key={product + index}
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
										<SwiperSlide className="w-full flex items-center grow overflow-hidden">
											<Typography>{product}</Typography>
										</SwiperSlide>
										<SwiperSlide className=" flex flex-row justify-between items-center">
											<button className="w-full flex justify-center items-center">
												<span
													onClick={() => {
														const newExtraGoods = extraGoods.filter(
															(_, idx) => index !== idx
														);
														setExtraGoods(newExtraGoods);
														localStorage.setItem(
															"_recipesExtraGoods",
															JSON.stringify(newExtraGoods)
														);
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
				)}
				<Fab
					onClick={handleFab}
					size="small"
					sx={{
						position: "absolute",
						bottom: 16,
						right: 16,
						backgroundColor: amber["A700"],
						"&:hover": {
							backgroundColor: amber["A700"],
						},
					}}
				>
					{!addGoods ? (
						<span className="material-symbols-outlined text-white text-3xl">
							add
						</span>
					) : (
						<span className="material-symbols-outlined text-white text-3xl">
							done
						</span>
					)}
				</Fab>
			</Container>
			<footer className="header-footer-link bottom-0 ">
				<button
					className="leading-3  text-xl"
					onClick={() => {
						(!!wishlist.length || !!extraGoods.length) && setShowDialog(true);
					}}
				>
					Очистить
				</button>
				<Dialog
					show={showDialog}
					setShow={setShowDialog}
					dialogMessage="Список покупок будет очищен!"
					dialogAction={{
						remote: !!wishlist.length,
						remoteAction: clearWishlist,
						local: !!extraGoods.length,
						localAction: setExtraGoods,
					}}
				/>
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
