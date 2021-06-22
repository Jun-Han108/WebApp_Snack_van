const jwt = require("jsonwebtoken");
require("dotenv").config;

const verifyToken = (req, res, next) => {
	const token = req.headers["x-access-token"];

	if (!token) {
		return res.status(401).send("No token provided");
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// if the decoded token contains a customer object
		// attach the customer object to the request
		if (decoded.customer) {
			req.customer = decoded.customer;
		}
		// else if the decoded token contains a vendor object
		// attach the vendor object instead
		else if (decoded.vendor) {
			req.vendor = decoded.vendor;
		}

		next();
	} catch (error) {
		console.error(error);
		res.status(401).send("Invalid token");
	}
};

module.exports = verifyToken;
