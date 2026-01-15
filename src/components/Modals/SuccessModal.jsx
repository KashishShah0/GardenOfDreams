const SuccessModal = ({ order, isOpen, onClose }) => {
    if (!isOpen || !order) return null;

    return (
        <div id="success-modal" className="modal">
            <div className="modal-content">
                <div className="check-animation">✓</div>
                <h3>Order Placed Successfully!</h3>
                <p>Order <strong id="modal-order-id">#{order.id}</strong> for <strong id="modal-table-num">Table {order.table}</strong> has
                    been sent to the kitchen.</p>
                <div className="modal-actions">
                    <button className="secondary-btn" onClick={onClose}>Start New Order</button>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;
