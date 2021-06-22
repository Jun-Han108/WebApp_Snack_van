import React, { Fragment, useEffect, useState } from "react";
import Interval from "../../shared/components/Interval";
import Rating from "./Rate";
import coffeeMachine from "../../images/coffeeMachine.png";
import {
	Container,
	Status,
	Division,
	OrderList,
	OrderItem,
	BreakLine,
	DivisionBottom,
	DiscountMessage,
	Total,
	TotalPrice,
	Logo,
	MyButton,
} from "./Order.style";
import axios from "axios";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

// Single order page
export function Order() {
	const [menu, setMenu] = useState(null);
	const [order, setOrder] = useState(null);
	const [late, setLate] = useState(false);
	const [status, setStatus] = useState("");

	const pathname = useLocation().pathname;
	const orderId = pathname.substring(pathname.lastIndexOf("/") + 1);

	// Quick solution to get a price: Fetch the whole menu data. Will be fixed soon.
	useEffect(() => {
		let isMounted = true;
		const fetchMenu = async () => {
			try {
				const res = await axios.get("/menu");
				if (isMounted) {
					setMenu(res.data);
				}
			} catch (error) {
				console.log(error);
			}
		};

		const fetchOrder = async () => {
			try {
				const res = await axios.get(`/order/${orderId}`);
				if (isMounted) {
					setOrder(res.data);
					setStatus(res.data.status);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchMenu();
		fetchOrder();
		return () => {
			isMounted = false;
		};
	}, [orderId]);

	// runs when an order is late
	useEffect(() => {
		// update only the cost of the order (doesn't affect the updatedAt
		// field in mongoDB, which is used for the timer)
		const updateOrderCost = async (newCost) => {
			try {
				const data = { totalCost: newCost };
				const res = await axios.put(`/order/${orderId}`, data, {
					headers: {
						"Content-Type": "application/json",
					},
				});
				console.log(res);
			} catch (error) {
				console.log(error);
			}
		};

		// if order is late, discount the current order
		if (order && late) {
			let discount = 0.2;
			let costMultiplier = 1 - discount;
			const newTotalCost = parseFloat(
				(order.orderCost * costMultiplier).toFixed(2)
			);

			setOrder((prevOrder) => {
				return { ...prevOrder, totalCost: newTotalCost };
			});
			updateOrderCost(newTotalCost);
		}
		return () => {};
	}, [late]);

	// cancel order
	const cancelOrder = async () => {
		const data = { status: "cancelled" };
		try {
			const res = await axios.put(`/order/${orderId}`, data, {
				headers: { "Content-Type": "application/json" },
			});
			console.log(res);
			setStatus("cancelled");
		} catch (error) {
			console.log(error);
		}
	};

	const updateOrder = () => {
		localStorage.setItem("curr_order", JSON.stringify(order));
	};

	// display the order's buttons and timer
	const displayOrderInteractions = (updatedAt) => {
		let timer = <Interval updatedAt={updatedAt} setLate={setLate} />;
		let changeOrderButton = (
			<Link to="/customer/menu" style={{ textDecoration: "none" }}>
				<MyButton onClick={() => updateOrder()}>Change order</MyButton>
			</Link>
		);
		let cancelOrderButton = (
			<MyButton onClick={() => cancelOrder()}>Cancel order</MyButton>
		);
		let goBackButton = (
			<Link to="/customer/orderHistory" style={{ textDecoration: "none" }}>
				<MyButton> Back to orders </MyButton>
			</Link>
		);
		let rate = <Rating vendorId={order["vendorId"]["_id"]} />;

		// array of status used for conditionally rendering
		let statusReq = ["fulfilled", "declined", "cancelled"];

		// if the order's status is either fulfilled, declined or
		// cancelled, don't render the timer, change order or
		// cancel order interactions
		if (statusReq.includes(status)) {
			timer = null;
			changeOrderButton = null;
			cancelOrderButton = null;
		}

		// if the order status is ready, don't render the timer
		// or change order button
		if (status == "ready") {
			timer = null;
			changeOrderButton = null;
		}

		// if the order status isn't fulfilled, don't render
		// the rate component
		if (status != "fulfilled") {
			rate = null;
		}

		// if the order is late, don't render the timer
		if (late) {
			timer = null;
		}
		return (
			<Fragment>
				{rate}
				{timer}
				{changeOrderButton}
				{cancelOrderButton}
				{goBackButton}
			</Fragment>
		);
	};

	// conditionally render the title of the order based on its status
	const displayOrderStatus = () => {
		let msg = "Preparing your order...";
		switch (status) {
			case "cancelled":
				msg = "Order cancelled";
				break;
			case "ready":
				msg = "Order ready";
				break;
			case "declined":
				msg = "Order declined";
				break;
			case "fulfilled":
				msg = "Order completed";
				break;
			default:
				msg = "Preparing your order...";
				break;
		}

		return <Status>{msg}</Status>;
	};

	const displayOrder = () => {
		if (order && menu) {
			const { foodItems, totalCost, updatedAt } = order;
			let prices = [];
			menu.forEach((item) => {
				if (Object.keys(foodItems).includes(item.name)) {
					prices.push(item.price);
				}
			});

			return (
				<Fragment>
					{displayOrderStatus()}
					<Division>
						<div>
							{Object.entries(foodItems).map(function ([item, quantity], key) {
								return (
									<OrderList key={key}>
										<OrderItem>
											{quantity} x {item}
										</OrderItem>
									</OrderList>
								);
							})}
						</div>
						<div>
							{prices.map(function (price, key) {
								return (
									<OrderList key={key}>
										<OrderItem>$ {price}</OrderItem>
									</OrderList>
								);
							})}
						</div>
					</Division>
					<BreakLine />
					<DivisionBottom>
						<div>
							{late ? (
								<DiscountMessage>
									Your order has been discounted
								</DiscountMessage>
							) : (
								<DiscountMessage>
									20% discount applies if the order<br></br>takes more than 15
									mins
								</DiscountMessage>
							)}
						</div>
						<div>
							<Total>Total</Total>
							<TotalPrice>${totalCost}</TotalPrice>
						</div>
					</DivisionBottom>
					<Logo alt="machine-logo" src={coffeeMachine} />
					{displayOrderInteractions(updatedAt)}
				</Fragment>
			);
		}
		return <h1>Loading</h1>;
	};

	return <Container>{displayOrder()}</Container>;
}

export default Order;
