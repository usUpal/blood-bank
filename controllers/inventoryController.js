const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

// create inventory controller
const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType } = req.body;
    //validation
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("user not found");
    }
    if (inventoryType === "in" && user.role !== "donar") {
      throw new Error("user is not a donar");
    }
    if (inventoryType === "out" && user.role !== "hospital") {
      throw new Error("user is not a hospital");
    }
    // save
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(200).send({
      success: true,
      message: "new blood record added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in create inventory api",
      error,
    });
  }
};
// get inventory controller
const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "inventory fetched",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in get inventory api",
      error,
    });
  }
};
module.exports = { createInventoryController, getInventoryController };
