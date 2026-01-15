import { usePOS } from '../../context/POSContext';

const OrderSidebar = ({ onCheckout }) => { // onCheckout prop to trigger success modal
    const { cart, updateQty, currentOrderId, tableNumber, checkout, isMobileCartOpen } = usePOS();

    const subtotal = cart.reduce((sum, item) => sum + (item.variantPrice * item.qty), 0);
    const total = subtotal; // Tax removed as per legacy

    const handleCheckout = () => {
        const order = checkout();
        if (order && onCheckout) {
            onCheckout(order);
        }
    };

    return (
        <aside className={`order-sidebar ${isMobileCartOpen ? 'mobile-visible' : ''}`}> {/* Added logic if needed for mobile overlay styling, or handled by layout class */}
            <div className="sidebar-header">
                <h2>Current Order</h2>
                <div className="order-id">Table {tableNumber} • #{currentOrderId}</div>
            </div>

            <div className="order-items-list" id="order-list">
                {cart.length === 0 ? (
                    <div className="empty-state" style={{ textAlign: 'center', color: '#aaa', marginTop: '2rem' }}>
                        <p>No items added yet</p>
                    </div>
                ) : (
                    cart.map((orderItem, index) => {
                        const displayName = orderItem.name + (orderItem.variantName ? ` (${orderItem.variantName})` : '');

                        return (
                            <div key={index} className="order-item">
                                <div className="item-details">
                                    <h4>{displayName}</h4>
                                    <span className="item-price-calc">Rs. {orderItem.variantPrice} x {orderItem.qty}</span>
                                </div>
                                <div className="item-controls">
                                    <button className="qty-btn" onClick={() => updateQty(index, -1)}>−</button>
                                    <span className="item-qty">{orderItem.qty}</span>
                                    <button className="qty-btn" onClick={() => updateQty(index, 1)}>+</button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {cart.length > 0 && (
                <div className="billing-section">
                    <div className="bill-row">
                        <span>Subtotal</span>
                        <span id="subtotal-price">Rs. {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="bill-row total">
                        <span>Total</span>
                        <span id="total-price">Rs. {total.toLocaleString()}</span>
                    </div>
                    <button className="checkout-btn" onClick={handleCheckout}>
                        <span>Place Order</span>
                    </button>
                </div>
            )}
        </aside>
    );
};

export default OrderSidebar;
