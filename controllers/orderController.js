const express = require("express");
const orderRouter = express.Router();
const orderService = require("../services/orderService");

orderRouter.get("/", async (req, res) => {
  try {
    const order = await orderService.getOrders();
    res.json(order);
  } catch (error) {
    console.error("Failed to get foods:", error.message);
    res.status(500).json({ error: "Failed to get orders" });
  }
});

orderRouter.post("/post", async (req, res) => {
  try {
    const order = await orderService.postOrder(req.body);
    console.log("order created");
    res.status(201).json(order);
  } catch (error) {
    console.error("Failed to create order:", error.message);
    res.status(500).json({ error: "Failed to create order" });
  }
});

orderRouter.delete("/:id", async (req, res) => {
  try {
    const order = await orderService.deleteOrder(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Failed to delete order:", error.message);
    res.status(500).json({ error: "Failed to delete order" });
  }
});

module.exports = {
  orderRouter,
};
