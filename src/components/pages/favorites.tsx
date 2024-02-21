import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../hook/typed-hooks";
import { getFavoriteList } from "../store/recipes-slice";
import MessageModal from "../modal/message";
import { TRecipe } from "../types/types";

const Favorites: React.FC = () => {
	const { state } = useLocation();
	const dispatch = useAppDispatch();

	useEffect(() => {
		const favoriteList = dispatch(getFavoriteList());
		favoriteList.then((list) => setFavoriteList(list.payload));
	}, [dispatch]);

	const [favoriteList, setFavoriteList] = useState([]);

	return (
		<div className="flex flex-col mx-auto max-w-md min-h-screen border">
			<header className="header-footer-link top-0">
				<Link
					to={state?.pathname ? state.pathname : "/"} //////////////////////////////////////////////скорректировать путь
					className="flex"
				>
					<span className=" text-amber-500 text-3xl material-symbols-outlined">
						arrow_back
					</span>
				</Link>
				<h2 className="leading-3  text-xl">Избранное</h2>
			</header>
			<main className="bg-link grow relative overflow-y-scroll">
				<ul className="mt-2 mb-4 px-7  flex flex-wrap gap-2 justify-between">
					{favoriteList.map((item: TRecipe, index) => {
						const { id, categoryId, name, tags, owner } = item;
						return (
							<li
								key={index}
								className="w-full h-12 border-b-2 border-b-gray-300 overflow-hidden flex justify-between items-center"
							>
								<Link
									to={`/${categoryId}/${id}`}
									className="overflow-hidden flex flex-col justify-center items-start"
								>
									<h3 className="text-lg  overflow-hidden whitespace-nowrap">
										{name}
									</h3>
									<p className="text-sm  overflow-hidden whitespace-nowrap text-gray-400">
										{tags[0].name}
									</p>
								</Link>
								<button
									className=" flex flex-col justify-center items-center"
									onClick={() => {}}
								>
									<p className="text-xs  text-amber-700 overflow-hidden">
										Владелец
									</p>
									<p className="text-xs overflow-hidden whitespace-nowrap">
										{owner.email}
									</p>
								</button>
							</li>
						);
					})}
				</ul>
			</main>
			<footer className="header-footer-link bottom-0 ">
				<button
					className="leading-3  text-xl"
					onClick={() => {
						console.log("очищаем всё или по-одному?");
					}}
				>
					Очистить
				</button>
				<button
					className=""
					onClick={() => {
						console.log("в корзину покупок");
					}}
				>
					<span className="flex text-amber-500 text-3xl material-symbols-outlined">
						shopping_cart
					</span>
				</button>
			</footer>
			<MessageModal />
		</div>
	);
};

export default Favorites;
