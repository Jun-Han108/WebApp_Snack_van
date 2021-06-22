const Order = require("../models/order");
const MenuItem = require("../models/menuItem");

// get all outstanding orders
const getOrders = async (req, res) => {
	const filter = {};

	if ((req.customer || req.vendor) && !(req.customer || req.vendor)) {
		return res.status(401).send("No token provided");
	}

	// assign filter id based on token received
	if (req.customer) {
		filter["customerId"] = req.customer.id;
	} else if (req.vendor) {
		filter["vendorId"] = req.vendor.id;
	}

	try {
		// Find all documents where their status is not fulfilled
		const orders = await Order.find(filter)
			.populate("vendorId", ["name"])
			.populate("customerId", ["firstName", "lastName", "email"], "Customer");
		return res.send(orders);
	} catch (error) {
		console.error(error);
		return res.status(400).send("Database query failed");
	}
};

// get specific order
const getOrder = async (req, res) => {
	try {
		const order = await Order.findOne({
			orderId: req.params.orderId,
		})
			// populate the order with customer
			.populate("vendorId", ["name"], "Vendor")
			.populate("customerId", ["firstName", "lastName", "email"], "Customer");

		if (!order) {
			return res.status(404).send("Order not found");
		}

		if (req.customer) {
			if (req.customer.id != order.customerId._id) {
				return res.status(401).send("Unauthorized customer access to order");
			}
		}

		if (req.vendor) {
			if (req.vendor.id != order.vendorId._id) {
				return res.status(401).send("Unauthorized vendor access to order");
			}
		}

		return res.status(200).send(order);
	} catch (error) {
		console.error(error);
		return res.status(400).send("Database query failed");
	}
};

// update specific order
// can be used to update order status or change the order
const updateOrder = async (req, res) => {
	let options = null;
	let totalCost = 0;
	let updatedOrder = null;
	let resMsg = "";

	if (req.body.foodItems) {
		const { foodItems } = req.body;

		// check if the foods in food items exist in the database
		try {
			for (const [foodName, quantity] of Object.entries(foodItems)) {
				const menuItem = await MenuItem.findOne({
					name: foodName,
				});

				if (!menuItem) {
					return res.status(404).send("Menu item not found");
				}

				// calculate total cost of order
				totalCost += menuItem.price * quantity;
			}

			// create an updated order
			updatedOrder = {
				foodItems: foodItems,
				totalCost: totalCost,
				orderCost: totalCost,
			};

			// if the order is being changed (i.e. when a customer changes)
			// the order, update the timestamp in the database
			options = { timestamps: true };

			resMsg = "Order changed";
		} catch (error) {
			console.error(error);
			return res.status(400).send("Food item not found");
		}
	} else {
		// if only the total cost was sent, set the msg
		if (req.body.totalCost) {
			resMsg = "Discount applied";
		}
		// if only the status was sent, set the msg
		if (req.body.status) {
			resMsg = "Order status updated";
		}

		updatedOrder = req.body;

		// changing an order's total cost or status doesn't, update the
		// updatedAt timestamp in the database, as updatedAt is used
		// to determine the discount timer
		options = { timestamps: false };
	}
	try {
		const order = await Order.findOneAndUpdate(
			{
				orderId: req.params.orderId,
			},
			updatedOrder,
			options
		);

		if (!order) {
			return res.status(404).send("Order not found");
		}

		// if the token is a customer token and doesn't match the
		// order's customer id, deny authorization
		if (req.customer) {
			if (req.customer.id != order.customerId._id) {
				return res.status(401).send("Unauthorized customer access to order");
			}
		}
		// if the token is a vendor token and doesn't match the
		// order's vendor id, deny authorization
		if (req.vendor) {
			if (req.vendor.id != order.vendorId._id) {
				return res.status(401).send("Unauthorized vendor access to order");
			}
		}

		return res.send(resMsg);
	} catch (error) {
		console.error(error);
		return res.status(400).send("Database query failed");
	}
};

// create new order
const createOrder = async (req, res) => {
	const { foodItems, vendorId } = req.body;
	let totalCost = 0;
	try {
		for (const [foodName, quantity] of Object.entries(foodItems)) {
			const menuItem = await MenuItem.findOne({
				name: foodName,
			});

			if (!menuItem) {
				return res.status(404).send("Menu item not found");
			}
			totalCost += menuItem.price * quantity;
		}

		Order.countDocuments({}, async (err, count) => {
			// count how many orders are in the database
			// and make the orderId the total number of
			// order + 1. Used to make the order number
			// cleaner to show
			let orderId = count + 1;

			let newOrder = new Order({
				orderId: orderId,
				customerId: req.customer.id,
				vendorId,
				foodItems,
				status: "pending",
				orderCost: totalCost,
				totalCost: totalCost,
			});
			await newOrder.save();
		});
		return res.send("Order created");
	} catch (error) {
		console.error(error.message);
		return res.status(400).send("Database query failed");
	}
};

module.exports = { getOrders, getOrder, updateOrder, createOrder };
