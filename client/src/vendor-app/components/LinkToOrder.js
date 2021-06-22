import React, { useState } from "react";
import axios from "axios";
import {
	Container,
	OrderTitle,
	InnerDiv,
	ButtonDiv,
	InnerDivBot,
	InnerDivButtons,
	OrderList,
	FoodItem,
	Division,
	OrderItem,
} from "../pages/VendorOrderList.style";
import { Link } from "react-router-dom";
import { parseDate } from "../../utilities/Utils";
import Button from "@material-ui/core/Button";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

export default function LinkToOrder(props) {
	const { orderId, customerId, foodItems, status, createdAt } = props.order;
	const stat = props.stat;

	// update status to the database.
	const updateStatus = async (updatedStatus) => {
		try {
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

	// check the status of the order
	function checkStatus(check) {
		if (status == "cancelled") {
			return true;
		}
		if (status == "declined") {
			if (check != "cancelled") {
				return true;
			}
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

	const [receiveDisabled, setReceiveDisabled] = useState(
		checkStatus("received")
	);
	const [declineDisabled, setDeclineDisabled] = useState(
		checkStatus("declined")
	);
	const [readyDisabled, setReadyDisabled] = useState(checkStatus("ready"));
	const [completeDisabled, setCompleteDisabled] = useState(
		checkStatus("fulfilled")
	);

	const parsedDate = parseDate(new Date(createdAt));

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

	function renderOrder() {
		return (
			<Container>
				<div>
					<Link
						to={{ pathname: `/vendor/orderdetails/${orderId}` }}
						style={{ textDecoration: "none", color: "black" }}
					>
						<OrderTitle>
							Order {orderId} - {status}
						</OrderTitle>
						<Button variant="default" color="default">
							Order detail
						</Button>
					</Link>

					<Division>
						<InnerDiv>
							<InnerDivBot>
								<ThemeProvider theme={theme}>
									<Button
										variant="contained"
										color="secondary"
										disabled={declineDisabled}
										onClick={() => {
											setDeclineDisabled(true);
											setCompleteDisabled(true);
											setReadyDisabled(true);
											setReceiveDisabled(true);
											updateStatus('{"status":"declined"}');
										}}
									>
										Decline
									</Button>
								</ThemeProvider>
							</InnerDivBot>
						</InnerDiv>
						<Link
							to={{ pathname: `/vendor/orderdetails/${orderId}` }}
							style={{ textDecoration: "none", color: "black" }}
						>
							<InnerDiv>
								<OrderList>
									<OrderItem>
										<b>Customer:</b> {customerId.firstName}{" "}
										{customerId.lastName}
									</OrderItem>
									<OrderItem>
										<b>Items ordered: </b>
									</OrderItem>
									{Object.keys(foodItems).map((food, key) => (
										<FoodItem key={key}>
											{foodItems[food]} {food}
										</FoodItem>
									))}
									<OrderItem>
										<b>Created at:</b> {parsedDate}
									</OrderItem>
								</OrderList>
							</InnerDiv>
						</Link>
						<InnerDiv>
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
											Received
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
						</InnerDiv>
					</Division>

					<hr />
				</div>
			</Container>
		);
	}

	if (stat === status || stat === "all") {
		return <>{renderOrder()}</>;
	} else if (
		stat === "active" &&
		status !== "declined" &&
		status !== "fulfilled" &&
		status !== "cancelled"
	) {
		return <>{renderOrder()}</>;
	} else {
		return <></>;
	}
}

// & status != "declined" & status != "fulfilled"
