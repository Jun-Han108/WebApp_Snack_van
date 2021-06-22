const Vendor = require("../models/vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Set van status by sending location
const updateVan = async (req, res) => {
	try {
		const van = await Vendor.findOneAndUpdate(
			{
				_id: req.vendor.id,
			},
			req.body
		);
		if (!van) {
			return res.status(404).send("Van not found");
		}
		return res.send(van);
	} catch (error) {
		console.error(error);
		return res.status(400).send("Database query failed");
	}
};

// add van rating
const addVanRating = async (req, res) => {
	try {
		const { rating, id } = req.body;
		const van = await Vendor.findOneAndUpdate(
			{
				_id: id,
			},
			{ $push: { rating: rating } }
		);
		if (!van) {
			return res.status(404).send("Van not found");
		}
		return res.send(van);
	} catch (error) {
		console.error(error);
		return res.status(400).send("Database query failed");
	}
};

// register a new van
const registerVan = async (req, res) => {
	const { name, password } = req.body;

	const saltRounds = 10;

	const hashPassword = await bcrypt.hash(password, saltRounds);

	try {
		let van = await Vendor.findOne({
			name: name,
		});

		if (van) {
			return res.status(400).send("Van already exists");
		}

		// the default status is closed
		van = new Vendor({
			name,
			password: hashPassword,
			location: "",
			locationDetails: "",
			status: "closed",
		});

		await van.save();
		return res.send("Van registered");
	} catch (error) {
		console.error(error);
		return res.status(500).send("Server error");
	}
};

// update the vendor password
const updateVanPassword = async (req, res) => {
	const { newPassword, password } = req.body;
	try {
		const vendor = await Vendor.findOne({ _id: req.vendor.id });

		if (!vendor) {
			return res.status(404).send("Vendor doesn't exist");
		}

		// use bcrypt to check if the password sent is the same as the hashed
		// password
		const passMatch = await bcrypt.compare(password, vendor.password);

		if (!passMatch) {
			return res.status(400).send("Invalid password");
		}
		const saltRounds = 10;

		// update the vendor password
		vendor.password = await bcrypt.hash(newPassword, saltRounds);

		console.log(vendor);

		await vendor.save();

		const payload = {
			vendor: { id: vendor.id },
		};

		// expires in 24 hours
		const expiry = 86400;

		// sign jwt
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: expiry,
		});

		return res.status(200).send({ token: token });
	} catch (error) {}
};

// login vendor
const loginVendor = async (req, res) => {
	const { name, password } = req.body;
	try {
		const vendor = await Vendor.findOne({ name });

		if (!vendor) {
			return res.status(404).send("Vendor doesn't exist");
		}

		// use bcrypt to check if the password sent is the same as the hashed
		// password
		const validPassword = await bcrypt.compare(password, vendor.password);

		if (!validPassword) {
			return res.status(401).send("Invalid password");
		}

		const payload = {
			vendor: { id: vendor.id },
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
		res.status(500).send("Database query failed after");
	}
};

// get all open vendors
const getVendors = async (req, res) => {
	try {
		const vendors = await Vendor.find({ status: { $ne: "closed" } }).select(
			"-password"
		);
		return res.send(vendors);
	} catch (error) {
		console.error(error);
		return res.status(400).send("Database query failed");
	}
};

const deleteVendor = async (req, res) => {
	try {
		const vendor = await Vendor.findByIdAndDelete(req.vendor.id);
		return res.status(200).send(vendor);
	} catch (error) {
		console.error(error);
		return res.status(400).send("Database query failed");
	}
};

module.exports = {
	getVendors,
	updateVan,
	registerVan,
	loginVendor,
	updateVanPassword,
	addVanRating,
	deleteVendor,
};
