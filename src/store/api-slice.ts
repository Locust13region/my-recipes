import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../api/requests";
import { categoriesUrl } from "../api/url";

// import type { PayloadAction } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk(
	"api/fetchCategories",
	async () => {
		const response = await fetchData(categoriesUrl);
		console.log(response);
		return response;
	}
);

interface ICategory {
	id: number;
	name: string;
	image: string;
}
interface IApiState {
	categories: ICategory[];
}

const initialState: IApiState = {
	categories: [],
};

const apiSlice = createSlice({
	name: "api",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCategories.pending, () => {
				console.log("pending");
			})
			.addCase(fetchCategories.fulfilled, () => {
				console.log("fulfilled");
			})
			.addCase(fetchCategories.rejected, () => {
				console.log("rejected");
			});
	},
});

// export const {  } = categoriesSlice.actions;

export default apiSlice;
