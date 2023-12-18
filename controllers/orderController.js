const express = require("express");
const orderRouter = express.Router();
const orderService = require("../services/orderService");
const axios = require("axios");

orderRouter.get("/", async (req, res) => {
  try {
    const order = orderService.getOrders();
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

module.exports = {
  orderRouter,
};
