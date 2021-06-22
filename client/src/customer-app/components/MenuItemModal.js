import React, { useState } from "react";
// import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
// import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import RemoveCircleOutlineOutlinedIcon from "@material-ui/icons/RemoveCircleOutlineOutlined";
import TextField from "@material-ui/core/TextField";
import { Fragment } from "react";
import { Img, ImgDiv, PopDivision, H1, H2 } from "../pages/Menu.style";
import Button from "@material-ui/core/Button";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
// import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
export default function MenuItemModal(props) {
	const { open, setOpen, item, returnQuantity, startQuantity } = props;

	// set the modal quantity to menuItem's (parent) quantity
	const [quantity, setQuantity] = useState(startQuantity);

	// close modal
	const handleClose = () => {
		setOpen(false);
	};

	// send quantity from menuItemModal to menuItem
	const sendQuantityToParent = () => {
		returnQuantity(quantity);
		handleClose();
	};

	const theme = createMuiTheme({
		palette: {
			primary: {
				main: "#aad9cd",
			},
		},
	});
	return (
		<Fragment>
			<Dialog
				onClose={handleClose}
				aria-labelledby="simple-dialog-title"
				open={open}
				maxWidth={"md"}
			>
				{" "}
				<PopDivision>
					<IconButton
						onClick={() => handleClose()}
						style={{ position: "absolute", top: "-1%", left: "-1%" }}
					>
						<CloseIcon></CloseIcon>
					</IconButton>

					<div
						style={{
							margin: "2% 5%",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						{" "}
						<div>
							<H1>{item.name}</H1>
							<H2>{item.price}</H2>
							<p>{item.detail}</p>
						</div>
						<TextField
							id="outlined-multiline-static"
							label="Add a note"
							multiline
							rows={4}
							placeholder="More sugar"
							variant="outlined"
						/>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								margin: "10% 0%",
							}}
						>
							<IconButton
								aria-label="Remove"
								onClick={() => {
									if (quantity > 0) {
										setQuantity(quantity - 1);
									}
								}}
							>
								<RemoveCircleOutlineOutlinedIcon />
							</IconButton>
							{quantity}
							<IconButton
								aria-label="Add"
								onClick={() => {
									setQuantity(quantity + 1);
								}}
							>
								<AddCircleOutlineIcon />
							</IconButton>
						</div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								margin: "auto",
								paddingBottom: "10px",
							}}
						>
							<ThemeProvider theme={theme}>
								<Button
									variant="contained"
									color="primary"
									onClick={() => sendQuantityToParent()}
								>
									Add {quantity > 0 ? quantity : null} to cart
									{quantity > 0 ? ` • $${quantity * 4.5}` : null}
								</Button>
							</ThemeProvider>
							<br></br>
						</div>
					</div>

					<div>
						<ImgDiv>
							<Img src={item.image} alt="" />
						</ImgDiv>
					</div>
				</PopDivision>
			</Dialog>
		</Fragment>
	);
}
