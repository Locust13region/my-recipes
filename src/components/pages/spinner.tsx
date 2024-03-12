import { createPortal } from "react-dom";
import { CircularProgress } from "@mui/material";

const Spinner: React.FC = () => {
	return (
		<>
			{createPortal(
				<div className="flex justify-center items-center fixed left-0 top-0 right-0 bottom-0 bg-black bg-opacity-50 z-30">
					<CircularProgress
						size={60}
						color="success"
						// sx={{ color: "white" }}
					/>
				</div>,
				document.body
			)}
		</>
	);
};

export default Spinner;
