import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from "../components/drawer/drawer";
import { useAppSelector } from "../hooks/rtk-hooks";
import { selectDrawerWidth } from "../store/current-selectors";
import AppBar from "../components/app-bar/app-bar";

const MainLayout = () => {
	const drawerWidth = useAppSelector(selectDrawerWidth);

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
					<AppBar />
					<Drawer />
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
							Risus at ultrices mi tempus imperdiet. Lorem ipsum dolor sit amet
							consectetur adipisicing elit. Qui eligendi porro vel provident
							repellat consequuntur nostrum consequatur eaque laboriosam neque.
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Consectetur obcaecati fugit quam iusto sed voluptates officia,
							ratione officiis corrupti perferendis ipsa minus, ipsam maxime
							beatae ducimus ut cupiditate enim animi? Suscipit totam,
							consequatur, ducimus consectetur esse ad deleniti nobis veniam
							eaque hic expedita facilis tempore placeat id vero sapiente
							provident.
						</Typography>
						<Typography sx={{ marginBottom: 2 }}>
							Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
							ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
							elementum integer enim neque volutpat ac tincidunt. Ornare
							suspendisse sed nisi lacus sed viverra tellus. Lorem ipsum dolor
							sit amet consectetur adipisicing elit. Quisquam quod eum natus
							excepturi earum porro deserunt nesciunt soluta ea sit unde,
							corrupti at delectus esse, perferendis nihil error corporis.
							Aliquid nesciunt voluptatibus eum ducimus quia quae incidunt id
							quidem cumque ea voluptates hic autem natus, soluta fugit facere
							et. Libero ullam quod tempora exercitationem. Exercitationem
							perferendis dignissimos porro, tenetur voluptates sint nisi
							similique iure commodi velit, excepturi magni repellendus ratione
							omnis obcaecati maxime numquam delectus sapiente consequatur sunt
							voluptatem.
						</Typography>
						<Typography sx={{ marginBottom: 2 }}>
							Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
							ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
							elementum integer enim neque volutpat ac tincidunt. Ornare
							suspendisse sed nisi lacus sed viverra tellus. Lorem ipsum dolor
							sit amet consectetur adipisicing elit. Quisquam quod eum natus
							excepturi earum porro deserunt nesciunt soluta ea sit unde,
							corrupti at delectus esse, perferendis nihil error corporis.
							Aliquid nesciunt voluptatibus eum ducimus quia quae incidunt id
							quidem cumque ea voluptates hic autem natus, soluta fugit facere
							et. Libero ullam quod tempora exercitationem. Exercitationem
							perferendis dignissimos porro, tenetur voluptates sint nisi
							similique iure commodi velit, excepturi magni repellendus ratione
							omnis obcaecati maxime numquam delectus sapiente consequatur sunt
							voluptatem.
						</Typography>
					</Box>
				</Box>
			</Container>
		</>
	);
};

export default MainLayout;
