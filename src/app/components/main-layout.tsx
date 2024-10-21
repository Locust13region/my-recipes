import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useCallback, useState } from "react";
import DrawerInner from "./drawer-inner/drawer-inner";

const drawerWidth = 340;

const MainLayout = () => {
	const [mobileOpen, setMobileOpen] = useState(true);
	const [isClosing, setIsClosing] = useState(false);

	const callbacks = {
		handleDrawerClose: useCallback(() => {
			setIsClosing(true);
			setMobileOpen(false);
		}, []),
		handleDrawerTransitionEnd: useCallback(() => {
			setIsClosing(false);
		}, []),
		handleDrawerToggle: useCallback(() => {
			if (!isClosing) {
				setMobileOpen(!mobileOpen);
			}
		}, [isClosing, mobileOpen]),
	};

	return (
		<>
			<Container
				fixed
				disableGutters
			>
				<Box
					sx={{
						margin: "0 auto",
						display: "flex",
						bgcolor: "#cfe8fc",
						maxWidth: "md",
						height: "100vh",
						position: "relative",
						transform: "translate(0, 0)",
					}}
				>
					<AppBar
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
					</AppBar>
					<Box
						component="nav"
						sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
						aria-label="mailbox folders"
					>
						<Drawer
							variant="temporary"
							open={mobileOpen}
							onTransitionEnd={callbacks.handleDrawerTransitionEnd}
							onClose={callbacks.handleDrawerClose}
							ModalProps={{
								keepMounted: true,
							}}
							sx={{
								display: { xs: "block", md: "none" },
								"& .MuiDrawer-paper": {
									boxSizing: "border-box",
									width: drawerWidth,
								},
							}}
						>
							<DrawerInner />
						</Drawer>
						<Drawer
							variant="permanent"
							sx={{
								display: { xs: "none", md: "block" },
								"& .MuiDrawer-paper": {
									boxSizing: "border-box",
									width: drawerWidth,
								},
							}}
							open
						>
							<DrawerInner />
						</Drawer>
					</Box>
					<Box
						component="main"
						sx={{
							flexGrow: 1,
							p: 2,
							width: { md: `calc(100% - ${drawerWidth}px)` },
						}}
					>
						<Toolbar />
						<Typography sx={{ marginBottom: 2 }}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua.
							Rhoncus dolor purus non enim praesent elementum facilisis leo vel.
							Risus at ultrices mi tempus imperdiet.
						</Typography>
						<Typography sx={{ marginBottom: 2 }}>
							Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
							ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
							elementum integer enim neque volutpat ac tincidunt. Ornare
							suspendisse sed nisi lacus sed viverra tellus.
						</Typography>
					</Box>
				</Box>
			</Container>
		</>
	);
};

export default MainLayout;
