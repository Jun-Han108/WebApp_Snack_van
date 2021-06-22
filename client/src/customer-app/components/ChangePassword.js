import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Edit, ButDiv, BackDiv, Division } from "../pages/MyAccount.style";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import axios from "axios";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export default function ChangePassword({ changePassword }) {
	const [currPass, setCurrPass] = useState("");
	const [newPass, setNewPass] = useState("");
	const [confirmPass, setConfirmPass] = useState("");

	// open state for materialUI snackbar
	const [open, setOpen] = useState(false);

	// details for materialUI snackbar
	const [snackbar, setSnackbar] = useState({});

	// duration for snackbar
	const duration = 3000;

	const updatePassword = async (updated) => {
		try {
			const res = await axios.put("/customer/me/password", JSON.parse(updated));
			console.log(res);

			// set snackbar details
			setOpen(true);
			setSnackbar({
				data: "Password changed",
				severity: "success",
			});
		} catch (error) {
			console.log(error);

			// set snackbar details
			setOpen(true);
			setSnackbar({
				data: error.response.data,
				severity: "error",
			});
		}
		return;
	};

	// handleclose template from materialUI docs
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	const [passwordHelper, setPasswordHelper] = useState("");

	const onChange = (e) => {
		let validAlpha;
		let validDigit;
		let validLength;

		switch (e.target.id) {
			// used for password requirements
			case "New Password":
				setNewPass(e.target.value);
				validAlpha = /^.*[a-zA-Z][^a-zA-Z]*$/.test(e.target.value);
				validDigit = /^.*[0-9][^0-9]*$/.test(e.target.value);
				validLength = /^.{8,}$/.test(e.target.value);

				if (!validAlpha) {
					setPasswordHelper("Password should have at least one alphabet (a-Z)");
				} else if (!validDigit) {
					setPasswordHelper("Password should have at least one number (0)");
				} else if (!validLength) {
					setPasswordHelper("Password should be at least 8 characters long");
				} else {
					setPasswordHelper("");
				}
				break;
		}
	};

	return (
		<Division>
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				open={open}
				autoHideDuration={duration}
				onClose={handleClose}
			>
				<Alert severity={snackbar.severity} onClose={handleClose}>
					{snackbar.data}
				</Alert>
			</Snackbar>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<TextField
						name="Current Password"
						variant="outlined"
						fullWidth
						id="Current Password"
						type="password"
						label="Current Password"
						autoFocus
						value={currPass}
						onChange={(e) => setCurrPass(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						name="New Password"
						variant="outlined"
						fullWidth
						id="New Password"
						type="password"
						label="New Password"
						autoFocus
						value={newPass}
						onChange={onChange}
						error={passwordHelper.length !== 0}
						helperText={passwordHelper}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						variant="outlined"
						fullWidth
						type="password"
						id="Confirm Password"
						label="Confirm Password"
						name="Confirm Password"
						autoComplete="Confirm Password"
						value={confirmPass}
						onChange={(e) => setConfirmPass(e.target.value)}
					/>
				</Grid>
			</Grid>

			<ButDiv>
				<BackDiv>
					<ArrowBackIosIcon onClick={() => changePassword()}></ArrowBackIosIcon>
				</BackDiv>
				<Edit>
					<Button
						variant="contained"
						color="primary"
						disabled={
							newPass.length === 0 ||
							confirmPass !== newPass ||
							passwordHelper.length !== 0
						}
						onClick={() => {
							if (confirmPass === newPass) {
								updatePassword(
									`{"newPassword":"${newPass}","password":"${currPass}"}`
								);
							}
						}}
					>
						Submit
					</Button>
				</Edit>
			</ButDiv>
		</Division>
	);
}
