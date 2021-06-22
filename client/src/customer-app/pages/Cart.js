import React, { Fragment, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
	Container,
	Status,
	OrderList,
	OrderItem,
	LeftWrapper,
	RightWrapper,
	Division,
	BreakLine,
	DivisionBottom,
	Logo,
	Total,
	TotalPrice,
	DiscountMessage,
	MyButton,
} from "./Cart.style";
import IconButton from "@material-ui/core/IconButton";
import RemoveCircleOutlineOutlinedIcon from "@material-ui/icons/RemoveCircleOutlineOutlined";
import coffeeMachine from "../../images/coffeeMachine.png";
import { objectIsEmpty } from "../../utilities/Utils";

// Cart page
export default function Cart() {
	const history = useHistory();
	var isUpdate = false;

	// Fetch the order details from the local storage.
	// This will be replaced with cookie in later version of implementation.
	const orderList = JSON.parse(localStorage.getItem("order"));
	const orderPrice = JSON.parse(localStorage.getItem("price"));
	const [order, setOrder] = useState(orderList);
	const [price, setPrice] = useState(orderPrice);

	if (localStorage.getItem("curr_order")) {
		isUpdate = true;
	}

	// Organize the order details and send to the database.
	const makeOrder = async (order) => {
		try {
			const vendorData = JSON.parse(localStorage.getItem("vendor"));

			const data = { vendorId: vendorData["_id"] };

			if (!objectIsEmpty(order)) {
				data["foodItems"] = order;
			}
			const res = await axios.post("/order", data, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			localStorage.removeItem("order");
			localStorage.removeItem("price");
			console.log(res);
		} catch (error) {
			console.log(error);
		}
		return;
	};

	const updateOrder = async (order) => {
		const update = JSON.parse(localStorage.getItem("curr_order"));

		const data = { vendorId: update["vendorId"]["_Id"] };
		const orderId = update["orderId"];
		try {
			if (!objectIsEmpty(order)) {
				data["foodItems"] = order;
			}
			data["orderCost"] = update["orderCost"];
			data["totalCost"] = update["totalCost"];
			const res = await axios.put(`/order/${orderId}`, data, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			// remove local storage items relating to order & cart
			localStorage.removeItem("order");
			localStorage.removeItem("price");
			localStorage.removeItem("curr_order");
			console.log(res);
		} catch (error) {
			console.log(error);
		}
		return;
	};

	const filterItem = (order, name) => {
		let result = {},
			key;
		for (key in order) {
			if (order[key] && key != name) {
				result[key] = order[key];
			}
		}
		if (isUpdate) {
			let updated = JSON.parse(localStorage.getItem("curr_order"));
			updated["foodItems"] = result;
			localStorage.setItem("curr_order", JSON.stringify(updated));
		}

		localStorage.setItem("order", JSON.stringify(result));
		return result;
	};

	const filterPrice = (price, name) => {
		let result = {},
			key,
			orderCost = 0;
		for (key in price) {
			if (price[key] && key != name) {
				result[key] = price[key];
				orderCost += parseFloat(result[key]);
			}
		}
		const totalCost = (orderCost * 85) / 100;
		if (isUpdate) {
			let updated = JSON.parse(localStorage.getItem("curr_order"));
			updated["orderCost"] = orderCost;
			updated["totalCost"] = totalCost;
			localStorage.setItem("curr_order", JSON.stringify(updated));
		}

		localStorage.setItem("price", JSON.stringify(result));
		return result;
	};

	var totalPrice = 0;
	if (orderPrice) {
		Object.entries(orderPrice).map((item) => {
			return (totalPrice += parseFloat(item[1]));
		});
	}

	const renderCart = () => {
		if ((order, orderPrice)) {
			return (
				<Container>
					{isUpdate ? (
						<Status>Confirm your update</Status>
					) : (
						<Status>Confirm your order</Status>
					)}
					<Division>
						<LeftWrapper>
							{Object.entries(order).map(function (item, key) {
								if (order[item[0]]) {
									return (
										<OrderList key={key}>
											<OrderItem>
												{order[item[0]]} x {item[0]}
											</OrderItem>

											<IconButton
												aria-label="Remove"
												onClick={() => {
													let newOrder = filterItem(order, item[0]);
													setOrder(newOrder);
													let newPrice = filterPrice(price, item[0]);
													setPrice(newPrice);
												}}
											>
												<RemoveCircleOutlineOutlinedIcon />
											</IconButton>
										</OrderList>
									);
								}
							})}
						</LeftWrapper>
						<RightWrapper>
							{Object.entries(orderPrice).map(function (item, key) {
								return (
									<OrderList key={key}>
										<OrderItem>$ {item[1]}</OrderItem>
									</OrderList>
								);
							})}
						</RightWrapper>
					</Division>
					<BreakLine />
					<DivisionBottom>
						<div>
							<DiscountMessage>
								20% discount applies if the order<br></br>takes more than 15
								mins
							</DiscountMessage>
						</div>
						<div>
							<Total>Total</Total>
							<TotalPrice>${totalPrice}</TotalPrice>
						</div>
					</DivisionBottom>
					<Logo alt="machine-logo" src={coffeeMachine} />
					{isUpdate ? (
						<div>
							<MyButton
								onClick={() => {
									updateOrder(order);
									history.push("/customer/orderHistory");
								}}
							>
								Update order
							</MyButton>

							<MyButton
								onClick={() => {
									history.push("/customer/menu");
								}}
							>
								Back to menu
							</MyButton>
						</div>
					) : (
						<div>
							<MyButton
								onClick={() => {
									makeOrder(order);
									history.push("/customer/orderHistory");
								}}
							>
								Make order
							</MyButton>
							<MyButton
								onClick={() => {
									history.push("/customer/menu");
								}}
							>
								Back to menu
							</MyButton>
						</div>
					)}
				</Container>
			);
		}
	};

	// Render
	return <Fragment>{renderCart()}</Fragment>;
}
