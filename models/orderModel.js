const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  localizedDate: {
    type: String,
    default: function () {
      return this.timestamp.toLocaleDateString(); // Converts the timestamp to a localized date string
    },
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
