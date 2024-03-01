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
	addNewRecipeIngredient,
	addNewRecipeStep,
	getRecipesCategories,
	receiveRecipeDescription,
	receiveTags,
	sendToWishlist,
	setEditMode,
	setRecipeFieldErrorText,
	setToFavorites,
	updateRecipeDescription,
} from "../store/recipes-slice";
import MessageModal from "../modal/message";

const Recipe: React.FC = () => {
	const { id, categoryId } = useParams();
	const { pathname } = useLocation();

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getRecipesCategories());
		dispatch(receiveTags());
		dispatch(receiveRecipeDescription(String(id)));
	}, [dispatch, id]);

	const isFavorite = useAppSelector(
		(state) => state.recipesState.currentRecipeDescription?.isFavourite
	);
	const isEditMode = useAppSelector((state) => state.recipesState.isEditMode);
	//////////////////////////////////////HANDLE BUTTONS//////////////////////
	const [alignment, setAlignment] = useState(pathname);

	const handleChange = (
		_: React.MouseEvent<HTMLElement>,
		newAlignment: string
	) => {
		if (newAlignment !== null) {
			setAlignment(newAlignment);
			dispatch(setEditMode(false));
			dispatch(setRecipeFieldErrorText(""));
			navigate(newAlignment, {
				state: { pathname, isEditMode },
				replace: true,
			});
		}
	};
	////////////////////////////////////////UPDATE/////////////////////////////////////
	const editableName = useAppSelector(
		(state) => state.recipesState.editableRecipeDescription?.name
	);
	const handleRecipeUpdate = async () => {
		if (!editableName) {
			dispatch(setRecipeFieldErrorText("Необходимо название рецепта"));
			return;
		}
		dispatch(updateRecipeDescription());
	};
	////////////////////////////////////////CLEAR ALL///////////////////////////////////

	return (
		<div className="flex flex-col mx-auto max-w-md min-h-screen border">
			<header className="header-footer-link top-0">
				<button
					onClick={() => {
						dispatch(setEditMode(false));
						navigate(-1);
					}}
					className="flex"
				>
					<span className=" text-amber-500 text-3xl material-symbols-outlined">
						arrow_back
					</span>
				</button>
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
				{!isEditMode ? (
					<>
						{alignment.includes("ingredients") ? (
							<Link
								to={"/shopping"}
								state={{ pathname }}
								className="leading-3  text-xl"
								onClick={() => {
									dispatch(sendToWishlist());
								}}
							>
								В список покупок
							</Link>
						) : (
							<button
								className="leading-3  text-xl"
								onClick={() => {
									!isFavorite ? id && dispatch(setToFavorites(id)) : null;
									navigate("/favorites", { replace: true });
								}}
							>
								{!isFavorite ? "В избранное" : "В избранном"}
							</button>
						)}
						<button
							className=""
							onClick={() => {
								dispatch(setEditMode(true));
								dispatch(setRecipeFieldErrorText(""));
							}}
						>
							<span className="flex text-amber-500 text-3xl material-symbols-outlined">
								border_color
							</span>
						</button>
					</>
				) : (
					<>
						{(() => {
							switch (true) {
								case alignment.includes("ingredients"):
									return (
										<>
											<button
												className="leading-3  text-xl"
												onClick={() => {
													dispatch(addNewRecipeIngredient(id!));
												}}
											>
												Добавить
											</button>
											<button
												className=""
												onClick={() => {
													dispatch(setEditMode(false));
												}}
											>
												<span className="flex text-amber-500 text-3xl material-symbols-outlined">
													edit_off
												</span>
											</button>
										</>
									);
								case alignment.includes("steps"):
									return (
										<>
											<button
												className="leading-3  text-xl"
												onClick={() => {
													dispatch(addNewRecipeStep(id!));
												}}
											>
												Добавить
											</button>
											<button
												className=""
												onClick={() => {
													dispatch(setEditMode(false));
												}}
											>
												<span className="flex text-amber-500 text-3xl material-symbols-outlined">
													edit_off
												</span>
											</button>
										</>
									);

								default:
									return (
										<>
											<button
												className="leading-3  text-xl"
												onClick={() => {
													handleRecipeUpdate();
												}}
											>
												Сохранить
											</button>
										</>
									);
							}
						})()}
					</>
				)}
			</footer>
			<MessageModal />
		</div>
	);
};

export default Recipe;
