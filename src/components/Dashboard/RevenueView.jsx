import React, { useState } from 'react';
import { usePOS } from '../../context/POSContext';
import { getSection, formatCurrency } from '../../utils/helpers';
import Login from '../Login';

const RevenueView = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { allOrders, menuItems, setActiveView } = usePOS();

    if (!isAuthenticated) {
        return (
            <Login
                onLogin={() => setIsAuthenticated(true)}
                title="Revenue Access"
                password="2728"
                onCancel={() => setActiveView('pos')}
            />
        );
    }

    // 1. Calculate Aggregates
    const todayStr = new Date().toLocaleDateString();
    const todayOrders = allOrders.filter(o => new Date(o.timestamp).toLocaleDateString() === todayStr);
    const todayRevenue = todayOrders.reduce((sum, o) => sum + o.total, 0);
    const totalOrdersCount = allOrders.length;
    const totalRevenueAllTime = allOrders.reduce((sum, o) => sum + o.total, 0);
    const avgOrderValue = totalOrdersCount > 0 ? (totalRevenueAllTime / totalOrdersCount) : 0;
    const allItemsSold = allOrders.reduce((count, o) => count + o.items.reduce((s, i) => s + i.qty, 0), 0);

    // 2. Ranking Logic
    const itemStats = {};

    // Initialize with all kitchen menu items
    menuItems.forEach(mi => {
        if (getSection(mi) === 'kitchen') {
            itemStats[mi.name] = { name: mi.name, qty: 0, revenue: 0 };
        }
    });

    // Process orders
    allOrders.forEach(order => {
        order.items.forEach(item => {
            const section = getSection(item);
            if (section === 'kitchen') {
                if (!itemStats[item.name]) {
                    itemStats[item.name] = { name: item.name, qty: 0, revenue: 0 };
                }
                itemStats[item.name].qty += item.qty;
                itemStats[item.name].revenue += (item.price * item.qty);
            }
        });
    });

    const sortedItems = Object.values(itemStats).sort((a, b) => b.revenue - a.revenue);

    // Lists
    const top5 = sortedItems.slice(0, 5).filter(i => i.revenue > 0);
    const topNames = new Set(top5.map(i => i.name));

    // Least Sold (Revenue > 0, not in top 5, take bottom 5 but display High->Low)
    // Legacy logic: take last 5.
    const potentialLeastSold = sortedItems.filter(i => i.revenue > 0 && !topNames.has(i.name));
    const least5 = potentialLeastSold.slice(-5);
    // Wait, slice(-5) gives last 5 elements. Since array is High->Low, last 5 are Lowest.
    // [100, 90, 80, 20, 10]. slice(-2) -> [20, 10].
    // So order is preserved (Higher of the lowest first). Correct.

    const unsoldList = sortedItems.filter(i => i.qty === 0);

    // 3. Drink Ranking Logic
    const drinkStats = {};

    // Initialize with all bar menu items
    menuItems.forEach(mi => {
        if (getSection(mi) === 'bar') {
            drinkStats[mi.name] = { name: mi.name, qty: 0, revenue: 0 };
        }
    });

    // Process orders for drinks
    allOrders.forEach(order => {
        order.items.forEach(item => {
            const section = getSection(item);
            if (section === 'bar') {
                if (!drinkStats[item.name]) {
                    drinkStats[item.name] = { name: item.name, qty: 0, revenue: 0 };
                }
                drinkStats[item.name].qty += item.qty;
                // Use variantPrice for drinks if available, else price
                drinkStats[item.name].revenue += ((item.variantPrice || item.price) * item.qty);
            }
        });
    });

    const sortedDrinks = Object.values(drinkStats).sort((a, b) => b.revenue - a.revenue);

    const topDrinks = sortedDrinks.slice(0, 5).filter(i => i.revenue > 0);
    const topDrinkNames = new Set(topDrinks.map(i => i.name));

    const potentialLeastDrinks = sortedDrinks.filter(i => i.revenue > 0 && !topDrinkNames.has(i.name));
    const leastDrinks = potentialLeastDrinks.slice(-5);

    const unsoldDrinks = sortedDrinks.filter(i => i.qty === 0);

    return (
        <div id="view-revenue" className="view-section active">
            <header className="page-header">
                <div>
                    {/* Header removed as per user request */}
                </div>
                {/* Stats removed as per user request */}
            </header>

            <div className="revenue-dashboard">
                <div className="revenue-card full-width">
                    <h3>Sales Overview</h3>
                    <div className="financial-stats-grid">
                        <div className="stat-box">
                            <span className="stat-label">Today's Revenue</span>
                            <strong className="stat-value" id="fin-today">{formatCurrency(todayRevenue)}</strong>
                        </div>
                        <div className="stat-box">
                            <span className="stat-label">Total Orders</span>
                            <strong className="stat-value" id="fin-orders">{totalOrdersCount}</strong>
                        </div>
                        <div className="stat-box">
                            <span className="stat-label">Items Sold</span>
                            <strong className="stat-value" id="fin-items">{allItemsSold}</strong>
                        </div>
                    </div>
                </div>

                {/* --- Food Section --- */}
                {/* Header removed */}
                <div className="analytics-grid">
                    <div className="revenue-card">
                        <h3>🏆 Top Selling Dishes</h3>
                        <div className="ranking-list" id="top-selling-list">
                            {top5.length > 0 ? top5.map((item, idx) => (
                                <div key={idx} className="ranking-item top-rank">
                                    <div className="rank-info">
                                        <span className="rank-name text-truncate" title={item.name}>{idx + 1}. {item.name}</span>
                                        <span className="rank-meta">{item.qty} sold</span>
                                    </div>
                                    <div className="rank-stat fixed-price">{formatCurrency(item.revenue)}</div>
                                </div>
                            )) : (
                                <div className="empty-state" style={{ textAlign: 'center', color: '#888' }}>No sales data yet</div>
                            )}
                        </div>
                    </div>

                    <div className="revenue-card">
                        <h3>📉 Least Sold Dishes</h3>
                        <div className="ranking-list" id="least-selling-list">
                            {least5.length > 0 ? least5.map((item, idx) => (
                                <div key={idx} className="ranking-item low-rank">
                                    <div className="rank-info">
                                        <span className="rank-name text-truncate" title={item.name}>{idx + 1}. {item.name}</span>
                                        <span className="rank-meta">{item.qty} sold</span>
                                    </div>
                                    <div className="rank-stat fixed-price">{formatCurrency(item.revenue)}</div>
                                </div>
                            )) : (
                                <div className="empty-state" style={{ textAlign: 'center', color: '#888' }}>No items fit criteria</div>
                            )}
                        </div>
                    </div>

                    <div className="revenue-card">
                        <h3>🧊 Unsold Dishes</h3>
                        <div className="ranking-list" id="unsold-list">
                            {unsoldList.length > 0 ? unsoldList.map((item, idx) => (
                                <div key={idx} className="ranking-item">
                                    <div className="rank-info">
                                        <span className="rank-name text-truncate" title={item.name}>{idx + 1}. {item.name}</span>
                                        <span className="rank-meta" style={{ color: '#ef4444' }}>0 sold</span>
                                    </div>
                                    <div className="rank-stat fixed-price" style={{ color: '#888' }}>-</div>
                                </div>
                            )) : (
                                <div className="empty-state" style={{ textAlign: 'center', color: '#888' }}>All items have been sold! 🎉</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- Drink Section --- */}
                {/* Header removed */}
                <div className="analytics-grid">
                    <div className="revenue-card">
                        <h3>🏆 Top Selling Drinks</h3>
                        <div className="ranking-list" id="top-selling-drinks">
                            {topDrinks.length > 0 ? topDrinks.map((item, idx) => (
                                <div key={idx} className="ranking-item top-rank">
                                    <div className="rank-info">
                                        <span className="rank-name text-truncate" title={item.name}>{idx + 1}. {item.name}</span>
                                        <span className="rank-meta">{item.qty} sold</span>
                                    </div>
                                    <div className="rank-stat fixed-price">{formatCurrency(item.revenue)}</div>
                                </div>
                            )) : (
                                <div className="empty-state" style={{ textAlign: 'center', color: '#888' }}>No sales data yet</div>
                            )}
                        </div>
                    </div>

                    <div className="revenue-card">
                        <h3>📉 Least Sold Drinks</h3>
                        <div className="ranking-list" id="least-selling-drinks">
                            {leastDrinks.length > 0 ? leastDrinks.map((item, idx) => (
                                <div key={idx} className="ranking-item low-rank">
                                    <div className="rank-info">
                                        <span className="rank-name text-truncate" title={item.name}>{idx + 1}. {item.name}</span>
                                        <span className="rank-meta">{item.qty} sold</span>
                                    </div>
                                    <div className="rank-stat fixed-price">{formatCurrency(item.revenue)}</div>
                                </div>
                            )) : (
                                <div className="empty-state" style={{ textAlign: 'center', color: '#888' }}>No items fit criteria</div>
                            )}
                        </div>
                    </div>

                    <div className="revenue-card">
                        <h3>🧊 Unsold Drinks</h3>
                        <div className="ranking-list" id="unsold-drinks">
                            {unsoldDrinks.length > 0 ? unsoldDrinks.map((item, idx) => (
                                <div key={idx} className="ranking-item">
                                    <div className="rank-info">
                                        <span className="rank-name text-truncate" title={item.name}>{idx + 1}. {item.name}</span>
                                        <span className="rank-meta" style={{ color: '#ef4444' }}>0 sold</span>
                                    </div>
                                    <div className="rank-stat fixed-price" style={{ color: '#888' }}>-</div>
                                </div>
                            )) : (
                                <div className="empty-state" style={{ textAlign: 'center', color: '#888' }}>All items have been sold! 🎉</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueView;
