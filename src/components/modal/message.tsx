import { useRef } from "react";
import { createPortal } from "react-dom";
import { useClickAway } from "react-use";
import { useAppDispatch, useAppSelector } from "../hook/typed-hooks";
import { CircularProgress } from "@mui/material";
import { setMessageOff } from "../store/modal-slice";

const MessageModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const isMessageOn = useAppSelector((state) => state.modalState.isMessageOn);
	const messageContent = useAppSelector(
		(state) => state.modalState.messageContent
	);
	const ref = useRef(null);
	useClickAway(ref, () => {
		dispatch(setMessageOff());
	});

	if (!isMessageOn) {
		return null;
	}

	return !messageContent ? (
		<>
			{createPortal(
				<div className="flex justify-center items-center fixed left-0 top-0 right-0 bottom-0 bg-black bg-opacity-50 z-30">
					<CircularProgress
						size={60}
						sx={{ color: "white" }}
					/>
				</div>,
				document.body
			)}
		</>
	) : (
		<>
			{createPortal(
				<div className="flex justify-center items-center  fixed left-0 top-0 right-0 bottom-0 bg-black bg-opacity-50 z-30">
					<div
						className="flex flex-col justify-between items-center w-72 h-72 rounded-3xl bg-white"
						ref={ref}
					>
						<header className="mt-2 mr-5 w-full flex justify-end">
							<button
								onClick={() => {
									dispatch(setMessageOff());
								}}
							>
								<span className=" text-amber-500 text-3xl material-symbols-outlined">
									close
								</span>
							</button>
						</header>
						<center>
							<h3 className="text-xl px-1">{messageContent}</h3>
						</center>
						<footer className="">
							<button
								className="mb-7 p-3 w-28 text-xl border border-gray-300 rounded-full px-4 py-1 leading-7"
								onClick={() => {
									dispatch(setMessageOff());
								}}
							>
								Закрыть
							</button>
						</footer>
					</div>
				</div>,
				document.body
			)}
		</>
	);
};

export default MessageModal;
