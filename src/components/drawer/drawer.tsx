import Box from "@mui/material/Box";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/rtk-hooks";
import { fetchCategories } from "../../store/api-slice";
import { selectDrawerWidth } from "../../store/current-selectors";
import DrawerContent from "./drawer-content";
import DrawerInner from "./drawer-inner";

const Drawer = () => {
	const dispatch = useAppDispatch();
	const drawerWidth = useAppSelector(selectDrawerWidth);

	useMemo(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	return (
		<Box
			component="nav"
			sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
			aria-label="recipes categories"
		>
			<DrawerInner>
				<DrawerContent />
			</DrawerInner>
		</Box>
	);
};

export default Drawer;
