import { useEffect, useState } from "react";
import { getPath } from "../services/api-request";
import Profile from "../modal/profile";
import { useAppDispatch, useAppSelector } from "../hook/typed-hooks";
import { getRecipesCategories } from "../store/recipes-slice";
import MessageModal from "../modal/message";
import { Link } from "react-router-dom";

const Main: React.FC = () => {
	const [showProfile, setShowProfile] = useState(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getRecipesCategories());
	}, [dispatch]);

	const categories = useAppSelector((state) => state.recipesState.categories);

	return (
		<div className="flex flex-col mx-auto max-w-md min-h-screen border">
			<header className="header-footer-link top-0">
				<a
					// to={"new"}
					className="flex"
				>
					<span className=" text-amber-500 text-3xl material-symbols-outlined">
						favorite
					</span>
				</a>
				<div className="flex grow gap-2 justify-between border border-gray-300 rounded-full px-4 py-1 leading-7">
					<input
						name="search"
						className=" grow outline-none bg-white"
						type="text"
						placeholder="Найти рецепт"
					/>
					<button className=" text-gray-400 material-symbols-outlined">
						search
					</button>
				</div>
			</header>
			<main className="bg-link grow relative overflow-y-scroll">
				<h1 className="my-4 pl-9 text-2xl">Категории</h1>
				<ul className="mb-4 px-7 flex flex-wrap gap-3 justify-between">
					{categories.map(({ id, image, name }, index) => {
						return (
							<li key={index}>
								<Link to={`${id}`}>
									<div className="w-36 h-36 rounded-2xl overflow-hidden flex justify-center items-center">
										<img
											src={getPath(image)}
											alt={name}
										/>
									</div>
									<h3 className="pl-2 ">{name}</h3>
								</Link>
							</li>
						);
					})}
				</ul>
			</main>
			<footer className="header-footer-link bottom-0 ">
				<button
					className="leading-3  text-xl"
					onClick={() => {
						setShowProfile(true);
					}}
				>
					Профиль
				</button>
				<Profile
					show={showProfile}
					setShow={setShowProfile}
				/>
				<a className="">
					<span className="flex text-amber-500 text-3xl material-symbols-outlined">
						shopping_cart
					</span>
				</a>
			</footer>
			<MessageModal />
		</div>
	);
};

export default Main;
