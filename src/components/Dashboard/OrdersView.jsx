import { useState } from 'react';
import { usePOS } from '../../context/POSContext';
import { connectPrinter, printBill } from '../../utils/printer';
import { formatCurrency } from '../../utils/helpers';

const OrdersView = () => {
    const { allOrders, resetSystem, toggleServed, togglePaid, deleteOrder, deleteItemFromOrder, applyDiscount } = usePOS();
    const [printerConnected, setPrinterConnected] = useState(false);

    // Payment Modal State
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [paymentAmounts, setPaymentAmounts] = useState({ cash: '', online: '' });

    const openPaymentModal = (orderId, total) => {
        setSelectedOrderId(orderId);
        setPaymentAmounts({ cash: '', online: total }); // Default full amount to online
        setShowPaymentModal(true);
    };

    const handlePaymentSubmit = () => {
        if (selectedOrderId) {
            const finalCash = parseFloat(paymentAmounts.cash) || 0;
            const finalOnline = parseFloat(paymentAmounts.online) || 0;
            togglePaid(selectedOrderId, { cash: finalCash, online: finalOnline });
            setShowPaymentModal(false);
            setSelectedOrderId(null);
        }
    };

    const handleDiscount = (orderId, currentDiscount) => {
        const discount = prompt('Enter discount amount:', currentDiscount || 0);
        if (discount !== null) {
            applyDiscount(orderId, parseFloat(discount) || 0);
        }
    };

    const sortedOrders = [...allOrders].sort((a, b) => {
        const getPriority = (order) => {
            if (!order.served && !order.paid) return 0;
            if (order.served && !order.paid) return 1;
            if (order.served && order.paid) return 2;
            return 3;
        };

        const diff = getPriority(a) - getPriority(b);
        if (diff !== 0) return diff;

        return new Date(b.timestamp) - new Date(a.timestamp);
    });

    const todayStr = new Date().toLocaleDateString();
    const todaysRevenue = allOrders
        .filter(o => new Date(o.timestamp).toLocaleDateString() === todayStr)
        .reduce((sum, o) => sum + o.total, 0);

    const handleConnectPrinter = async () => {
        const connected = await connectPrinter((status) => setPrinterConnected(status));
        if (connected) setPrinterConnected(true);
    };

    return (
        <div id="view-orders" className="view-section active">
            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Split Payment (Order #{selectedOrderId})</h3>
                        <div className="form-group">
                            <label>Cash Amount</label>
                            <input
                                type="number"
                                value={paymentAmounts.cash}
                                onChange={(e) => setPaymentAmounts({ ...paymentAmounts, cash: e.target.value })}
                                placeholder="0"
                            />
                        </div>
                        <div className="form-group">
                            <label>Online Amount</label>
                            <input
                                type="number"
                                value={paymentAmounts.online}
                                onChange={(e) => setPaymentAmounts({ ...paymentAmounts, online: e.target.value })}
                                placeholder="0"
                            />
                        </div>
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={() => setShowPaymentModal(false)}>Cancel</button>
                            <button className="btn-primary" onClick={handlePaymentSubmit}>Confirm Payment</button>
                        </div>
                    </div>
                </div>
            )}

            <header className="page-header">
                <div>
                    <div className="header-actions-row">
                        <button className="reset-link" onClick={resetSystem}>Reset Day / Clear All</button>
                        <span className="divider">•</span>
                        <button
                            id="btn-connect"
                            className={`theme-connect-btn ${printerConnected ? 'connected' : ''}`}
                            onClick={handleConnectPrinter}
                        >
                            <span className="status-dot"></span>
                            {printerConnected ? 'Connected' : 'Connect Printer'}
                        </button>
                    </div>
                </div>
                <div className="stats-pills">
                    <span className="stat-pill">Total Orders: <b id="stat-count">{allOrders.length}</b></span>
                    <span className="stat-pill">Today's Revenue: <b id="stat-revenue">{formatCurrency(todaysRevenue)}</b></span>
                </div>
            </header>
            <div className="orders-grid" id="all-orders-grid">
                {sortedOrders.length === 0 ? (
                    <p style={{ color: '#888' }}>No orders recorded yet.</p>
                ) : (
                    sortedOrders.map(order => (
                        <div key={order.id} className={`order-ticket ${order.paid ? 'status-paid' : ''} ${order.served ? 'status-served' : ''}`}>
                            <div className="ticket-header">
                                <div>
                                    <span className="ticket-id">#{order.id} • Table {order.table}</span>
                                    <div className="ticket-time">
                                        {new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                                <div className="ticket-status-icons">
                                    {order.served && '🍽️'} {order.paid && '💰'}
                                </div>
                            </div>
                            <div className="ticket-items">
                                {order.paid ? (
                                    <div className="payment-details-summary">
                                        <div style={{ color: '#2ecc71', fontWeight: 'bold', marginBottom: '0.5rem' }}>✓ Payment Complete</div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                            <span>Cash: {formatCurrency(order.paymentDetails?.cash || 0)}</span>
                                            <span>Online: {formatCurrency(order.paymentDetails?.online || 0)}</span>
                                        </div>
                                    </div>
                                ) : (
                                    order.items.map((item, idx) => (
                                        <div key={idx} className="ticket-item-row">
                                            <span>{item.qty}x {item.name}</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <span>Rs. {(item.variantPrice || item.price) * item.qty}</span>
                                                <button className="btn-delete-item" onClick={() => deleteItemFromOrder(order.id, idx)} title="Remove Item">✕</button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="ticket-footer">
                                <div className="ticket-total">
                                    {order.discount > 0 && (
                                        <div style={{ fontSize: '0.9rem', color: '#e74c3c' }}>
                                            Discount: -{formatCurrency(order.discount)}
                                        </div>
                                    )}
                                    Total: {formatCurrency(order.total)}
                                </div>
                                <div className="ticket-actions">
                                    <button className="btn-delete-order" onClick={() => { if (confirm('Delete order?')) deleteOrder(order.id) }} title="Delete Order">🗑️</button>
                                    <button className="action-btn" onClick={() => handleDiscount(order.id, order.discount)} title="Apply Discount">Discount</button>
                                    <button className="action-btn" onClick={() => printBill(order)} title="Print Receipt">🖨</button>

                                    {order.served ? (
                                        <>
                                            <span className="badge badge-success">✓ Served</span>
                                            <button className="undo-btn" onClick={() => toggleServed(order.id)} title="Undo Served">↺</button>
                                        </>
                                    ) : (
                                        <button className="action-btn" onClick={() => toggleServed(order.id)}>Mark Served</button>
                                    )}

                                    {order.paid ? (
                                        <>
                                            <span className="badge badge-success">✓ Paid</span>
                                            <button className="undo-btn" onClick={() => togglePaid(order.id)} title="Undo Paid">↺</button>
                                        </>
                                    ) : (
                                        <button className="action-btn btn-primary" onClick={() => openPaymentModal(order.id, order.total)}>Mark Paid</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OrdersView;
