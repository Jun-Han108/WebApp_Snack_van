import Button from "@material-ui/core/Button";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Interval from "../../shared/components/Interval";
import { InnerDivButtons, ButtonDiv } from "./VendorOrderList.style";
import {
	Container,
	H2,
	H3,
	Customer,
	Division,
	DivisionTop,
	OrderList,
	OrderItem,
	BreakLine,
	BigDiv,
	DivisionBottom,
	DivisionBack,
	Total,
	TotalPrice,
} from "./VendorOrderDetail.style";
import axios from "axios";
import { useLocation } from "react-router";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

// order detail page for vendor
export function VendorOrderDetails() {
	const [status, setStatus] = useState(null);
	const [receiveDisabled, setReceiveDisabled] = useState(false);
	const [declineDisabled, setDeclineDisabled] = useState(false);
	const [readyDisabled, setReadyDisabled] = useState(false);
	const [completeDisabled, setCompleteDisabled] = useState(false);
	const [late, setLate] = useState(false);

	const history = useHistory();

	const pathname = useLocation().pathname;

	// get the orderId from the url
	const orderId = pathname.substring(pathname.lastIndexOf("/") + 1);

	const theme = createMuiTheme({
		palette: {
			primary: {
				main: "#aad9cd",
			},
			action: {
				disabledBackground: "white",
			},
		},
	});

	// update status to the database.
	const updateStatus = async (updatedStatus) => {
		try {
			console.log(JSON.parse(updatedStatus));
			const res = await axios.put(
				`/order/${orderId}`,
				JSON.parse(updatedStatus)
			);
			console.log(res);
		} catch (error) {
			console.log(error);
		}
		return;
	};

	const [order, setOrder] = useState(null);

	useEffect(() => {
		const fetchOneOrder = async () => {
			try {
				const res = await axios.get(`/order/${orderId}`);
				console.log(res);
				setOrder(res.data);
				setStatus(res.data.status);
			} catch (error) {
				console.log(error);
			}
		};
		fetchOneOrder();
		console.log(order);
		return () => {};
	}, []);

	useEffect(() => {
		setReceiveDisabled(checkStatus("received"));
		setDeclineDisabled(checkStatus("declined"));
		setReadyDisabled(checkStatus("ready"));
		setCompleteDisabled(checkStatus("fulfilled"));
		return () => {};
	}, [status]);

	useEffect(() => {
		const updateOrderCost = async (newCost) => {
			try {
				const data = { totalCost: newCost };
				const res = await axios.put(`/order/${orderId}`, data, {
					headers: {
						"Content-Type": "application/json",
					},
				});
				console.log(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		if (order && late) {
			const newTotalCost = parseFloat((order.orderCost * 0.8).toFixed(2));

			setOrder((prevOrder) => {
				return { ...prevOrder, totalCost: newTotalCost };
			});
			updateOrderCost(newTotalCost);
		}
		return () => {};
	}, [late]);

	function checkStatus(check) {
		if (status == "cancelled") {
			return true;
		}
		if (status == "declined") {
			return true;
		}
		if (status == "fulfilled") {
			return true;
		}
		if (status == "pending") {
			return false;
		}
		if (status == "received") {
			if (status == check) {
				return true;
			}
		}
		if (status == "ready") {
			if (status == check) {
				return true;
			}
			if (check == "received") {
				return true;
			}
		}
		return false;
	}

	function renderOrder() {
		if (order) {
			const { customerId, foodItems, orderId, totalCost, updatedAt } = order;

			const customerFName =
				customerId.firstName.charAt(0).toUpperCase() +
				customerId.firstName.slice(1);
			const customerLName =
				customerId.lastName.charAt(0).toUpperCase() +
				customerId.lastName.slice(1);

			return (
				<BigDiv>
					<DivisionBack>
						<ArrowBackIosIcon
							onClick={() => history.push("/vendor/orderlist/")}
						></ArrowBackIosIcon>
					</DivisionBack>
					<Container>
						<DivisionTop>
							<div>
								<H2>
									Order Number #{orderId} - {status}{" "}
								</H2>
								<Customer>
									<b>Customer Name: </b>
									{customerFName} {customerLName}
								</Customer>
								<Customer>
									<b>Customer Email: </b> {customerId.email}
								</Customer>
							</div>
							{late ? (
								<div>
									<H3>Order is late</H3>
								</div>
							) : (
								<div>
									<H3>Time remaining </H3>
									<Interval updatedAt={updatedAt} setLate={setLate} />
								</div>
							)}
						</DivisionTop>

						<BreakLine />
						<Division>
							<div>
								{Object.entries(foodItems).map(function (
									[item, quantity],
									key
								) {
									return (
										<OrderList key={key}>
											<OrderItem>
												{quantity} &nbsp; {item}
											</OrderItem>
										</OrderList>
									);
								})}
							</div>
						</Division>
						<BreakLine />
						<DivisionBottom>
							<div>
								<InnerDivButtons>
									<ButtonDiv>
										<ThemeProvider theme={theme}>
											<Button
												variant="contained"
												color="primary"
												disabled={receiveDisabled}
												onClick={() => {
													setReceiveDisabled(true);
													updateStatus('{"status":"received"}');
												}}
											>
												Receieved
											</Button>
										</ThemeProvider>
									</ButtonDiv>

									<ButtonDiv>
										<ThemeProvider theme={theme}>
											<Button
												variant="contained"
												color="primary"
												disabled={readyDisabled}
												onClick={() => {
													setReadyDisabled(true);
													setReceiveDisabled(true);
													updateStatus('{"status":"ready"}');
												}}
											>
												Ready
											</Button>
										</ThemeProvider>
									</ButtonDiv>

									<ButtonDiv>
										<ThemeProvider theme={theme}>
											<Button
												variant="contained"
												color="primary"
												disabled={completeDisabled}
												onClick={() => {
													setCompleteDisabled(true);
													setReadyDisabled(true);
													setReceiveDisabled(true);
													updateStatus('{"status":"fulfilled"}');
												}}
											>
												Complete
											</Button>
										</ThemeProvider>
									</ButtonDiv>
								</InnerDivButtons>
							</div>
							<div>
								<Total>Total</Total>
								<TotalPrice>${totalCost}</TotalPrice>

								<ThemeProvider theme={theme}>
									<Button
										variant="contained"
										color="secondary"
										disabled={declineDisabled}
										onClick={() => {
											setCompleteDisabled(true);
											setReadyDisabled(true);
											setReceiveDisabled(true);
											setDeclineDisabled(true);
											updateStatus('{"status":"declined"}');
										}}
									>
										Decline
									</Button>
								</ThemeProvider>
							</div>
						</DivisionBottom>
					</Container>
				</BigDiv>
			);
		}
	}

	return <>{renderOrder()}</>;
}

export default VendorOrderDetails;
