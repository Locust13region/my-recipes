import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hook/typed-hooks";
import {
	getRecipesCategories,
	getRecipesList,
	removeRecipe,
} from "../store/recipes-slice";
import MessageModal from "../modal/message";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { setMessageOn } from "../store/modal-slice";
import UsersSelect from "../modal/users-select";
import { receiveUsersList } from "../store/user-slice";

const RecipesList: React.FC = () => {
	const [showUserSelect, setShowUserSelect] = useState(false);
	const { id } = useParams();
	const categoryId = Number(id);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		dispatch(getRecipesCategories());
		dispatch(getRecipesList(categoryId));
		dispatch(receiveUsersList());
	}, [categoryId, dispatch]);

	const categories = useAppSelector((state) => state.recipesState.categories);
	const categoryList = useAppSelector(
		(state) => state.recipesState.categoryList
	);
	const currentUserName = useAppSelector(
		(state) => state.userState.user.username
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
											{owner.email.substring(0, owner.email.indexOf("@"))}
										</p>
									</button>
								</SwiperSlide>
								<SwiperSlide className=" flex flex-row justify-between items-center">
									<button className="w-full flex justify-center items-center">
										<span
											onClick={() => {
												if (
													currentUserName === owner.email ||
													currentUserName === "masandrew@mail.ru"
												) {
													dispatch(removeRecipe(String(id)));
												} else {
													dispatch(
														setMessageOn(
															"Удалить рецепт может только владелец."
														)
													);
												}
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
						if (currentUserName) {
							setShowUserSelect(true);
						} else {
							navigate("/signin", {
								state: {
									from: location,
									needAuth:
										"Для доступа к этой странице нужно пройти авторизацию",
								},
							});
						}
					}}
				>
					<span className="flex text-amber-500 text-3xl material-symbols-outlined">
						person
					</span>
				</button>
				<UsersSelect
					show={showUserSelect}
					setShow={setShowUserSelect}
					categoryId={categoryId}
				/>
			</footer>
			<MessageModal />
		</div>
	);
};

export default RecipesList;
