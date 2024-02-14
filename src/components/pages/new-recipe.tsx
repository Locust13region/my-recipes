import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hook/typed-hooks";
import { getRecipesCategories, sendNewRecipe } from "../store/recipes-slice";
import MessageModal from "../modal/message";
import type { TIngredients, TStep, TNewRecipe } from "../types/types";
import {
	Container,
	CssBaseline,
	TextField,
	Box,
	MenuItem,
	Autocomplete,
} from "@mui/material";

const NewRecipe: React.FC = () => {
	const params = useParams();
	const currentCategory = Number(params.categoryId);
	const location = useLocation();
	const dispatch = useAppDispatch();
	const accessToken = useAppSelector(
		(state) => state.userState.user.accessToken
	);

	useEffect(() => {
		dispatch(getRecipesCategories());
	}, [accessToken, dispatch, params.id]);

	const categories = useAppSelector((state) => state.recipesState.categories);

	////////////////////////////////////////CATEGORY//////////////////////////////////
	const [selectedCategory, setSelectedCategory] = useState(
		currentCategory || ""
	);
	const handleSelectCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedCategory(event.target.value);
	};
	////////////////////////////////////////ТЭГ////////////////////////////////////////

	const tags = [
		{ label: "#ГрузинскаяКухня" },
		{ label: "#АзиатскаяКухня" },
		{ label: "#УзбекскаяКухня" },
	]; ////////////////////////////////////////////////////////ЗАМЕНИТЬ НА ТЭГИ ИЗ БАЗЫ
	const [tagValue, setTagValue] = useState<string | null>(null);
	const [inputTagValue, setInputTagValue] = useState("#АзиатскаяКухня");
	const handleSelectTag = (_event: unknown, newValue: string | null) => {
		setTagValue(newValue);
	};
	const handleInputTag = (_event: unknown, newInputValue: string) => {
		setInputTagValue(newInputValue);
	};
	////////////////////////////////////////NAME//////////////////////////////////////
	const [recipeName, setRecipeName] = useState("Соус сладкий чили");
	const [recipeNameErrorText, setRecipeNameErrorText] = useState("");
	const handleRecipeName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRecipeNameErrorText("");
		setRecipeName(event.target.value);
	};
	////////////////////////////////////////URL////////////////////////////////////////
	const [recipeUrl, setRecipeUrl] = useState(
		"https://povar.ru/recipes/sladkii_sous_chili-79966.html"
	);
	const handleRecipeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRecipeUrl(event.target.value);
	};
	////////////////////////////////////////DESCRIPTION////////////////////////////////
	const [recipeDescription, setRecipeDescription] = useState(
		"Это самый лучший рецепт"
	);
	const handleRecipeDescription = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRecipeDescription(event.target.value);
	};
	////////////////////////////////////////INGREDIENTS////////////////////////////////
	const [recipeIngredients, setRecipeIngredients] = useState<TIngredients[]>(
		[]
	);
	const handleRecipeIngredients = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const original = event.target.value;
		const target = original.split("\n").map((originalSubStrung) => {
			return { name: originalSubStrung };
		});
		setRecipeIngredients(target);
	};
	////////////////////////////////////////STEPS//////////////////////////////////////
	const [recipeSteps, setRecipeSteps] = useState<TStep[]>([]);
	const handleRecipeSteps = (event: React.ChangeEvent<HTMLInputElement>) => {
		const original = event.target.value;
		const target = original.split("\n").map((originalSubStrung) => {
			return { text: originalSubStrung };
		});
		setRecipeSteps(target);
	};
	////////////////////////////////////////SUBMIT/////////////////////////////////////
	const handleSubmit = async () => {
		if (!recipeName) {
			setRecipeNameErrorText("Необходимо название рецепта");
			return;
		}
		const newRecipe: TNewRecipe = {
			categoryId: currentCategory,
			// tag: tagValue || inputTagValue,
			name: recipeName,
			description: recipeDescription,
			image: recipeUrl,
			steps: recipeSteps,
			ingredients: recipeIngredients,
		};
		dispatch(sendNewRecipe({ accessToken, newRecipe }));
	};
	////////////////////////////////////////CLEAR ALL///////////////////////////////////
	const clearAllFields = () => {
		setTagValue(null);
		setInputTagValue("");
		setRecipeName("");
		setRecipeUrl("");
		setRecipeDescription("");
		setRecipeIngredients([]);
		setRecipeSteps([]);
	};

	return (
		<div className="flex flex-col mx-auto max-w-md min-h-screen border">
			<header className="header-footer-link top-0">
				<Link
					to={`/${params.categoryId}`}
					className="flex grow"
				>
					<span className=" text-amber-500 text-3xl material-symbols-outlined">
						arrow_back
					</span>
				</Link>
				<h2 className="leading-3 text-xl">Новый рецепт</h2>
			</header>
			<Container
				component="main"
				// maxWidth="xs"
				className="bg-link grow relative overflow-y-scroll"
			>
				<CssBaseline />
				<Box
					component="form"
					noValidate
					autoComplete="off"
					display={"flex"}
					flexDirection={"column"}
					alignItems={"center"}
				>
					<TextField
						select
						fullWidth
						id="selectedCategory"
						name="selectedCategory"
						variant="standard"
						label="Категория"
						value={selectedCategory}
						disabled={location.pathname.includes("new")}
						onChange={handleSelectCategory}
						sx={{ mt: 1 }}
					>
						{categories.map((category, index) => (
							<MenuItem
								key={index}
								value={category.id}
							>
								{category.name}
							</MenuItem>
						))}
					</TextField>
					<Autocomplete
						freeSolo
						fullWidth
						clearOnEscape
						autoFocus
						value={tagValue}
						onChange={handleSelectTag}
						inputValue={inputTagValue}
						onInputChange={handleInputTag}
						id="selectedTag"
						options={tags.map((tag) => tag.label)}
						renderInput={(params) => (
							<TextField
								{...params}
								name="selectedTag"
								label="#хештег"
								variant="standard"
							/>
						)}
					/>
					<TextField
						type="search"
						fullWidth
						id="recipeTitle"
						name="recipeTitle"
						variant="standard"
						label="Название"
						value={recipeName}
						error={!!recipeNameErrorText}
						helperText={recipeNameErrorText}
						onChange={handleRecipeName}
						sx={{ mt: 1 }}
					/>
					<TextField
						type="search"
						fullWidth
						id="recipeUrl"
						name="recipeUrl"
						variant="standard"
						label="Ссылка на первоисточник"
						value={recipeUrl}
						onChange={handleRecipeUrl}
						sx={{ mt: 1 }}
					/>
					<TextField
						type="search"
						fullWidth
						id="recipeDescription"
						name="recipeDescription"
						variant="standard"
						label="Описание рецепта"
						value={recipeDescription}
						onChange={handleRecipeDescription}
						sx={{ mt: 1 }}
					/>
					<TextField
						multiline
						fullWidth
						id="recipeIngredients"
						name="recipeIngredients"
						variant="standard"
						label="Ингредиенты"
						value={
							recipeIngredients &&
							recipeIngredients.map((item) => item.name).join("\n")
						}
						onChange={handleRecipeIngredients}
						sx={{ mt: 1 }}
					/>
					<TextField
						multiline
						fullWidth
						id="recipeSteps"
						name="recipeSteps"
						variant="standard"
						label="Этапы приготовления"
						value={
							recipeSteps && recipeSteps.map((step) => step.text).join("\n")
						}
						onChange={handleRecipeSteps}
						sx={{ mt: 1 }}
					></TextField>
				</Box>
			</Container>
			<footer className="header-footer-link bottom-0">
				<button
					className="leading-3  text-xl"
					onClick={() => {
						handleSubmit();
					}}
				>
					Сохранить
				</button>
				<button
					className=""
					onClick={() => {
						location.pathname.includes("new")
							? clearAllFields()
							: console.log("delete");
					}}
				>
					<span className="flex text-amber-500 text-3xl material-symbols-outlined">
						{location.pathname.includes("new") ? "layers_clear" : "delete"}
					</span>
				</button>
			</footer>
			<MessageModal />
		</div>
	);
};

export default NewRecipe;
