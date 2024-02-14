import React, { useState } from "react";
import {
	CssBaseline,
	Button,
	TextField,
	Typography,
	Container,
	Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hook/typed-hooks";
import MessageModal from "../modal/message";
import { registration } from "../store/user-slice";

const recipeTheme = createTheme({
	typography: {
		fontSize: 18,
	},
});

const SignUp: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [emailErrorText, setEmailErrorText] = useState("");
	const [passwordErrorText, setPasswordErrorText] = useState("");
	const [passwordConfirmErrorText, setPasswordConfirmErrorText] = useState("");

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleOnChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
		setEmailErrorText("");
	};
	const handleOnChangePassword = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setPassword(event.target.value);
		setPasswordErrorText("");
		if (passwordConfirm !== event.target.value) {
			setPasswordConfirmErrorText("Пароли не совпадают");
		} else {
			setPasswordConfirmErrorText("");
		}
	};
	const handlePasswordConfirm = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setPasswordConfirm(event.target.value);
		if (password !== event.target.value) {
			setPasswordConfirmErrorText("Пароли не совпадают");
		} else {
			setPasswordConfirmErrorText("");
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!email) {
			setEmailErrorText("Пожалуйста, введите Ваше имя");
			return;
		} else {
			setEmailErrorText("");
		}
		if (!password) {
			setPasswordErrorText("Пожалуйста, введите пароль");
			return;
		} else {
			setPasswordErrorText("");
		}
		if (!passwordConfirm) {
			setPasswordConfirmErrorText("Пожалуйста, подтвердите пароль");
			return;
		} else {
			setPasswordConfirmErrorText("");
		}
		const credentials = {
			email: email,
			password: password,
		};
		const registrationResult = await dispatch(registration(credentials));

		if (registrationResult.meta.requestStatus === "fulfilled") {
			navigate("/signin", { replace: true });
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
						Регистрация
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 1, px: 4 }}
					>
						<TextField
							required
							margin="normal"
							fullWidth
							label="Ваш e-mail"
							name="email"
							type="email"
							variant="standard"
							autoComplete="username"
							value={email}
							error={!!emailErrorText}
							helperText={emailErrorText}
							onChange={handleOnChangeEmail}
						/>
						<TextField
							required
							margin="normal"
							fullWidth
							label="Пароль"
							name="password"
							type="password"
							variant="standard"
							autoComplete="new-password"
							value={password}
							error={!!passwordErrorText}
							helperText={passwordErrorText}
							onChange={handleOnChangePassword}
						/>
						<TextField
							required
							margin="normal"
							fullWidth
							label="Подтвердите пароль"
							name="passwordConfirm"
							type="password"
							variant="standard"
							autoComplete="new-password"
							value={passwordConfirm}
							error={!!passwordConfirmErrorText}
							helperText={passwordConfirmErrorText}
							onChange={handlePasswordConfirm}
						/>
						<Box
							className=" text-amber-500 "
							sx={{
								marginTop: 5,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<Button
								type="submit"
								fullWidth
								variant="text"
								color="inherit"
								sx={{ mt: 3, mb: 2 }}
							>
								Зарегистрироваться
							</Button>
							<Link to="/signin">
								<Typography
									variant="body2"
									sx={{ mt: 2, textDecoration: "underline" }}
								>
									Авторизоваться
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

export default SignUp;
