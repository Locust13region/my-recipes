import MuiDrawer from "@mui/material/Drawer";
import { useAppDispatch, useAppSelector } from "../../hooks/rtk-hooks";
import {
	selectDrawerMobileOpen,
	selectDrawerWidth,
} from "../../store/current-selectors";
import { drawerClosing, drawerMobile } from "../../store/current-slice";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

const DrawerInner = ({ children }: { children: React.ReactNode }) => {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up("md"));
	const dispatch = useAppDispatch();
	const drawerWidth = useAppSelector(selectDrawerWidth);
	const drawerMobileOpen = useAppSelector(selectDrawerMobileOpen);

	const callbacks = {
		handleDrawerClose: () => {
			dispatch(drawerClosing(true));
			dispatch(drawerMobile(false));
		},
		handleDrawerTransitionEnd: () => {
			dispatch(drawerClosing(false));
		},
	};

	return (
		<MuiDrawer
			variant={matches ? "permanent" : "temporary"}
			open={matches ? true : drawerMobileOpen}
			onTransitionEnd={
				matches ? undefined : callbacks.handleDrawerTransitionEnd
			}
			onClose={matches ? undefined : callbacks.handleDrawerClose}
			ModalProps={matches ? undefined : { keepMounted: true }}
			sx={{
				"& .MuiDrawer-paper": {
					boxSizing: "border-box",
					width: drawerWidth,
				},
			}}
		>
			{children}
		</MuiDrawer>
	);
};

export default DrawerInner;
