const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createInventoryController,
  getInventoryController,
} = require("../controllers/inventoryController");

const router = express.Router();

// routes
// Add all blood records
router.post("/create-inventory", authMiddleware, createInventoryController);
// get all blood records
router.get("/get-inventory", authMiddleware, getInventoryController);

module.exports = router;
