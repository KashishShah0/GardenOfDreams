const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true }, // Custom ID to match legacy behavior
    table: { type: String, required: true },
    items: { type: Array, required: true },
    total: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
    served: { type: Boolean, default: false },
    paid: { type: Boolean, default: false }
});

module.exports = mongoose.model('Order', OrderSchema);
