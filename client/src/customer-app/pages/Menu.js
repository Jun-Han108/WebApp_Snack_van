import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../shared/auth-context";
import {
	DIV,
	ROW,
	Wrapper,
	// MyButton,
	LeftWrapper,
	RightWrapper,
	Title,
} from "./Menu.style";
import { Link } from "react-router-dom";
import axios from "axios";
import { Fab } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuItem from "../components/MenuItem";

// Menu page
export default function Menu() {
	let orderList = null;
	let orderUpdate = null;
	let isUpdate = false;
	let orderPrice = {};

	if (localStorage.getItem("order")) {
		orderList = JSON.parse(localStorage.getItem("order"));
	}

	const [menu, setMenu] = useState(null);
	const [order, setOrder] = useState(orderList);

	if (localStorage.getItem("curr_order")) {
		isUpdate = true;
		orderUpdate = JSON.parse(localStorage.getItem("curr_order"));
	}

	const style = {
		margin: 0,
		top: "auto",
		right: 20,
		bottom: 20,
		left: "auto",
		position: "fixed",
		backgroundColor: "#aad9cd",
		color: "white",
		height: "20",
		width: "20",
		zIndex: 2,
	};

	const auth = useContext(AuthContext);

	// Render reach menu item.
	function renderLaptopMenu(array) {
		if (array) {
			const row = array.map((item, key) => {
				let quantity = 0;

				if (order) {
					if (order[item.name] > 0) {
						quantity = order[item.name];
					}
				}

				return (
					<MenuItem
						key={key}
						item={item}
						setOrder={setOrder}
						quantity={quantity}
					/>
				);
			});
			return row;
		}
	}

	// Fetch the menu data from the DB and categorize into beverage and food.
	useEffect(() => {
		let isMounted = true;
		const fetchMenu = async () => {
			try {
				const res = await axios.get("/menu");
				if (isMounted) {
					let sorted = {};
					res.data.forEach((menuItem) => {
						if (menuItem.type in sorted) {
							sorted[menuItem.type].push(menuItem);
						} else {
							sorted[menuItem.type] = [menuItem];
						}
					});

					setMenu(sorted);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchMenu();
		return () => {
			isMounted = false;
		};
	}, [menu]);

	useEffect(() => {
		return () => {};
	}, [order]);

	// Take the current state of order when go to cart button is clicked.
	const finalOrder = (order) => {
		if (orderUpdate) {
			for (const [name, quantity] of Object.entries(orderUpdate["foodItems"])) {
				order[name] += quantity;
			}
		}
		// filter order, keeping items that have a quantity > 1
		orderList = {};
		for (const [key, value] of Object.entries(order)) {
			if (value > 0) {
				orderList[key] = value;
				const allMenu = menu["beverage"].concat(menu["food"]);
				allMenu.forEach(function (item) {
					if (item["name"] === key) {
						orderPrice[key] = parseFloat(item["price"]) * parseInt(value);
					}
				});
			}
		}
		localStorage.setItem("price", JSON.stringify(orderPrice));
		localStorage.setItem("order", JSON.stringify(orderList));
	};

	// render the vendor name + menu as the title
	const displayMenuTitle = () => {
		let title = "Menu";
		// guard case to make sure vanName is present
		if (localStorage.getItem("vendor")) {
			const vanName = JSON.parse(localStorage.getItem("vendor")).name;
			title = `${vanName}'s Menu`;
		}
		return title;
	};

	// conditionally render the cart, i.e. when an item has been added,
	// display the cart. Avoids cases where there is an empty cart
	const displayCart = () => {
		if (!isUpdate) {
			if (order) {
				const numItem = Object.values(order).reduce((a, b) => a + b, 0);
				if (numItem > 0) {
					return (
						<Fab
							variant="extended"
							style={style}
							onClick={() => {
								finalOrder(order);
							}}
						>
							<ShoppingCartIcon /> Cart
						</Fab>
					);
				}
			}
		}
		return null;
	};

	const displayUpdate = () => {
		if (isUpdate) {
			return (
				<Fab
					variant="extended"
					style={style}
					onClick={() => {
						finalOrder(order);
					}}
				>
					<ShoppingCartIcon /> Update
				</Fab>
			);
		}
		return null;
	};

	return (
		<Wrapper>
			<DIV>
				<LeftWrapper>
					<Title>{displayMenuTitle()}</Title>
				</LeftWrapper>
				<RightWrapper>
					<Link to={auth.isLoggedIn ? "/customer/cart" : "/customer/login"}>
						{displayCart()}
						{displayUpdate()}
					</Link>
				</RightWrapper>
			</DIV>
			<h2>Beverage</h2>
			<hr />
			<br />
			<ROW>{menu ? renderLaptopMenu(menu["beverage"]) : <h1>Loading</h1>}</ROW>

			<h2>Food</h2>
			<hr />
			<br />

			<ROW>{menu ? renderLaptopMenu(menu["food"]) : <h1>Loading</h1>}</ROW>
		</Wrapper>
	);
}
