import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hook/typed-hooks";
import {
	Link,
	Outlet,
	useLocation,
	useNavigate,
	useParams,
} from "react-router-dom";
import {
	Box,
	Container,
	CssBaseline,
	ToggleButton,
	ToggleButtonGroup,
} from "@mui/material";
import {
	receiveRecipeDescription,
	setToFavorites,
} from "../store/recipes-slice";
import MessageModal from "../modal/message";

const Recipe: React.FC = () => {
	const { id, categoryId } = useParams();
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(receiveRecipeDescription(String(id)));
	}, [dispatch, id]);

	const isFavorite = useAppSelector(
		(state) => state.recipesState.currentRecipeDescription?.isFavourite
	);

	//////////////////////////////////////HANDLE BUTTONS//////////////////////
	const [alignment, setAlignment] = useState(pathname);
	const handleChange = (
		_: React.MouseEvent<HTMLElement>,
		newAlignment: string
	) => {
		if (newAlignment !== null) {
			setAlignment(newAlignment);
			navigate(newAlignment, { state: { pathname } });
		}
	};

	return (
		<div className="flex flex-col mx-auto max-w-md min-h-screen border">
			<header className="header-footer-link top-0">
				<Link
					to={`/${categoryId}`}
					className="flex"
				>
					<span className=" text-amber-500 text-3xl material-symbols-outlined">
						arrow_back
					</span>
				</Link>
				<div className="overflow-hidden flex flex-col justify-center items-start">
					<h2 className="leading-5 text-xl overflow-hidden whitespace-nowrap">
						{useAppSelector(
							(state) => state.recipesState.currentRecipeDescription?.name
						)}
					</h2>
					<p className="leading-none text-sm overflow-hidden whitespace-nowrap text-gray-400">
						{useAppSelector(
							(state) =>
								state.recipesState.currentRecipeDescription?.tags[0]?.name
						)}
					</p>
				</div>
			</header>
			<Container
				component="main"
				className="bg-link grow relative overflow-y-scroll"
			>
				<CssBaseline />
				<Box
					marginTop={2}
					display={"flex"}
					justifyContent={"center"}
				>
					<ToggleButtonGroup
						color="warning"
						value={alignment}
						exclusive
						onChange={handleChange}
						aria-label="RecipeContent"
					>
						<ToggleButton
							disableRipple={true}
							disableFocusRipple={true}
							value={`/${categoryId}/${id}`}
							sx={{
								border: "none",
								color: "black",
								fontSize: 18,
								textTransform: "none",
								boxShadow: "0px 5px 15px 0px rgba(0, 0, 0, 0.25)",
								"&.Mui-selected": {
									color: "black",
									fontWeight: 600,
									backgroundColor: "",
									boxShadow: "0px 5px 20px 0px rgba(245, 158, 11, 0.5)",
								},
							}}
						>
							Описание
						</ToggleButton>
						<ToggleButton
							disableRipple={true}
							value={`/${categoryId}/${id}/ingredients`}
							sx={{
								border: "none",
								color: "black",
								fontSize: 18,
								textTransform: "none",
								boxShadow: "0px 5px 15px 0px rgba(0, 0, 0, 0.25)",
								"&.Mui-selected": {
									color: "black",
									fontWeight: 600,
									backgroundColor: "white",
									boxShadow: "0px 5px 20px 0px rgba(245, 158, 11, 0.5)",
								},
							}}
						>
							Ингредиенты
						</ToggleButton>
						<ToggleButton
							disableRipple={true}
							value={`/${categoryId}/${id}/steps`}
							sx={{
								border: "none",
								color: "black",
								fontSize: 18,
								textTransform: "none",
								boxShadow: "0px 5px 15px 0px rgba(0, 0, 0, 0.25)",
								"&.Mui-selected": {
									color: "black",
									fontWeight: 600,
									backgroundColor: "none",
									boxShadow: "0px 5px 20px 0px rgba(245, 158, 11, 0.5)",
								},
							}}
						>
							Этапы
						</ToggleButton>
					</ToggleButtonGroup>
				</Box>
				<Box
					marginTop={2}
					paddingX={2}
					display={"flex"}
					flexDirection={"column"}
					justifyContent={"flex-start"}
				>
					<Outlet />
				</Box>
			</Container>
			<footer className="header-footer-link bottom-0">
				{alignment.includes("ingredients") ? (
					<Link
						to={"/favorites"}
						state={{ pathname }}
						className="leading-3  text-xl"
						onClick={() => {
							console.log("В список покупок");
						}}
					>
						В список покупок
					</Link>
				) : (
					<Link
						to={"/favorites"}
						state={{ pathname }}
						className="leading-3  text-xl"
						onClick={() => {
							!isFavorite ? id && dispatch(setToFavorites(id)) : null;
							navigate("/favorites");
						}}
					>
						{!isFavorite ? "В избранное" : "В избранном"}
					</Link>
				)}
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
