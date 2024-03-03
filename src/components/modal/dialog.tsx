import { useRef } from "react";
import { createPortal } from "react-dom";
import { useClickAway } from "react-use";
import { useAppDispatch } from "../hook/typed-hooks";
import { clearWishlist } from "../store/recipes-slice";

type TDialogProps = {
	show: boolean;
	setShow: (arg: boolean) => void;
	dialogMessage: string;
};

const Dialog: React.FC<TDialogProps> = ({ show, setShow, dialogMessage }) => {
	const dispatch = useAppDispatch();

	const ref = useRef(null);
	useClickAway(ref, () => {
		setShow(false);
	});

	if (!show) {
		return null;
	}

	return (
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
									setShow(false);
								}}
							>
								<span className=" text-amber-500 text-3xl material-symbols-outlined">
									close
								</span>
							</button>
						</header>
						<main>
							<center>
								<h3 className="text-2xl">{dialogMessage}</h3>
							</center>
						</main>
						<footer className="">
							<button
								className="mb-7 p-3 w-28 text-xl border border-gray-300 rounded-full px-4 py-1 leading-7"
								onClick={() => {
									dispatch(clearWishlist());
									setShow(false);
								}}
							>
								ОК
							</button>
						</footer>
					</div>
				</div>,
				document.body
			)}
		</>
	);
};

export default Dialog;
