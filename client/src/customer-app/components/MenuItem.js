import React from "react";
import { UL, Division, Price, ImageBig } from "../pages/Menu.style";
// import IconButton from "@material-ui/core/IconButton";
// import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
// import RemoveCircleOutlineOutlinedIcon from "@material-ui/icons/RemoveCircleOutlineOutlined";
// import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { useEffect, useState } from "react";
import MenuItemModal from "./MenuItemModal";
import { Fragment } from "react";

export default function MenuItem(props) {
	const { item, setOrder } = props;
	const [open, setOpen] = useState(false);
	const name = item.name;

	// set the menuItem quantity to the previous quantity, i.e if
	// there was 3 lattes in the cart, quantity = 3
	const [quantity, setQuantity] = useState(props.quantity);

	// handle open state of menuItemModal
	const handleClickOpen = () => {
		setOpen(true);
	};

	useEffect(() => {
		// update order object, which will be used with cart
		const updateOrder = () => {
			setOrder((prevOrder) => ({
				...prevOrder,
				[name]: quantity,
			}));
		};

		if (quantity >= 0) {
			updateOrder();
		}

		return () => {};
	}, [quantity, setOrder, name]);
	return (
		<Fragment>
			<MenuItemModal
				open={open}
				setOpen={setOpen}
				item={item}
				returnQuantity={setQuantity}
				startQuantity={quantity}
			/>
			<Division onClick={() => handleClickOpen()}>
				<div>
					<ImageBig src={item["image"]} />
				</div>
				<div>
					<UL>
						<b>{item["name"]}</b> <Price>{item["price"]}</Price>
					</UL>
					<UL>{item["detail"]}</UL>
				</div>
			</Division>
		</Fragment>
	);
}

{
	/* <div>
					<Buttons>
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
					</Buttons>
					
				</div> */
}
