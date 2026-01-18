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

        // Emit Socket Event
        if (req.io) {
            req.io.emit('new_order', { order: newOrder });
            console.log('New order emitted via socket');
        }

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

        // Logic to detect if a specific item became "ready"
        if (req.body.items && req.io) {
            const oldItems = order.items;
            const newItems = req.body.items;

            newItems.forEach((newItem, index) => {
                const oldItem = oldItems[index]; // Assuming index preserves order which it should
                if (oldItem && oldItem.status !== 'ready' && newItem.status === 'ready') {
                    req.io.emit('item_ready', {
                        orderId: order.id,
                        table: order.table,
                        item: newItem
                    });
                    console.log(`Item ready event emitted: Order ${order.id}, Item ${newItem.name}`);
                }
            });
        }

        if (req.body.served !== undefined) order.served = req.body.served;
        if (req.body.paid !== undefined) order.paid = req.body.paid;
        if (req.body.items !== undefined) order.items = req.body.items;
        if (req.body.total !== undefined) order.total = req.body.total;
        if (req.body.discount !== undefined) order.discount = req.body.discount;
        if (req.body.paymentDetails !== undefined) order.paymentDetails = req.body.paymentDetails;

        const updatedOrder = await order.save();

        // Emit general update
        if (req.io) {
            req.io.emit('order_updated', { order: updatedOrder });
        }

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
