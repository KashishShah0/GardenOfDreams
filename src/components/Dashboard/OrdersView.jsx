import { useState } from 'react';
import { usePOS } from '../../context/POSContext';
import { connectPrinter, printBill } from '../../utils/printer';
import { formatCurrency } from '../../utils/helpers';

const OrdersView = () => {
    const { allOrders, resetSystem, toggleServed, togglePaid, deleteOrder, deleteItemFromOrder } = usePOS();
    const [printerConnected, setPrinterConnected] = useState(false);

    const sortedOrders = [...allOrders].reverse();

    // Stats
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
            <header className="page-header">
                <div>
                    {/* Header removed */}
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
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="ticket-item-row">
                                        <span>{item.qty}x {item.name}</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span>Rs. {(item.variantPrice || item.price) * item.qty}</span>
                                            <button className="btn-delete-item" onClick={() => deleteItemFromOrder(order.id, idx)} title="Remove Item">✕</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="ticket-footer">
                                <div className="ticket-total">
                                    Total: {formatCurrency(order.total)}
                                </div>
                                <div className="ticket-actions">
                                    <button className="btn-delete-order" onClick={() => { if (confirm('Delete order?')) deleteOrder(order.id) }} title="Delete Order">🗑️</button>
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
                                        <button className="action-btn btn-primary" onClick={() => togglePaid(order.id)}>Mark Paid</button>
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
