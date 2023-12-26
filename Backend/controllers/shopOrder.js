import Order from "../models/order.js";
import mongoose from "mongoose";

export const index = async (req, res) => {
  const { shopId } = req.params;

  try {
    const { status } = req.query || "";
    const orders = await Order.find({ status: status })
      .populate({
        path: "product",
        populate: {
          path: "shop",
          match: { _id: new mongoose.Types.ObjectId(shopId) },
        },
      })
      .populate("user");

    // const orders = await Order.findAll({ status: status });
    if (!orders) {
      res.status(404).json({ message: "Orders not found" });
    }

    console.log("Orders ", orders);
    res.json(orders);
  } catch (e) {
    res.status(500).json({ message: "Error retrieving the shop orders" });
  }
};

export const update = async (req, res) => {
  console.log("@@ req body: ", req.body);
  try {
    const { orderId } = req.params;
    const order = new Order(req.body);
    await Order.findByIdAndUpdate(orderId, order);
    res.json({
      message: "Order status updated",
      order,
    });
  } catch (e) {
    res.status(500).json({ message: "Error retrieving order status" });
  }
};
