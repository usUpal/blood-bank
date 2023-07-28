const mongooase = require("mongoose");

const inventorySchema = new mongooase.Schema(
  {
    inventoryType: {
      type: String,
      required: ["true", "inventory type is required"],
      enum: ["in", "out"],
    },
    bloodGroup: {
      type: String,
      required: ["true", "blood group is required"],
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    quantity: {
      type: Number,
      required: ["true", "quantity is required"],
    },
    organisation: {
      type: mongooase.Schema.Types.ObjectId,
      ref: "users",
      required: ["true", "organisation is required"],
    },
    hospital: {
      type: mongooase.Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventoryType === "out";
      },
    },
    donar: {
      type: mongooase.Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventoryType === "in";
      },
    },
  },
  { timestramp: true }
);

module.exports = mongooase.model("Inventory", inventorySchema);
