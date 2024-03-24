import { Navigate, useLocation } from "react-router-dom";
import type { TUserState } from "../types/types";

import { useAppDispatch } from "../hook/typed-hooks";
import { setCurrentUser, tokenUpdate } from "../store/user-slice";
import { useEffect, useState } from "react";
import Spinner from "../pages/spinner";

const WithAuth: React.FC<React.PropsWithChildren> = ({ children }) => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const [isUpdatedActive, setUpdateStatus] = useState(true);
	const [isAuth, setAuthStatus] = useState(false);
	useEffect(() => {
		(async () => {
			const isLocalUser = localStorage.getItem("_recipes");
			if (isLocalUser) {
				const localUser = JSON.parse(isLocalUser) as TUserState["user"];
				if (
					new Date().getTime() - localUser.tokenTimestamp <
					localUser.expiresIn * 10 ///////////////// mult * 1000 ////////////////////
				) {
					dispatch(setCurrentUser(localUser));
					setUpdateStatus(false);
					setAuthStatus(true);
				} else {
					console.log("///////////////TRY TOKEN REFRESH!!!!/////////////");
					const isUpdateFulfill = await dispatch(tokenUpdate(localUser));
					setUpdateStatus(false);
					if (isUpdateFulfill.payload) {
						setAuthStatus(true);
					} else {
						localStorage.removeItem("_recipes");
						setAuthStatus(false);
					}
				}
			} else {
				setUpdateStatus(false);
			}
		})();
	}, [dispatch, isUpdatedActive]);

	const renderContent = () => {
		return isAuth ? (
			children
		) : (
			<Navigate
				to="/signin"
				state={{
					from: location,
					needAuth: "Для доступа к этой странице нужно пройти авторизацию",
				}}
			/>
		);
	};

	return isUpdatedActive ? <Spinner /> : renderContent();
};

export default WithAuth;
