import { usePOS } from '../../context/POSContext';
import { getSection, formatCurrency } from '../../utils/helpers';
import PrepTicket from './PrepTicket';

const KitchenView = () => {
    const { allOrders, menuItems } = usePOS();

    // Filter Logic
    const activeOrders = allOrders
        .map(order => {
            const kitchenItems = order.items
                .map((item, index) => ({ item, originalIndex: index }))
                .filter(({ item }) => getSection(item) === 'kitchen');

            if (kitchenItems.length === 0) return null;

            // Only show if there are unserved items in this section
            const hasUnservedItems = kitchenItems.some(({ item }) => item.status !== 'served');
            if (!hasUnservedItems) return null;

            return { ...order, kitchenItems };
        })
        .filter(Boolean)
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    // Stats
    const todayStr = new Date().toLocaleDateString();
    let kitchenRevenue = 0;
    allOrders.forEach(o => {
        if (new Date(o.timestamp).toLocaleDateString() === todayStr) {
            o.items.forEach(i => {
                if (getSection(i) === 'kitchen') {
                    kitchenRevenue += (i.price * i.qty);
                }
            });
        }
    });

    return (
        <div id="view-kitchen" className="view-section active">
            <header className="page-header">
                <div>
                    {/* Header removed as per user request */}
                </div>
                <div className="stats-pills">
                    <span className="stat-pill">Pending Dishes: <b id="kitchen-pending-count">{activeOrders.length}</b></span>
                    <span className="stat-pill">Kitchen Revenue: <b id="kitchen-revenue">{formatCurrency(kitchenRevenue)}</b></span>
                </div>
            </header>
            <div className="orders-grid" id="kitchen-grid">
                {activeOrders.length === 0 ? (
                    <p style={{ color: '#888', gridColumn: '1/-1', textAlign: 'center', marginTop: '2rem' }}>
                        No active orders in kitchen.
                    </p>
                ) : (
                    activeOrders.map(order => (
                        <PrepTicket
                            key={order.id}
                            order={order}
                            relevantItems={order.kitchenItems}
                            viewContext="Kitchen"
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default KitchenView;
