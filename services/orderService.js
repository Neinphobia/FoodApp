const Order = require("../models/orderModel");

const getOrders = async () => {
  try {
    const orders = await Order.find();
    return orders;
  } catch (error) {
    throw new Error("Failed to get orders");
  }
};

const getOrderById = async (id) => {
  try {
    const order = Order.findById(id);
    return order;
  } catch (error) {
    throw new Error("Failed to get id order");
  }
};

const postOrder = async (orderData) => {
  try {
    const order = new Order(orderData);
    await order.save();
    return order;
  } catch (error) {
    throw new Error("Failed to create order");
  }
};
module.exports = {
  getOrders,
  getOrderById,
  postOrder,
};
