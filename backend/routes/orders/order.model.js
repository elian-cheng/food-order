const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { addMethods } = require("../../utils/toResponse");

const OrderSchema = new Schema(
  {
    shop: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    userData: {
      type: Object,
      required: true
    },
    products: {
      type: Array,
      required: true
    },
    totalPrice: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: false
    }
  },
  { collection: "orders" }
);

addMethods(OrderSchema);

module.exports = mongoose.model("Order", OrderSchema);

