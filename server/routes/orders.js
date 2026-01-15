const router = require('express').Router();
const Order = require('../models/Order');

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new order
router.post('/', async (req, res) => {
    try {
        const order = new Order(req.body);
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update order (served/paid/items)
router.put('/:id', async (req, res) => {
    try {
        // Use findOne with the custom 'id' field, NOT _id
        const order = await Order.findOne({ id: req.params.id });
        if (!order) return res.status(404).json({ message: 'Order not found' });

        if (req.body.served !== undefined) order.served = req.body.served;
        if (req.body.paid !== undefined) order.paid = req.body.paid;
        if (req.body.items !== undefined) order.items = req.body.items;
        if (req.body.total !== undefined) order.total = req.body.total;

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete order
router.delete('/:id', async (req, res) => {
    try {
        await Order.findOneAndDelete({ id: req.params.id });
        res.json({ message: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Reset System (Delete All)
router.delete('/', async (req, res) => {
    try {
        await Order.deleteMany({});
        res.json({ message: 'System reset' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
