import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hook/typed-hooks";
import Autocomplete from "@mui/material/Autocomplete";
import { createFilterOptions } from "@mui/material";
import {
	sendNewTag,
	setSelectedTagValue,
	setEditableRecipeDescription,
	setRecipeFieldErrorText,
} from "../../store/recipes-slice";
import { TTag } from "../../types/types";

const filter = createFilterOptions<TTag>();

const RecipeDescriptionEdit = () => {
	const dispatch = useAppDispatch();
	const categories = useAppSelector((state) => state.recipesState.categories);
	const tags = useAppSelector((state) => state.recipesState.tags);

	const currentRecipeDescription = useAppSelector(
		(state) => state.recipesState?.currentRecipeDescription
	);
	const currentTagValue = useAppSelector(
		(state) => state.recipesState.currentRecipeDescription?.tags[0]
	);
	useEffect(() => {
		dispatch(setSelectedTagValue(currentTagValue || null));
	}, [currentRecipeDescription, currentTagValue, dispatch]);
	////////////////////////////////////////EDITABLE VALUES///////////////////////////////////
	const editableName = useAppSelector(
		(state) => state.recipesState.editableRecipeDescription?.name
	);
	const editableCategoryId = useAppSelector(
		(state) => state.recipesState.editableRecipeDescription?.categoryId
	);
	const editableTag = useAppSelector(
		(state) => state.recipesState.selectedTagValue
	);
	const editableSource = useAppSelector(
		(state) => state.recipesState.editableRecipeDescription?.source
	);
	const editableDescription = useAppSelector(
		(state) => state.recipesState.editableRecipeDescription?.description
	);
	const recipeFieldErrorText = useAppSelector(
		(state) => state.recipesState.recipeFieldErrorText
	);
	return (
		<>
			<TextField
				type="search"
				fullWidth
				id="recipeTitle"
				name="recipeTitle"
				variant="standard"
				label="Название"
				value={editableName}
				error={!!recipeFieldErrorText && !editableName}
				helperText={recipeFieldErrorText}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					dispatch(setEditableRecipeDescription({ name: event.target.value }));
					dispatch(setRecipeFieldErrorText(""));
				}}
				sx={{ mt: 1 }}
			/>
			<TextField
				select
				fullWidth
				id="selectedCategory"
				name="selectedCategory"
				variant="standard"
				label="Категория"
				value={editableCategoryId}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					dispatch(
						setEditableRecipeDescription({
							categoryId: event.target.value,
						})
					);
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
				fullWidth
				autoFocus
				selectOnFocus
				clearOnBlur
				handleHomeEndKeys
				value={editableTag}
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
						id="selectedTag"
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
				value={editableSource}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					dispatch(
						setEditableRecipeDescription({ source: event.target.value })
					);
				}}
				sx={{ mt: 1 }}
			/>
			<TextField
				multiline
				fullWidth
				id="recipeDescription"
				name="recipeDescription"
				variant="standard"
				label="Описание рецепта"
				value={editableDescription}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					dispatch(
						setEditableRecipeDescription({ description: event.target.value })
					);
				}}
				sx={{ mt: 1, resize: "vertical" }}
			/>
		</>
	);
};

export default RecipeDescriptionEdit;
