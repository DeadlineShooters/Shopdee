import Order from "../models/order"

export const index = async (req, res) => {
    try {
        const orders = await Order.find({});
        if (!orders) {
            res.status(404).json({ message: "Orders not found" });
        }
        res.json(orders);
        
    } catch (e) {
        res.status(500).json({ message: "Error retrieving the shop orders" });
    }
}

exp