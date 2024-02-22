import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hook/typed-hooks";
import { getRecipesCategories, sendNewRecipe } from "../store/recipes-slice";
import MessageModal from "../modal/message";
import type { TIngredients, TStep, TNewRecipe, TTag } from "../types/types";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import { createFilterOptions } from "@mui/material";

const filter = createFilterOptions<TTag>();

const NewRecipe: React.FC = () => {
	const params = useParams();
	const currentCategory = Number(params.categoryId);
	const location = useLocation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const accessToken = useAppSelector(
		(state) => state.userState.user.accessToken
	);
	const categories = useAppSelector((state) => state.recipesState.categories);
	const tags = useAppSelector((state) => state.recipesState.tags);

	useEffect(() => {
		dispatch(getRecipesCategories());
		dispatch(receiveTags());
	}, [accessToken, dispatch]);

	////////////////////////////////////////CATEGORY//////////////////////////////////
	const [selectedCategory, setSelectedCategory] = useState(currentCategory);
	////////////////////////////////////////NAME//////////////////////////////////////
	const [recipeName, setRecipeName] = useState("");
	const [recipeNameErrorText, setRecipeNameErrorText] = useState("");
	const handleRecipeName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRecipeNameErrorText("");
		setRecipeName(event.target.value);
	};
	////////////////////////////////////////URL////////////////////////////////////////
	const [recipeUrl, setRecipeUrl] = useState("");
	const handleRecipeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRecipeUrl(event.target.value);
	};
	////////////////////////////////////////DESCRIPTION////////////////////////////////
	const [recipeDescription, setRecipeDescription] = useState("");
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
			name: recipeName,
			description: recipeDescription,
			source: recipeUrl,
			steps: recipeSteps,
			ingredients: recipeIngredients,
		};
		const newRecipeResult = dispatch(sendNewRecipe({ accessToken, newRecipe }));
		newRecipeResult.then((result) => {
			clearAllFields();
			console.log(result);
			navigate(`/${result.payload.categoryId}/${result.payload.id}`);
		});
	};
	////////////////////////////////////////CLEAR ALL///////////////////////////////////
	const clearAllFields = () => {
		dispatch(clearSelectedTagValue());
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
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setSelectedCategory(Number(event.target.value));
						}}
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
						id="selectedTag"
						fullWidth
						autoFocus
						selectOnFocus
						clearOnBlur
						handleHomeEndKeys
						value={useAppSelector(
							(state) => state.recipesState.selectedTagValue
						)}
						onChange={(_event, newValue) => {
							if (typeof newValue === "string") {
								console.log("add as string", newValue);
								dispatch(sendNewTag({ accessToken, name: newValue }));
								console.log(tags);
							} else if (newValue && newValue.inputValue) {
								console.log("add as object", newValue);
								dispatch(
									sendNewTag({ accessToken, name: newValue.inputValue })
								);
							} else {
								dispatch(setSelectedTagValue(newValue));
							}
						}}
						filterOptions={(options, params) => {
							const filtered = filter(options, params);
							const { inputValue } = params;
							// Suggest the creation of a new value
							const isExisting = options.some(
								(option) => inputValue === option.name
							);
							if (inputValue !== "" && !isExisting) {
								filtered.push({
									inputValue,
									name: `Добавляем "${inputValue}"`,
								});
							}

							return filtered;
						}}
						options={tags}
						getOptionLabel={(option) => {
							// Value selected with enter, right from the input
							if (typeof option === "string") {
								return option;
							}
							// Add "xxx" option created dynamically
							if (option.inputValue) {
								return option.inputValue;
							}
							// Regular option
							return option.name;
						}}
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
						multiline
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
