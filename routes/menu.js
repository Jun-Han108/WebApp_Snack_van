const express = require("express");
const menuController = require("../controllers/menuController");
const router = express.Router();

// get menu
router.get("/", menuController.getMenu);

// get specific menu item
router.get("/:name", menuController.getMenuItem);

// create new menu item
router.post("/", menuController.createMenuItem);

// update menu item
router.put("/:name", menuController.updateMenuItem);

module.exports = router;
