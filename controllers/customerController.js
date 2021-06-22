const Customer = require("../models/customer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// register a new customer
const registerCustomer = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	try {
		let customer = await Customer.findOne({
			email: email,
		});

		if (customer) {
			return res.status(400).send("Email already exists");
		}

		const saltRounds = 10;

		const hashPassword = await bcrypt.hash(password, saltRounds);

		customer = new Customer({
			firstName,
			lastName,
			email,
			password: hashPassword,
		});
		await customer.save();

		const payload = {
			customer: { id: customer.id },
		};

		// expires in 24 hours
		const expiry = 86400;

		// sign jwt
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: expiry,
		});
		res.status(200).send({ token: token });
	} catch (error) {
		console.error(error.message);
		return res.status(500).send("Server error");
	}
};

// customer login
const loginCustomer = async (req, res) => {
	const { email, password } = req.body;
	try {
		const customer = await Customer.findOne({ email });

		if (!customer) {
			return res.status(404).send("User doesn't exist");
		}

		// use bcrypt to check if the password sent is the same as the hashed
		// password
		const validPassword = await bcrypt.compare(password, customer.password);

		if (!validPassword) {
			return res.status(401).send("Invalid password");
		}

		const payload = {
			customer: { id: customer.id },
		};

		// expires in 24 hours
		const expiry = 86400;

		// sign jwt
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: expiry,
		});

		return res.status(200).send({ token: token });
	} catch (error) {
		console.error(error);
		res.status(500).send("Database query failed");
	}
};

// get specific customer
const getCustomer = async (req, res) => {
	try {
		// return customer data except the password
		const customer = await Customer.findById(req.customer.id).select(
			"-password"
		);
		if (!customer) {
			return res.status(404).send("Customer not found");
		}
		return res.status(200).send(customer);
	} catch (error) {
		console.error(error);
		res.status(400).send("Database query failed");
	}
};

// update customer profile
const updateProfile = async (req, res) => {
	try {
		const customer = await Customer.findByIdAndUpdate(
			req.customer.id,
			req.body
		);
		if (!customer) {
			return res.status(404).send("Customer doesn't exist");
		}
		return res.status(200).send("Profile updated");
	} catch (error) {
		console.error(error);
		return res.status(400).send("Database query failed");
	}
};

// update customer password, requires old password to change
// the customer's password
const updateCustomerPassword = async (req, res) => {
	console.log(req.body);
	const { newPassword, password } = req.body;

	try {
		const customer = await Customer.findOne({ _id: req.customer.id });

		if (!customer) {
			return res.status(404).send("Customer doesn't exist");
		}

		// use bcrypt to check if the password sent is the same as the hashed
		// password
		const passMatch = await bcrypt.compare(password, customer.password);

		if (!passMatch) {
			return res.status(400).send("Invalid password");
		}
		const saltRounds = 10;

		// update the customer password
		customer.password = await bcrypt.hash(newPassword, saltRounds);

		console.log(customer);

		await customer.save();

		const payload = {
			vendor: { id: customer.id },
		};

		// expires in 24 hours
		const expiry = 86400;

		// sign jwt
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: expiry,
		});

		return res.status(200).send({ token: token });
	} catch (error) {
		console.error(error);
		return res.status(400).send("Database query failed");
	}
};

module.exports = {
	registerCustomer,
	loginCustomer,
	getCustomer,
	updateProfile,
	updateCustomerPassword,
};
