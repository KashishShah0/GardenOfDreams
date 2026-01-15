const VariantModal = ({ item, isOpen, onClose, onConfirm }) => {
    if (!isOpen || !item) return null;

    return (
        <div id="variant-modal" className="modal">
            <div className="modal-content">
                <h3>Select Quantity</h3>
                <p id="variant-modal-title">Choose an option for {item.name}</p>
                <div id="variant-options" className="variant-grid">
                    {item.variants.map((v, idx) => (
                        <div key={idx} className="variant-btn" onClick={() => onConfirm(item.id, v.name, v.price)}>
                            <strong>{v.name}</strong>
                            <span>Rs. {v.price}</span>
                        </div>
                    ))}
                </div>
                <div className="modal-actions">
                    <button className="secondary-btn" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default VariantModal;
