import { Alert, IconButton } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import React, { useRef } from "react";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { AlertColor } from "@mui/lab";

const useToast = (direction: "left" | "right" | "center" = "left") => {
	const [open, setOpen] = useState(false);
	const [toastText, setToastText] = useState("");
	const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);
	const counterRef = useRef<NodeJS.Timer | undefined>(undefined);
	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
		setToastText("");
		setSeverity(undefined);
	};
	const showToast = (text: string, type?: AlertColor) => {
		clearInterval(counterRef.current);
		setOpen(true);
		setToastText(text);
		setSeverity(type);
		counterRef.current = setInterval(() => {
			handleClose();
		}, 6000);
	};
	const closeButton = (
		<React.Fragment>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={handleClose}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);
	const Toast = !!severity ? (
		<Snackbar
			anchorOrigin={{ vertical: "bottom", horizontal: direction }}
			open={open}
			onClose={handleClose}
		>
			<Alert
				severity={severity}
				action={closeButton}
				onClose={handleClose}
			>
				{toastText}
			</Alert>
		</Snackbar>
	) : (
		<Snackbar
			open={open}
			action={closeButton}
			message={toastText}
			onClose={handleClose}
		/>
	);

	return { showToast, Toast };
};
export default useToast;
