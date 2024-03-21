import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hook/typed-hooks";
import {
	clearFavoritesList,
	getFavoritesList,
	removeFromFavorites,
} from "../store/recipes-slice";
import MessageModal from "../modal/message";
import { TRecipe } from "../types/types";
import { Swiper, SwiperSlide } from "swiper/react";
import Dialog from "../modal/dialog";

const Favorites: React.FC = () => {
	const [showDialog, setShowDialog] = useState(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getFavoritesList());
	}, [dispatch]);

	const favoritesList = useAppSelector(
		(state) => state.recipesState.favoritesList
	);

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
				<h2 className="leading-3  text-xl">Избранное</h2>
			</header>
			<main className="bg-link grow relative overflow-y-scroll">
				<ul className="mt-2 mb-4 px-7  flex flex-wrap gap-2 justify-between">
					{favoritesList.map((item: TRecipe) => {
						const { id, categoryId, name, tags, owner } = item;
						return (
							<Swiper
								key={id}
								className="w-full h-12 border-b-2 border-b-gray-300 overflow-hidden flex justify-between items-center"
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
									<Link
										to={`/${categoryId}/${id}`}
										className="overflow-hidden flex flex-col justify-center items-start"
									>
										<h3 className="text-lg  overflow-hidden whitespace-nowrap">
											{name}
										</h3>
										<p className="text-sm  overflow-hidden whitespace-nowrap text-gray-400">
											{tags[0]?.name ?? ""}
										</p>
									</Link>
									<div className=" flex flex-col justify-center items-center">
										<p className="text-xs  text-amber-700 overflow-hidden">
											Владелец
										</p>
										<p className="text-xs overflow-hidden whitespace-nowrap">
											{owner.email.substring(0, owner.email.indexOf("@"))}
										</p>
									</div>
								</SwiperSlide>
								<SwiperSlide className=" flex flex-row justify-between items-center">
									<button className="w-full flex justify-center items-center">
										<span
											onClick={() => {
												dispatch(removeFromFavorites(String(id)));
											}}
											className="text-amber-500 text-3xl material-symbols-outlined"
										>
											heart_minus
										</span>
									</button>
								</SwiperSlide>
							</Swiper>
						);
					})}
				</ul>
			</main>
			<footer className="header-footer-link bottom-0 ">
				<button
					className="leading-3  text-xl"
					onClick={() => {
						!!favoritesList.length && setShowDialog(true);
					}}
				>
					Очистить
				</button>
				<Dialog
					show={showDialog}
					setShow={setShowDialog}
					dialogMessage="Список избранных рецептов будет очищен!"
					dialogAction={{
						remote: true,
						remoteAction: clearFavoritesList,
					}}
				/>
				<Link to={"/shopping"}>
					<span className="flex text-amber-500 text-3xl material-symbols-outlined">
						shopping_cart
					</span>
				</Link>
			</footer>
			<MessageModal />
		</div>
	);
};

export default Favorites;
