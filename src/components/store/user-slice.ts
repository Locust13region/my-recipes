import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { TCredentials, TUserState } from "../types/types";
import { UrlUser, tokenRefresh } from "../services/api-request";
import { userRequest } from "../services/api-request";

export const registration = createAsyncThunk(
	"user/registration",
	async (credentials: TCredentials, { rejectWithValue, fulfillWithValue }) => {
		try {
			const response = await userRequest(credentials, UrlUser.REGISTRATION);
			if (!response.ok) {
				const result = await response.json();
				switch (true) {
					case "InvalidEmail" in result.errors:
						return rejectWithValue("Неправильный e-mail.");
					case "PasswordRequiresDigit" in result.errors:
						return rejectWithValue("Пароль должен содержать цифры.");
					case "PasswordRequiresNonAlphanumeric" in result.errors:
						return rejectWithValue(
							"Пароль должен содержать хотя бы один символ."
						);
					case "DuplicateUserName" in result.errors:
						return rejectWithValue(
							"Пользователь с таким e-mail уже существует."
						);
					default:
						console.log(result.errors);
						return rejectWithValue("Ошибка регистрации. Попробуйте позднее.");
				}
			}
			return fulfillWithValue("Регистрация завершена успешно.");
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
			console.log(error);
		}
	}
);

export const login = createAsyncThunk(
	"user/login",
	async (credentials: TCredentials, { rejectWithValue }) => {
		try {
			const response = await userRequest(credentials, UrlUser.LOGIN);
			const result = await response.json();
			if (!response.ok) {
				return rejectWithValue(
					"Ошибка авторизации. Проверьте правильность имени и пароля."
				);
			}
			result.username = credentials.email;
			result.tokenTimestamp = new Date().getTime();
			return result;
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(
					"Ошибка соединения с сервером. Попробуйте позднее."
				);
			}
			console.log(error);
		}
	}
);

export const tokenUpdate = createAsyncThunk(
	"user/tokenUpdate",
	async (localUser: TUserState["user"], { dispatch }) => {
		try {
			const response = await tokenRefresh(localUser.refreshToken);
			if (!response.ok) {
				return false;
			}
			const result = await response.json();
			result.username = localUser.username;
			result.tokenTimestamp = new Date().getTime();
			dispatch(setCurrentUser(result));
			localStorage.setItem("_recipes", JSON.stringify(result));
			return true;
		} catch (error) {
			localStorage.removeItem("_recipes");
			dispatch(clearCurrentUser());
			return false;
		}
	}
);

const initialState: TUserState = {
	user: {
		username: "",
		tokenType: "",
		accessToken: "",
		expiresIn: 0,
		tokenTimestamp: 0,
		refreshToken: "",
	},
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setCurrentUser: (state, action) => {
			state.user = {
				username: action.payload.username,
				tokenType: action.payload.tokenType,
				accessToken: action.payload.accessToken,
				expiresIn: action.payload.expiresIn,
				tokenTimestamp: action.payload.tokenTimestamp,
				refreshToken: action.payload.refreshToken,
			};
		},
		clearCurrentUser: (state) => {
			state.user = {
				username: "",
				tokenType: "",
				accessToken: "",
				expiresIn: 0,
				tokenTimestamp: 0,
				refreshToken: "",
			};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.rejected, (state) => {
			state.user = {
				username: "",
				tokenType: "",
				accessToken: "",
				expiresIn: 0,
				tokenTimestamp: 0,
				refreshToken: "",
			};
		});
	},
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
