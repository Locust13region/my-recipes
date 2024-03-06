import Autocomplete, {
	AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hook/typed-hooks";
import {
	clearFilterSearch,
	receiveRecipeDescription,
} from "../store/recipes-slice";
import type { TRecipe } from "../types/types";

const SearchRecipe: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const allRecipes = useAppSelector((state) => state.recipesState.filterSearch);
	const loading = open && allRecipes.length === 0;

	useEffect(() => {
		if (!loading) {
			return undefined;
		}
		(async () => {
			await dispatch(receiveRecipeDescription(null));
		})();
	}, [dispatch, loading]);

	useEffect(() => {
		if (!open) {
			dispatch(clearFilterSearch([]));
		}
	}, [dispatch, open]);

	const handleOptionSelected = (
		event: React.SyntheticEvent<Element, Event>,
		value: TRecipe | null,
		reason: AutocompleteChangeReason
	) => {
		console.log("reason", reason);
		if (value && reason === "selectOption") {
			console.log("value", value);
			navigate(`/${value.categoryId}/${value.id}`);
		}
	};
	return (
		<Autocomplete
			id="searchRecipe"
			fullWidth
			forcePopupIcon={false}
			loadingText={"Загружаю..."}
			noOptionsText={"Совпадений нет."}
			open={open}
			onOpen={() => {
				setOpen(true);
			}}
			onClose={() => {
				setOpen(false);
			}}
			onChange={handleOptionSelected}
			isOptionEqualToValue={(option, value) => option.name === value.name}
			getOptionLabel={(option) => option.name}
			options={allRecipes}
			loading={loading}
			renderInput={(params) => (
				<TextField
					type="text"
					placeholder="Найти рецепт"
					variant="standard"
					{...params}
					InputProps={{
						...params.InputProps,
						disableUnderline: true,

						endAdornment: (
							<>
								{loading ? (
									<CircularProgress
										color="inherit"
										size={20}
									/>
								) : null}
								{params.InputProps.endAdornment}
							</>
						),
					}}
				/>
			)}
		/>
	);
};

export default SearchRecipe;
