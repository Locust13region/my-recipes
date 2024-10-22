import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../hooks/rtk-hooks";
import { selectDrawerWidth } from "../../store/current-selectors";
import { drawerMobileToggle } from "../../store/current-slice";

const AppBar = () => {
	const dispatch = useAppDispatch();
	const drawerWidth = useAppSelector(selectDrawerWidth);

	const callbacks = {
		handleDrawerToggle: () => {
			dispatch(drawerMobileToggle());
		},
	};

	return (
		<MuiAppBar
			position="fixed"
			elevation={0}
			color="inherit"
			sx={{
				width: { md: `calc(100% - ${drawerWidth}px)` },
				ml: { md: `${drawerWidth}px` },
			}}
		>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={callbacks.handleDrawerToggle}
					sx={{ mr: 2, display: { md: "none" } }}
				>
					<MenuIcon />
				</IconButton>
				<Typography
					variant="h6"
					noWrap
					component="div"
				>
					Responsive drawer
				</Typography>
			</Toolbar>
		</MuiAppBar>
	);
};

export default AppBar;
