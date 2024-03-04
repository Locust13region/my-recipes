import { useEffect, useState } from "react";
import {
	CssBaseline,
	Button,
	TextField,
	Typography,
	Container,
	Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hook/typed-hooks";
import MessageModal from "../modal/message";
import { login, setCurrentUser } from "../store/user-slice";
import { setMessageOn } from "../store/modal-slice";

const recipeTheme = createTheme({
	typography: {
		fontSize: 16,
	},
});

const SignIn: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const fromLocation = location.state?.from?.pathname || "/";
	const needAuth = location.state?.needAuth;
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [usernameErrorText, setUsernameErrorText] = useState("");
	const [passwordErrorText, setPasswordErrorText] = useState("");

	useEffect(() => {
		needAuth && dispatch(setMessageOn(needAuth));
	}, [dispatch, needAuth]);

	const handleOnChangeUsername = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setUsername(event.target.value);
		setUsernameErrorText("");
	};
	const handleOnChangePassword = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setPassword(event.target.value);
		setPasswordErrorText("");
	};
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!username) {
			setUsernameErrorText("Пожалуйста, введите имя пользователя");
			return;
		} else {
			setUsernameErrorText("");
		}
		if (!password) {
			setPasswordErrorText("Пожалуйста, введите пароль");
			return;
		} else {
			setPasswordErrorText("");
		}

		const credentials = {
			email: username,
			password: password,
		};
		const loginResult = await dispatch(login(credentials));
		dispatch(setCurrentUser(loginResult.payload));
		localStorage.setItem("_recipes", JSON.stringify(loginResult.payload));
		if (loginResult.meta.requestStatus === "fulfilled") {
			navigate(fromLocation, { replace: true });
		}
	};

	return (
		<ThemeProvider theme={recipeTheme}>
			<Container
				component="main"
				maxWidth="xs"
				className="bg-link"
			>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography
						component="h1"
						variant="h5"
					>
						Авторизация
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 1, px: 2 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							label="Ваше имя / email"
							name="username"
							type="email"
							variant="standard"
							autoComplete="username"
							value={username}
							error={!!usernameErrorText}
							helperText={usernameErrorText}
							onChange={handleOnChangeUsername}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							label="Пароль"
							name="password"
							type="password"
							variant="standard"
							autoComplete="current-password"
							value={password}
							error={!!passwordErrorText}
							helperText={passwordErrorText}
							onChange={handleOnChangePassword}
						/>
						<Box className=" mt-5 flex flex-col items-center text-amber-500 ">
							<Button
								type="submit"
								variant="text"
								size="large"
								color="inherit"
							>
								Войти
							</Button>
							{fromLocation !== "/" ? (
								<Link to="/">
									<Typography
										variant="body2"
										sx={{ mt: 1 }}
									>
										Вернуться на главную страницу
									</Typography>
								</Link>
							) : null}
							<Link to="/signup">
								<Typography
									variant="body2"
									sx={{ mt: 2, textDecoration: "underline" }}
								>
									Зарегистрироваться
								</Typography>
							</Link>
						</Box>
					</Box>
				</Box>
			</Container>
			<MessageModal />
		</ThemeProvider>
	);
};

export default SignIn;
