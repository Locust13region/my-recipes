import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getRecipesCategories } from "../store/recipes-slice";
import { useAppDispatch, useAppSelector } from "../hook/typed-hooks";
import MessageModal from "../modal/message";

const Recipe: React.FC = () => {
	const params = useParams();
	console.log(params);

	const dispatch = useAppDispatch();
	const accessToken = useAppSelector(
		(state) => state.userState.user.accessToken
	);
	useEffect(() => {
		dispatch(getRecipesCategories());
		// dispatch(
		// 	getRecipesList({
		// 		accessToken: accessToken,
		// 		categoryId: Number(params?.id),
		// 	})
		// );
	}, [accessToken, dispatch, params?.id]);

	return (
		<div className="flex flex-col mx-auto max-w-md min-h-screen border">
			<header className="header-footer-link top-0">
				<Link
					to={`/${params.categoryId}`}
					className="flex"
				>
					<span className=" text-amber-500 text-3xl material-symbols-outlined">
						arrow_back
					</span>
				</Link>
				<h2 className="leading-3  text-xl">
					Рецепт № {params.id} из категории {params.categoryId}
				</h2>
			</header>
			<main className="bg-link grow relative overflow-y-scroll">
				<div className="my-4 px-4 text-xl mix-blend-normal">
					Загрузка конкретного рецепта
				</div>
			</main>
			<footer className="header-footer-link bottom-0">
				<button
					className="leading-3  text-xl"
					onClick={() => {
						console.log("save to favorites");
					}}
				>
					В избранное
				</button>
				<button
					className=""
					onClick={() => {
						console.log("edit recipe");
					}}
				>
					<span className="flex text-amber-500 text-3xl material-symbols-outlined">
						border_color
					</span>
				</button>
			</footer>
			<MessageModal />
		</div>
	);
};

export default Recipe;
