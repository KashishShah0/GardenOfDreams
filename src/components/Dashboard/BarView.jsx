import { usePOS } from '../../context/POSContext';
import { getSection, formatCurrency } from '../../utils/helpers';
import PrepTicket from './PrepTicket';

const BarView = () => {
    const { allOrders } = usePOS();

    // Filter Logic
    const activeOrders = allOrders
        .filter(o => !o.served)
        .map(order => {
            const barItems = order.items
                .map((item, index) => ({ item, originalIndex: index }))
                .filter(({ item }) => getSection(item) === 'bar');

            if (barItems.length === 0) return null;
            return { ...order, barItems };
        })
        .filter(Boolean)
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    // Stats
    const todayStr = new Date().toLocaleDateString();
    let barRevenue = 0;
    allOrders.forEach(o => {
        if (new Date(o.timestamp).toLocaleDateString() === todayStr) {
            o.items.forEach(i => {
                if (getSection(i) === 'bar') {
                    barRevenue += ((i.variantPrice || i.price) * i.qty);
                }
            });
        }
    });

    return (
        <div id="view-bar" className="view-section active">
            <header className="page-header">
                <div>
                    {/* Header removed as per user request */}
                </div>
                <div className="stats-pills">
                    <span className="stat-pill">Pending Drinks: <b id="bar-pending-count">{activeOrders.length}</b></span>
                    <span className="stat-pill">Bar Revenue: <b id="bar-revenue">{formatCurrency(barRevenue)}</b></span>
                </div>
            </header>
            <div className="orders-grid" id="bar-grid">
                {activeOrders.length === 0 ? (
                    <p style={{ color: '#888', gridColumn: '1/-1', textAlign: 'center', marginTop: '2rem' }}>
                        No active orders in bar.
                    </p>
                ) : (
                    activeOrders.map(order => (
                        <PrepTicket
                            key={order.id}
                            order={order}
                            relevantItems={order.barItems}
                            viewContext="Bar"
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default BarView;
