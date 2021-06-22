const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
	name: { type: String, required: true },
	password: { type: String, required: true },
	location: { type: Object, required: false },
	locationDetails: { type: String, required: false },
	status: { type: String, required: false },
	rating: { type: Array, required: false },
});

module.exports = Vendor = mongoose.model("Vendor", VendorSchema, "vendors");
