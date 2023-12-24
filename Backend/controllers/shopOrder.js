import Order from '../models/order.js';

export const index = async (req, res) => {
    try {
        // status toConfirm, toDeliver, completed, cancelled
        // pamentMethod cash shopdeePay
        const { status } = req.query || '';
        const orders = await Order.findAll({status: status});
        if (!orders) {
            res.status(404).json({ message: "Orders not found" });
        }
        res.json(orders);
        
    } catch (e) {
        res.status(500).json({ message: "Error retrieving the shop orders" });
    }
}

export const create = async (req, res) => {
    // const { shopId } = req.params;
    // console.log(req.body);
    const order = new Order(req.body);
    // console.log(order)
    await order.save();

    res.json({
        message: "Order created successfully.",
        order
    })

}

export const update = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = new Order(req.body);
        await Order.findByIdAndUpdate(orderId, order);
        res.json({
            message: "Order status updated",
            order
        })
    } catch (e) {
        res.status(500).json({ message: "Error retrieving order status" });
    }
}