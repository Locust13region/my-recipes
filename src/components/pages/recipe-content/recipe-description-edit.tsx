import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hook/typed-hooks";
import Autocomplete from "@mui/material/Autocomplete";
import { createFilterOptions } from "@mui/material";
import { sendNewTag, setSelectedTagValue } from "../../store/recipes-slice";
const filter = createFilterOptions<TTag>();

const RecipeDescriptionEdit = () => {
	const dispatch = useAppDispatch();

	////////////////////////////////////////NAME//////////////////////////////////////
	const [recipeName, setRecipeName] = useState(
		useAppSelector((state) => state.recipesState.currentRecipeDescription?.name)
	);
	const [recipeNameErrorText, setRecipeNameErrorText] = useState("");
	const handleRecipeName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRecipeNameErrorText("");
		setRecipeName(event.target.value);
	};
	////////////////////////////////////////CATEGORY//////////////////////////////////
	const categories = useAppSelector((state) => state.recipesState.categories);
	const [selectedCategory, setSelectedCategory] = useState(
		useAppSelector(
			(state) => state.recipesState.currentRecipeDescription?.categoryId
		)
	);
	const handleRecipeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedCategory(Number(event.target.value));
	};
	////////////////////////////////////////TAG///////////////////////////////////////
	const tags = useAppSelector((state) => state.recipesState.tags);
	dispatch(
		setSelectedTagValue(
			useAppSelector(
				(state) => state.recipesState.currentRecipeDescription?.tags[0]?.name
			)
		)
	);
	////////////////////////////////////////URL////////////////////////////////////////
	const [recipeUrl, setRecipeUrl] = useState(
		useAppSelector(
			(state) => state.recipesState.currentRecipeDescription?.source
		)
	);
	const handleRecipeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRecipeUrl(event.target.value);
	};
	////////////////////////////////////////DESCRIPTION////////////////////////////////
	const [recipeDescription, setRecipeDescription] = useState(
		useAppSelector(
			(state) => state.recipesState.currentRecipeDescription?.description
		)
	);
	const handleRecipeDescription = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRecipeDescription(event.target.value);
	};
	////////////////////////////////////////SUBMIT/////////////////////////////////////
	const handleSubmit = async () => {
		if (!recipeName) {
			setRecipeNameErrorText("Необходимо название рецепта");
			return;
		}
	};
	return (
		<>
			<TextField
				type="search"
				fullWidth
				// autoFocus
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
				select
				fullWidth
				id="selectedCategory"
				name="selectedCategory"
				variant="standard"
				label="Категория"
				value={selectedCategory}
				onChange={handleRecipeCategory}
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
				value={useAppSelector((state) => state.recipesState.selectedTagValue)}
				onChange={(_event, newValue) => {
					if (typeof newValue === "string") {
						dispatch(sendNewTag(newValue));
					} else if (newValue && newValue.inputValue) {
						dispatch(sendNewTag(newValue.inputValue));
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
		</>
	);
};

export default RecipeDescriptionEdit;
