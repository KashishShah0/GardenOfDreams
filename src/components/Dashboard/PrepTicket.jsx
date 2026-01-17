import { usePOS } from '../../context/POSContext';

const PrepTicket = ({ order, relevantItems, viewContext }) => {
    const { toggleItemStatus, toggleServed } = usePOS();

    // Check if all relevant items are ready
    const allReady = relevantItems.every(({ item }) => item.status === 'ready');

    // Check for preparing state: not all ready, but at least one item is preparing
    const isPreparing = !allReady && relevantItems.some(({ item }) => item.status === 'preparing');

    return (
        <div className={`order-ticket kitchen-ticket ${allReady ? 'all-ready' : ''} ${isPreparing ? 'preparing' : ''}`}>
            <div className="ticket-header">
                <div>
                    <span className="ticket-id">#{order.id} • Table {order.table}</span>
                    <div className="ticket-time">
                        {new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>
                <div>
                    {allReady
                        ? '✅ READY'
                        : (viewContext === 'Bar' ? '🍹 PREP' : '👨‍🍳 PREP')
                    }
                </div>
            </div>
            <div className="ticket-items">
                {relevantItems.map(({ item, originalIndex }) => (
                    <div key={originalIndex} className={`kitchen-item-row ${item.status === 'served' ? 'served' : ''}`}>
                        <div className="k-item-name">
                            <span className="k-item-qty">{item.qty}</span>
                            <span>{item.name}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <button
                                className="status-toggle"
                                data-status={item.status}
                                onClick={() => toggleItemStatus(order.id, originalIndex)}
                            >
                                {item.status}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="ticket-footer">
                <div className="ticket-actions">
                    <button className="action-btn" onClick={() => toggleServed(order.id)}>Mark Served</button>
                </div>
            </div>
        </div>
    );
};

export default PrepTicket;
