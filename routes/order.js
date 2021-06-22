const express = require("express");
const orderController = require("../controllers/orderController");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

// get all outstanding orders
router.get("/", verifyToken, orderController.getOrders);

// get specific order
router.get("/:orderId", verifyToken, orderController.getOrder);

// create new order
router.post("/", verifyToken, orderController.createOrder);

// update specific order
router.put("/:orderId", verifyToken, orderController.updateOrder);

module.exports = router;
