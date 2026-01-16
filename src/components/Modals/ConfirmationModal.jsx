const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modal" style={{ display: 'flex' }}>
            <div className="modal-content">
                <div style={{ marginBottom: '1rem', fontSize: '2rem', color: '#ff9800' }}>?</div>
                <h3>{title}</h3>
                <p>{message}</p>
                <div className="modal-actions">
                    <button className="secondary-btn" onClick={onClose}>Cancel</button>
                    <button className="primary-btn" onClick={onConfirm} style={{ marginLeft: '1rem' }}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
