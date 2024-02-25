import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hook/typed-hooks";
import {
	getRecipesCategories,
	getRecipesList,
	removeRecipe,
} from "../store/recipes-slice";
import MessageModal from "../modal/message";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const RecipesList: React.FC = () => {
	const { id } = useParams();
	const categoryId = Number(id);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getRecipesCategories());
		dispatch(getRecipesList(categoryId));
	}, [categoryId, dispatch]);

	const categories = useAppSelector((state) => state.recipesState.categories);
	const categoryList = useAppSelector(
		(state) => state.recipesState.categoryList
	);

	return (
		<div className="flex flex-col mx-auto max-w-md min-h-screen border">
			<header className="header-footer-link top-0">
				<Link
					to={"/"}
					className="flex"
				>
					<span className=" text-amber-500 text-3xl material-symbols-outlined">
						arrow_back
					</span>
				</Link>
				<h2 className="leading-3  text-xl">
					{categories.find((item) => item.id == categoryId)?.name ||
						"Нет такой категории"}
				</h2>
			</header>
			<main className="bg-link grow relative overflow-y-scroll">
				<ul className="mt-2 mb-4 px-7  flex flex-wrap gap-2 justify-between">
					{categoryList.map((item) => {
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
										<h3 className="text-lg overflow-hidden whitespace-nowrap">
											{name}
										</h3>
										<p className="text-sm overflow-hidden whitespace-nowrap text-gray-400">
											{tags[0]?.name ?? ""}
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
								</SwiperSlide>
								<SwiperSlide className=" flex flex-row justify-between items-center">
									<button
										className="w-full flex justify-center items-center"
										onClick={() => {
											dispatch(removeRecipe(String(id)));
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
				</ul>
			</main>
			<footer className="header-footer-link bottom-0 ">
				<Link
					to={`/${categoryId}/new`}
					className="leading-3  text-xl"
				>
					Добавить рецепт
				</Link>

				<button
					className=""
					onClick={() => {
						console.log("фильтр рецептов по пользователям");
					}}
				>
					<span className="flex text-amber-500 text-3xl material-symbols-outlined">
						person
					</span>
				</button>
			</footer>
			<MessageModal />
		</div>
	);
};

export default RecipesList;
