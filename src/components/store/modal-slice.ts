import {
	createSlice,
	isFulfilled,
	isPending,
	isRejected,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type TModalState = {
	isMessageOn: boolean;
	messageContent: string | undefined;
};
const initialState: TModalState = {
	isMessageOn: false,
	messageContent: undefined,
};

export const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		setMessageOn: (state, action: PayloadAction<string | undefined>) => {
			console.log(action.payload);
			state.isMessageOn = true;
			state.messageContent = action.payload;
		},
		setMessageOff: (state) => {
			state.isMessageOn = false;
			state.messageContent = undefined;
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(isPending, (state, action) => {
				state.isMessageOn = true;
				state.messageContent = action.payload;
			})
			.addMatcher(isFulfilled, (state) => {
				state.isMessageOn = false;
			})
			.addMatcher(isRejected, (state, action) => {
				state.isMessageOn = true;
				state.messageContent =
					typeof action.payload === "string" ? action.payload : undefined;
			});
	},
});

export const { setMessageOn, setMessageOff } = modalSlice.actions;
export default modalSlice.reducer;
