import Order from "../models/order.js";
import Product from "../models/product.js";
import mongoose from "mongoose";

export const index = async (req, res) => {
  const { shopId } = req.params;

  console.log("@@ shop id: " + shopId);
  try {
    const { status } = req.query || "";
    console.log("@@ status: " + status);
    // find all products of the shop, and then find all orders that have these products.
    const productIds = (await Product.find({ shop: shopId })).map((product) => product._id);
    const orders = await Order.find({ status: status, product: { $in: productIds } })
      .populate({
        path: "product",
        populate: {
          path: "shop",
        },
      })
      .populate("user");

    console.log("@@ Orders ", orders);
    // const orders = await Order.findAll({ status: status });
    if (!orders) {
      res.status(404).json({ message: "Orders not found" });
    }

    res.json(orders);
  } catch (e) {
    console.error("Error fetching orders:", e);
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

export const create = async (req, res) => {
  console.log(req.body);
  const order = new Order(req.body);
  await order.save();
  res.json({
    message: "Order created successfully.",
    order,
  });
};
