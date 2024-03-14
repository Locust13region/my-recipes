import { useRef } from "react";
import { createPortal } from "react-dom";
import { useClickAway } from "react-use";
import { useAppDispatch, useAppSelector } from "../hook/typed-hooks";
import CssBaseline from "@mui/material/CssBaseline";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import type { TFilterUsers } from "../types/types";
import {
	displaceFromFilterUsers,
	getRecipesList,
	placeToFilterUsers,
} from "../store/recipes-slice";

type TUsersSelectProps = {
	show: boolean;
	setShow: (arg: boolean) => void;
	categoryId: number;
};

const UsersSelect: React.FC<TUsersSelectProps> = ({
	show,
	setShow,
	categoryId,
}) => {
	const dispatch = useAppDispatch();

	const users = useAppSelector((state) => state.userState.users);
	const currentUserName = useAppSelector(
		(state) => state.userState.user.username
	);
	const currentUser = users.find((user) => user.email === currentUserName)!;
	const selectedUsers = useAppSelector(
		(state) => state.recipesState.filterUsers
	);

	const ref = useRef(null);
	useClickAway(ref, () => {
		setShow(false);
	});

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		user: TFilterUsers
	) => {
		event.target.checked
			? dispatch(placeToFilterUsers(user))
			: dispatch(displaceFromFilterUsers(user));
	};

	if (!show) {
		return null;
	}

	return (
		<>
			{createPortal(
				<div className="flex justify-center items-center  fixed left-0 top-0 right-0 bottom-0 bg-black bg-opacity-50 z-30">
					<div
						className="flex flex-col items-center w-72 h-5/6 rounded-3xl bg-white"
						ref={ref}
					>
						<header className="h-8 mt-2 mr-5 w-full flex justify-end">
							<button
								onClick={() => {
									setShow(false);
								}}
							>
								<span className=" text-amber-500 text-3xl material-symbols-outlined">
									close
								</span>
							</button>
						</header>
						<Stack className="flex flex-col grow items-start px-4 overflow-y-auto ">
							<CssBaseline />
							<Stack className="h-128px mx-3">
								<h5 className="text-base text-center">
									Отображать рецепты следующих пользователей:
								</h5>
								<p className="mt-2 text-sm">Вы:</p>
								<FormControlLabel
									control={
										<Checkbox
											onChange={(event) => {
												handleChange(event, currentUser);
											}}
										/>
									}
									checked={selectedUsers.some(
										(SelectedUser) => SelectedUser.id === currentUser.id
									)}
									label={currentUser.email}
									className="overflow-x-hidden"
								/>
								<Divider />
							</Stack>
							<Stack className="flex flex-col h-full overflow-y-auto grow mx-3">
								<h6 className="sticky top-0 mt-2 text-sm">Пользователи:</h6>
								<div className="grow overflow-y-auto">
									{!!users &&
										users
											.filter(
												(user: TFilterUsers) => user.email !== currentUserName
											)
											.map((user) => {
												return (
													<FormControlLabel
														key={user.id}
														control={
															<Checkbox
																name={`${user.id}`}
																onChange={(event) => {
																	handleChange(event, user);
																}}
															/>
														}
														checked={selectedUsers.some(
															(SelectedUser) => SelectedUser.id === user.id
														)}
														label={user.email}
														className="overflow-x-hidden"
													/>
												);
											})}
								</div>
								<div className="sticky bottom-0 flex justify-center">
									<button
										className="w-28 h-10 mt-4 mb-7 text-xl  border border-gray-300 rounded-full px-4 py-1 leading-7"
										onClick={() => {
											setShow(false);
											dispatch(getRecipesList(categoryId));
										}}
									>
										ОК
									</button>
								</div>
							</Stack>
						</Stack>
					</div>
				</div>,
				document.body
			)}
		</>
	);
};

export default UsersSelect;
