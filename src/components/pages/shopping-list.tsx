import { Link, useLocation } from "react-router-dom";
// import { useAppDispatch } from "../hook/typed-hooks";
import MessageModal from "../modal/message";

const ShoppingList: React.FC = () => {
	const { state } = useLocation();
	// const dispatch = useAppDispatch();

	return (
		<div className="flex flex-col mx-auto max-w-md min-h-screen border">
			<header className="header-footer-link top-0">
				<Link
					to={state?.pathname ? state.pathname : "/"} ///////настроить возврат
					className="flex"
				>
					<span className=" text-amber-500 text-3xl material-symbols-outlined">
						arrow_back
					</span>
				</Link>
				<h2 className="leading-3  text-xl">Список покупок</h2>
			</header>
			<main className="bg-link grow relative overflow-y-scroll">
				<ul className="mt-2 mb-4 px-7  flex flex-wrap gap-2 justify-between">
					{""}
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

export default ShoppingList;
