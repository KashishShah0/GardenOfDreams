/* MOCK DATA - Prices in NPR */
const menuItems = [
    {
        id: 1,
        name: "Veg Paneer Momo (Steam)",
        category: "Veg Momo",
        price: 120,
    },
    {
        id: 2,
        name: "Veg Paneer Momo (Fried)",
        category: "Veg Momo",
        price: 140,
    },
    {
        id: 3,
        name: "Veg Paneer Kothey Momo",
        category: "Veg Momo",
        price: 140,
    },
    {
        id: 4,
        name: "Veg Paneer Chilli Momo",
        category: "Veg Momo",
        price: 150,
    },
    {
        id: 5,
        name: "Chicken Momo (Steam)",
        category: "Non-Veg Momo",
        price: 150,
    },
    {
        id: 6,
        name: "Chicken Momo (Fried)",
        category: "Non-Veg Momo",
        price: 160,
    },
    {
        id: 7,
        name: "Chicken Kothey Momo",
        category: "Non-Veg Momo",
        price: 165,
    },
    {
        id: 8,
        name: "Chicken Chilli Momo",
        category: "Non-Veg Momo",
        price: 180,
    },
    {
        id: 9,
        name: "Veg Chowmein",
        category: "Chowmein",
        price: 110,
    },
    {
        id: 10,
        name: "Chicken Chowmein",
        category: "Chowmein",
        price: 140,
    },
    {
        id: 11,
        name: "Veg Fried Rice",
        category: "Fried Rice",
        price: 140,
    },
    {
        id: 12,
        name: "Chicken Fried Rice",
        category: "Fried Rice",
        price: 150,
    },
    {
        id: 13,
        name: "Paneer Fried Rice",
        category: "Fried Rice",
        price: 180,
    },
    {
        id: 15,
        name: "Chicken Chilli",
        category: "Starters",
        price: 260,
    },
    {
        id: 16,
        name: "Chicken Roast",
        category: "Starters",
        price: 250,
    },
    {
        id: 17,
        name: "Paneer Chilli",
        category: "Starters",
        price: 220,
    },
    {
        id: 18,
        name: "Bhatmas Sadeko",
        category: "Sadeko",
        price: 100,
    },
    {
        id: 19,
        name: "Peanut Sadeko",
        category: "Sadeko",
        price: 100,
    },
    {
        id: 20,
        name: "Chicken Sadeko",
        category: "Sadeko",
        price: 220,
    },
    {
        id: 21,
        name: "Wai Wai Sadeko",
        category: "Sadeko",
        price: 120,
    },
    {
        id: 22,
        name: "Paneer Pakoda",
        category: "Starters",
        price: 230,
    },
    {
        id: 23,
        name: "GOD Special Smoky Momo",
        category: "Non-Veg Momo",
        price: 350,
    },
    {
        id: 24,
        name: "Egg Poach",
        category: "Others",
        price: 70,
    },
    {
        id: 25,
        name: "Plain Omelette",
        category: "Others",
        price: 80,
    },
    {
        id: 26,
        name: "Masala Omelette",
        category: "Others",
        price: 100,
    },
    {
        id: 27,
        name: "Keema Noodles",
        category: "Chowmein",
        price: 195,
    },
    {
        id: 28,
        name: "Chicken Jhampat",
        category: "Others",
        price: 150,
    },
    {
        id: 29,
        name: "Veg Jhampat",
        category: "Others",
        price: 130,
    },
    {
        id: 30,
        name: "Black Tea",
        category: "Tea",
        price: 20,
    },
    {
        id: 31,
        name: "Hot Lemon With Honey",
        category: "Tea",
        price: 150,
    },
    {
        id: 32,
        name: "GOD Special Chai",
        category: "Tea",
        price: 30,
    },
    {
        id: 33,
        name: "Big Hookah",
        category: "Hookah",
        price: 500,
    },
    {
        id: 34,
        name: "Small Hookah",
        category: "Hookah",
        price: 400,
    },
    {
        id: 35,
        name: "Extra Coil",
        category: "Hookah",
        price: 40,
    },
    {
        id: 36,
        name: "Surya Red",
        category: "Others",
        price: 30,
    },
    {
        id: 37,
        name: "Shikhar Ice",
        category: "Others",
        price: 25,
    },
    // --- WHISKY ---
    {
        id: 101,
        name: "Red Label",
        category: "Whisky",
        price: 0, // Placeholder, uses variants
        variants: [
            { name: "30ml", price: 300 },
            { name: "60ml", price: 580 },
            { name: "Qtr 180", price: 1700 },
            { name: "Bottle", price: 6800 }
        ]
    },
    {
        id: 102,
        name: "Black Label",
        category: "Whisky",
        price: 0,
        variants: [
            { name: "30ml", price: 400 },
            { name: "60ml", price: 780 },
            { name: "Qtr 180", price: 2300 },
            { name: "Bottle", price: 9200 }
        ]
    },
    {
        id: 103,
        name: "Signature Red",
        category: "Whisky",
        price: 0,
        variants: [
            { name: "30ml", price: 150 },
            { name: "60ml", price: 290 },
            { name: "Qtr 180", price: 850 },
            { name: "Bottle", price: 3350 }
        ]
    },
    {
        id: 104,
        name: "Signature Green",
        category: "Whisky",
        price: 0,
        variants: [
            { name: "30ml", price: 140 },
            { name: "60ml", price: 280 },
            { name: "Qtr 180", price: 820 },
            { name: "Bottle", price: 3200 }
        ]
    },
    {
        id: 105,
        name: "Old Durbar Reserve",
        category: "Whisky",
        price: 0,
        variants: [
            { name: "30ml", price: 165 },
            { name: "60ml", price: 315 },
            { name: "Qtr 180", price: 920 },
            { name: "Bottle", price: 3650 }
        ]
    },
    {
        id: 106,
        name: "Black Chimney",
        category: "Whisky",
        price: 0,
        variants: [
            { name: "30ml", price: 210 },
            { name: "60ml", price: 400 },
            { name: "Qtr 180", price: 1180 },
            { name: "Bottle", price: 4700 }
        ]
    },
    {
        id: 107,
        name: "Black Oak",
        category: "Whisky",
        price: 0,
        variants: [
            { name: "30ml", price: 100 },
            { name: "60ml", price: 145 },
            { name: "Qtr 180", price: 430 },
            { name: "Bottle", price: 860 }
        ]
    },
    // --- RUM ---
    {
        id: 201,
        name: "Khukhri",
        category: "Rum",
        price: 0,
        variants: [
            { name: "30ml", price: 120 },
            { name: "60ml", price: 225 },
            { name: "Qtr 180", price: 650 },
            { name: "Bottle", price: 2250 }
        ]
    },
    {
        id: 202,
        name: "Old Monk",
        category: "Rum",
        price: 0,
        variants: [
            { name: "30ml", price: 120 },
            { name: "60ml", price: 215 },
            { name: "Qtr 180", price: 625 },
            { name: "Bottle", price: 2450 }
        ]
    },
    // --- WINE ---
    {
        id: 301,
        name: "Big Master",
        category: "Wine",
        price: 0,
        variants: [
            { name: "30ml", price: 100 },
            { name: "60ml", price: 125 },
            { name: "Qtr 180", price: 350 },
            { name: "Bottle", price: 1200 }
        ]
    },
    // --- VODKA ---
    {
        id: 401,
        name: "8848",
        category: "Vodka",
        price: 0,
        variants: [
            { name: "30ml", price: 130 },
            { name: "60ml", price: 240 },
            { name: "Qtr 180", price: 700 },
            { name: "Bottle", price: 2600 }
        ]
    },
    {
        id: 402,
        name: "Ruslan",
        category: "Vodka",
        price: 0,
        variants: [
            { name: "30ml", price: 150 },
            { name: "60ml", price: 260 },
            { name: "Qtr 180", price: 720 },
            { name: "Bottle", price: 2660 }
        ]
    },
    // --- BEER ---
    {
        id: 501,
        name: "Tuborg Strong",
        category: "Beer",
        price: 0,
        variants: [
            { name: "650ml", price: 550 },
            { name: "330ml", price: 250 }
        ]
    },
    {
        id: 502,
        name: "Tuborg Gold",
        category: "Beer",
        price: 0,
        variants: [
            { name: "650ml", price: 600 },
            { name: "330ml", price: 260 }
        ]
    },
    {
        id: 503,
        name: "Gorkha Strong",
        category: "Beer",
        price: 0,
        variants: [
            { name: "650ml", price: 500 },
            { name: "330ml", price: 240 }
        ]
    },
    {
        id: 504,
        name: "Carlsberg",
        category: "Beer",
        price: 0,
        variants: [
            { name: "650ml", price: 600 }
        ]
    },
    // --- OTHER DRINKS ---
    {
        id: 601,
        name: "Red Bull",
        category: "Other Drinks",
        price: 220,
    },
    {
        id: 602,
        name: "Apple Cider",
        category: "Other Drinks",
        price: 300,
    },
    {
        id: 603,
        name: "Juice",
        category: "Other Drinks",
        price: 190,
    },
    {
        id: 604,
        name: "Cold Drinks",
        category: "Other Drinks",
        price: 110,
    }
];

const categories = ["all", "Veg Momo", "Non-Veg Momo", "Chowmein", "Fried Rice", "Starters", "Sadeko", "Tea", "Whisky", "Rum", "Wine", "Vodka", "Beer", "Other Drinks", "Hookah", "Others"];

/* STATE & PERSISTENCE */
let currentOrder = [];
let activeCategory = 'all';
let searchQuery = '';
let currentOrderId = 1;

// Load persisted data
let allOrders = JSON.parse(localStorage.getItem('allOrders')) || [];

/* DOM ELEMENTS */
const menuGrid = document.getElementById('menu-grid');
const categoryContainer = document.getElementById('category-filters');
const orderList = document.getElementById('order-list');
const subtotalEl = document.getElementById('subtotal-price');
const taxEl = document.getElementById('tax-price');
const totalEl = document.getElementById('total-price');
const searchInput = document.getElementById('search-input');
const modal = document.getElementById('success-modal');
const variantModal = document.getElementById('variant-modal');
const tableSelect = document.getElementById('table-select');
// New Views
const viewPos = document.getElementById('view-pos');
const viewOrders = document.getElementById('view-orders');
const ordersGrid = document.getElementById('all-orders-grid');
const statCount = document.getElementById('stat-count');
const statRevenue = document.getElementById('stat-revenue');

/* INITIALIZATION */
function init() {
    checkDailyReset();
    renderCategories();
    renderMenu();
    updateHeader(); // Set initial header text
    setupEventListeners();
}

function checkDailyReset() {
    const today = new Date().toLocaleDateString();
    const lastLogin = localStorage.getItem('lastLoginDate');

    // Recovery of current ID from storage if same day
    if (lastLogin === today) {
        currentOrderId = parseInt(localStorage.getItem('currentOrderId')) || 1;
    } else {
        // Reset for new day
        currentOrderId = 1;
        localStorage.setItem('lastLoginDate', today);
        localStorage.setItem('currentOrderId', currentOrderId);
    }
}

/* HELPER: Identify Section */
function getSection(item) {
    if (!item) return 'kitchen'; // Fallback
    // Bar Categories (Tea removed)
    const barCats = ['Hookah', 'Whisky', 'Rum', 'Wine', 'Vodka', 'Beer', 'Other Drinks'];
    if (barCats.includes(item.category)) return 'bar';

    // Special Case: "Others" -> Check name or treat specific items
    if (item.category === 'Others') {
        const barItems = ['Surya Red', 'Shikhar Ice']; // Cigarettes
        if (barItems.includes(item.name)) return 'bar';
    }

    return 'kitchen';
}

/* RENDER FUNCTIONS */
function renderCategories() {
    categoryContainer.innerHTML = categories.map(cat => `
        <button 
            class="cat-pill ${cat === activeCategory ? 'active' : ''}" 
            onclick="setCategory('${cat}')"
        >
            ${capitalize(cat)}
        </button>
    `).join('');
}

/* NAVIGATION */
window.switchView = function (viewName) {
    // Hide all
    viewPos.classList.add('hidden');
    viewOrders.classList.add('hidden');
    document.getElementById('view-kitchen').classList.add('hidden');
    document.getElementById('view-bar').classList.add('hidden');
    document.getElementById('view-revenue').classList.add('hidden');

    // Update Nav Buttons
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

    if (viewName === 'pos') {
        viewPos.classList.remove('hidden');
        document.querySelector(`.nav-btn[onclick="switchView('pos')"]`).classList.add('active');
        // Reset mobile cart view when switching back to POS
        document.querySelector('.pos-layout').classList.remove('show-mobile-cart');
        document.querySelector(`.nav-btn[onclick="toggleMobileCart()"]`).classList.remove('active');
    } else if (viewName === 'kitchen') {
        document.getElementById('view-kitchen').classList.remove('hidden');
        document.querySelector(`.nav-btn[onclick="switchView('kitchen')"]`).classList.add('active');
        if (typeof renderKitchen === 'function') renderKitchen();
    } else if (viewName === 'bar') {
        document.getElementById('view-bar').classList.remove('hidden');
        document.querySelector(`.nav-btn[onclick="switchView('bar')"]`).classList.add('active');
        if (typeof renderBar === 'function') renderBar();
    } else if (viewName === 'revenue') {
        document.getElementById('view-revenue').classList.remove('hidden');
        document.querySelector(`.nav-btn[onclick="switchView('revenue')"]`).classList.add('active');
        if (typeof renderRevenue === 'function') renderRevenue();
    } else {
        viewOrders.classList.remove('hidden');
        document.querySelector(`.nav-btn[onclick="switchView('orders')"]`).classList.add('active');
        renderHistory();
    }
}

/* MOBILE CART TOGGLE */
window.toggleMobileCart = function () {
    // Ensure we are in POS view
    switchView('pos');

    const posLayout = document.querySelector('.pos-layout');
    posLayout.classList.toggle('show-mobile-cart');

    // Toggle active state on Cart button
    const cartBtn = document.querySelector(`.nav-btn[onclick="toggleMobileCart()"]`);
    const menuBtn = document.querySelector(`.nav-btn[onclick="switchView('pos')"]`);

    if (posLayout.classList.contains('show-mobile-cart')) {
        cartBtn.classList.add('active');
        menuBtn.classList.remove('active');
    } else {
        cartBtn.classList.remove('active');
        menuBtn.classList.add('active');
    }
}

function renderMenu() {
    menuGrid.innerHTML = '';

    const filtered = menuItems.filter(item => {
        const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        menuGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #888; padding: 2rem;">No items found.</div>`;
        return;
    }

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-item-card';
        card.onclick = () => addToOrder(item.id);
        card.innerHTML = `
            <div class="card-info">
                <h4>${item.name}</h4>
                <p>${item.description || ''}</p>
            </div>
            <div class="card-footer">
                <span class="price">${item.variants ? 'View Options' : 'Rs. ' + item.price}</span>
                <div class="add-btn">+</div>
            </div>
        `;
        menuGrid.appendChild(card);
    });
}

function renderOrder() {
    orderList.innerHTML = '';
    updateHeader();

    if (currentOrder.length === 0) {
        orderList.innerHTML = `
            <div class="empty-state" style="text-align: center; color: #aaa; margin-top: 2rem;">
                <p>No items added yet</p>
            </div>`;
        updateTotals();
        return;
    }

    currentOrder.forEach((orderItem, index) => {
        const item = menuItems.find(i => i.id === orderItem.id);
        const price = orderItem.variantPrice || item.price;
        // orderItem.variantName is e.g. "30ml"
        const displayName = item.name + (orderItem.variantName ? ` (${orderItem.variantName})` : '');

        const row = document.createElement('div');
        row.className = 'order-item';
        row.innerHTML = `
            <div class="item-details">
                <h4>${displayName}</h4>
                <span class="item-price-calc">Rs. ${price} x ${orderItem.qty}</span>
            </div>
            <div class="item-controls">
                <button class="qty-btn" onclick="updateQty(${index}, -1)">−</button>
                <span class="item-qty">${orderItem.qty}</span>
                <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
            </div>
        `;
        orderList.appendChild(row);
    });

    updateTotals();
}

function updateHeader() {
    const tableNum = tableSelect ? tableSelect.value : '1';
    // Use currentOrderId state
    document.querySelector('.sidebar-header .order-id').textContent = `Table ${tableNum} • #${currentOrderId}`;
}

function renderHistory() {
    ordersGrid.innerHTML = '';

    // Sort by newest first
    const sorted = [...allOrders].reverse();

    // Stats
    statCount.textContent = sorted.length;
    const todayStr = new Date().toLocaleDateString();

    // Calculate paid revenue only? Or all? Usually revenue implies paid. 
    // Let's count all valid orders for now, or just paid ones. 
    // For simplicity, let's track Total Revenue of ALL orders placed today.
    const todaysRevenue = sorted
        .filter(o => new Date(o.timestamp).toLocaleDateString() === todayStr)
        .reduce((sum, o) => sum + o.total, 0);

    statRevenue.textContent = `Rs. ${todaysRevenue.toLocaleString()}`;

    if (sorted.length === 0) {
        ordersGrid.innerHTML = '<p style="color:#888;">No orders recorded yet.</p>';
        return;
    }

    sorted.forEach(order => {
        const ticket = document.createElement('div');
        // Add class if paid for styling visual cues
        ticket.className = `order-ticket ${order.paid ? 'status-paid' : ''} ${order.served ? 'status-served' : ''}`;

        const timeStr = new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const itemsHtml = order.items.map(i => `
            <div class="ticket-item-row">
                <span>${i.qty}x ${i.name}</span>
                <span>Rs. ${i.price * i.qty}</span>
            </div>
        `).join('');

        // Status Actions
        const servedBtn = order.served
            ? `<span class="badge badge-success">✓ Served</span>`
            : `<button class="action-btn" onclick="toggleServed(${order.id})">Mark Served</button>`;

        const paidBtn = order.paid
            ? `<span class="badge badge-success">✓ Paid</span>`
            : `<button class="action-btn btn-primary" onclick="togglePaid(${order.id})">Mark Paid</button>`;

        ticket.innerHTML = `
            <div class="ticket-header">
                <div>
                    <span class="ticket-id">#${order.id} • Table ${order.table}</span>
                    <div class="ticket-time">${timeStr}</div>
                </div>
                <div class="ticket-status-icons">
                    ${order.served ? '🍽️' : ''} ${order.paid ? '💰' : ''}
                </div>
            </div>
            <div class="ticket-items">
                ${itemsHtml}
            </div>
            <div class="ticket-footer">
                <div class="ticket-total">
                    Total: Rs. ${order.total.toLocaleString()}
                </div>
                <div class="ticket-actions">
                    ${servedBtn}
                    ${paidBtn}
                </div>
            </div>
        `;
        ordersGrid.appendChild(ticket);
    });
}


/* KITCHEN LOGIC */
window.renderKitchen = function () {
    const kitchenGrid = document.getElementById('kitchen-grid');
    if (!kitchenGrid) return;
    kitchenGrid.innerHTML = '';

    // Filter orders that HAVE ANY kitchen items
    // (We iterate all active orders, and render them if they contain at least one kitchen item)
    const activeOrders = allOrders
        .filter(o => !o.served && hasKitchenItems(o))
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    const countEl = document.getElementById('kitchen-pending-count');
    if (countEl) countEl.textContent = activeOrders.length;

    // Calculate Kitchen Revenue logic needs update (since order isn't split)
    // Sum of PRICE of all Kitchen items in all orders today
    const todayStr = new Date().toLocaleDateString();
    let kitRev = 0;
    allOrders.forEach(o => {
        if (new Date(o.timestamp).toLocaleDateString() === todayStr) {
            o.items.forEach(i => {
                if (getSection({ category: i.category, name: i.name }) === 'kitchen') {
                    kitRev += (i.price * i.qty);
                }
            });
        }
    });

    const kwRevEl = document.getElementById('kitchen-revenue');
    if (kwRevEl) kwRevEl.textContent = `Rs. ${kitRev.toLocaleString()}`;


    if (activeOrders.length === 0) {
        kitchenGrid.innerHTML = '<p style="color:#888; grid-column: 1/-1; text-align:center; margin-top: 2rem;">No active orders in kitchen.</p>';
        return;
    }

    renderTicketGrid(activeOrders, kitchenGrid, 'Kitchen');
}

/* BAR LOGIC */
window.renderBar = function () {
    const barGrid = document.getElementById('bar-grid');
    if (!barGrid) return;
    barGrid.innerHTML = '';

    const activeOrders = allOrders
        .filter(o => !o.served && hasBarItems(o))
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    const countEl = document.getElementById('bar-pending-count');
    if (countEl) countEl.textContent = activeOrders.length;

    // Calculate Bar Revenue
    const todayStr = new Date().toLocaleDateString();
    let barRev = 0;
    allOrders.forEach(o => {
        if (new Date(o.timestamp).toLocaleDateString() === todayStr) {
            o.items.forEach(i => {
                if (getSection({ category: i.category, name: i.name }) === 'bar') {
                    barRev += (i.price * i.qty);
                }
            });
        }
    });

    const bRevEl = document.getElementById('bar-revenue');
    if (bRevEl) bRevEl.textContent = `Rs. ${barRev.toLocaleString()}`;

    if (activeOrders.length === 0) {
        barGrid.innerHTML = '<p style="color:#888; grid-column: 1/-1; text-align:center; margin-top: 2rem;">No active orders in bar.</p>';
        return;
    }

    renderTicketGrid(activeOrders, barGrid, 'Bar');
}

// Helper to deduce section for old orders
function hasKitchenItems(order) {
    // If ANY item is kitchen
    return order.items.some(i => getSection({ category: i.category || 'Unknown', name: i.name }) === 'kitchen');
}

function hasBarItems(order) {
    return order.items.some(i => getSection({ category: i.category || 'Unknown', name: i.name }) === 'bar');
}

// Shared Ticket Render
function renderTicketGrid(orders, container, sectionLabel) {
    orders.forEach(order => {
        // Filter items for this view
        const targetSection = sectionLabel.toLowerCase(); // 'kitchen' or 'bar'
        const relevantItems = order.items.filter(i => {
            const s = getSection({ category: i.category || 'Unknown', name: i.name });
            return s === targetSection;
        });

        if (relevantItems.length === 0) return; // Should not happen due to filter above, but safe guard

        const ticket = document.createElement('div');
        // Check "Ready" status only for RELEVANT items
        const allReady = relevantItems.every(i => i.status === 'ready');
        ticket.className = `order-ticket kitchen-ticket ${allReady ? 'all-ready' : ''}`;

        const timeStr = new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const itemsHtml = relevantItems.map((item, index) => {
            const status = item.status || 'pending';
            // We need original index? No, we can find it or just use mapped index if we rely on name/price uniqueness?
            // Actually, toggleItemStatus needs exact index in the main order.items array.
            // Let's find the original index.
            const originalIndex = order.items.indexOf(item);

            return `
            <div class="kitchen-item-row">
                <div class="k-item-name">
                    <span class="k-item-qty">${item.qty}</span>
                    <span>${item.name}</span>
                </div>
                <div style="display:flex; align-items:center; gap: 0.5rem">
                    <button 
                        class="status-toggle" 
                        data-status="${status}"
                        onclick="toggleItemStatus(${order.id}, ${originalIndex}, '${sectionLabel}')"
                    >
                        ${status}
                    </button>
                </div>
            </div>
            `;
        }).join('');

        ticket.innerHTML = `
            <div class="ticket-header">
                <div>
                    <span class="ticket-id">#${order.id} • Table ${order.table}</span>
                    <div class="ticket-time">${timeStr}</div>
                </div>
                <div>
                   ${allReady ? '✅ READY' : (sectionLabel === 'Bar' ? '🍹 PREP' : '👨‍🍳 PREP')}
                </div>
            </div>
            <div class="ticket-items">
                ${itemsHtml}
            </div>
            <div class="ticket-footer">
                <div class="ticket-actions">
                     <!-- "Completed" here marks the whole order as served? 
                          Or should we just allow "Mark Served" which hides it from Kitchen?
                          If we mark served, it vanishes from BOTH views if we use 'o.served'.
                          The user asked "send that order into two part".
                          If it is a single order, 'Mark Served' usually implies the whole table is done.
                          Conflict: If Kitchen is done but Bar isn't?
                          Solution: We might need 'served_kitchen' and 'served_bar' flags if we really want them independent on a single order.
                          BUT, for now, let's assume 'Mark Served' clears it from the view. 
                          If I mark served in Kitchen, it shouldn't disappear from Bar if Bar isn't done?
                          This is why splitting orders was better.
                          User said "keep it as single only".
                          Let's relax compliance: The 'Completed' button in a view will only hide it from THAT view?
                          No, 'o.served' is global.
                          Maybe we check if all KITCHEN items are 'ready'?
                          No, "Served" typically means delivered. 
                          
                          Compromise: The button toggles 'served' status for the whole order. 
                          If user wants separate tracking, they really *should* have split orders.
                          Since they insisted on single, they accept single status.
                          I will leave it as "Mark Served" toggles the global status.
                      -->
                     <button class="action-btn" onclick="toggleServed(${order.id})">Mark Served</button>
                </div>
            </div>
        `;
        container.appendChild(ticket);
    });
}

window.toggleItemStatus = function (orderId, itemIndex, viewContext) {
    const order = allOrders.find(o => o.id === orderId);
    if (!order) return;

    const currentStatus = order.items[itemIndex].status || 'pending';
    let newStatus = 'pending';

    if (currentStatus === 'pending') newStatus = 'preparing';
    else if (currentStatus === 'preparing') newStatus = 'ready';
    else if (currentStatus === 'ready') newStatus = 'pending';

    order.items[itemIndex].status = newStatus;
    saveOrders();

    // Re-render appropriate view
    if (viewContext === 'Bar') renderBar();
    else renderKitchen();
}

/* LOGIC FUNCTIONS */
// Global wrapper for onclicks
// Replaces setCategory...
window.setCategory = function (cat) {
    activeCategory = cat;
    renderCategories();
    renderMenu();
}

// Variant Logic
window.addToOrder = function (id) {
    const item = menuItems.find(i => i.id === id);
    if (item.variants && item.variants.length > 0) {
        openVariantModal(item);
    } else {
        // Standard item
        addItemToCart(item.id, null, item.price);
    }
}

function addItemToCart(id, variantName, price) {
    // Check if exactly this combo exists
    const existing = currentOrder.find(item =>
        item.id === id && item.variantName === variantName
    );

    if (existing) {
        existing.qty++;
    } else {
        currentOrder.push({
            id,
            qty: 1,
            variantName: variantName || null,
            variantPrice: price // Store price snapshot or use lookup if dynamic? Snapshot is safer for variants
        });
    }
    renderOrder();
}

window.openVariantModal = function (item) {
    const titleP = document.getElementById('variant-modal-title');
    const grid = document.getElementById('variant-options');

    titleP.textContent = `Select quantity for ${item.name}`;
    grid.innerHTML = item.variants.map(v => `
        <div class="variant-btn" onclick="confirmVariant(${item.id}, '${v.name}', ${v.price})">
            <strong>${v.name}</strong>
            <span>Rs. ${v.price}</span>
        </div>
    `).join('');

    variantModal.classList.remove('hidden');
}

window.closeVariantModal = function () {
    variantModal.classList.add('hidden');
}

window.confirmVariant = function (itemId, vName, vPrice) {
    addItemToCart(itemId, vName, vPrice);
    closeVariantModal();
}

window.updateQty = function (index, change) {
    // We pass index now because IDs are not unique in cart (variants)
    if (currentOrder[index]) {
        currentOrder[index].qty += change;
        if (currentOrder[index].qty <= 0) {
            currentOrder.splice(index, 1);
        }
        renderOrder();
    }
}

function updateTotals() {
    let subtotal = 0;
    currentOrder.forEach(orderItem => {
        // use stored price (handles variants and normal items if we stored normal price too)
        // If normal item didn't store price, fallback look up
        let price = orderItem.variantPrice;
        if (!price) {
            const item = menuItems.find(i => i.id === orderItem.id);
            price = item.price;
        }
        subtotal += price * orderItem.qty;
    });

    const totalEl = document.getElementById('total-price');
    subtotalEl.textContent = `Rs. ${subtotal.toLocaleString()}`;
    totalEl.textContent = `Rs. ${subtotal.toLocaleString()}`;
    return subtotal;
}

/* CHECKOUT LOGIC */
window.checkout = function () {
    if (currentOrder.length === 0) return;

    // Save Order
    const total = updateTotals();
    const newOrder = {
        id: currentOrderId,
        table: tableSelect.value,
        items: currentOrder.map(i => {
            const menuItem = menuItems.find(mi => mi.id === i.id);
            const price = i.variantPrice || menuItem.price;
            const name = menuItem.name + (i.variantName ? ` (${i.variantName})` : '');

            return {
                name: name,
                price: price,
                qty: i.qty,
                status: 'pending', // pending, preparing, ready
                category: menuItem.category
            };
        }),
        total: total,
        timestamp: new Date().toISOString(),
        served: false,
        paid: false
    };

    allOrders.push(newOrder);
    localStorage.setItem('allOrders', JSON.stringify(allOrders));

    // Increment ID
    currentOrderId++;
    localStorage.setItem('currentOrderId', currentOrderId);

    // Show modal with correct ID and Table
    document.getElementById('modal-order-id').textContent = `#${newOrder.id}`;
    document.getElementById('modal-table-num').textContent = `Table ${newOrder.table}`;
    modal.classList.remove('hidden');
}

window.closeModal = function () {
    modal.classList.add('hidden');
    currentOrder = [];
    renderOrder();
}

window.resetSystem = function () {
    if (confirm("Are you sure you want to delete all order history and reset the count to #1? This cannot be undone.")) {
        allOrders = [];
        currentOrderId = 1;
        localStorage.setItem('allOrders', JSON.stringify([]));
        localStorage.setItem('currentOrderId', 1);

        // Also clear today's login so it doesn't try to restore potentially old data if logic changed
        localStorage.setItem('lastLoginDate', new Date().toLocaleDateString());

        renderHistory();
        updateHeader();
        alert("System reset successful.");
    }
}


/* BLUETOOTH PRINTING LOGIC */
let printerDevice = null;
let printerCharacteristic = null;

window.connectPrinter = async function () {
    try {
        const btn = document.getElementById('btn-connect');
        if (printerDevice && printerDevice.gatt.connected) {
            alert('Printer already connected');
            return;
        }

        printerDevice = await navigator.bluetooth.requestDevice({
            filters: [
                { services: ['000018f0-0000-1000-8000-00805f9b34fb'] }, // Standard Printer Service
                { namePrefix: 'Ezo' }, // Fallback text filter
                { namePrefix: 'POS' },
                { namePrefix: 'MTP' }
            ],
            optionalServices: ['000018f0-0000-1000-8000-00805f9b34fb']
        });

        const server = await printerDevice.gatt.connect();
        const service = await server.getPrimaryService('000018f0-0000-1000-8000-00805f9b34fb');
        // Characteristic for Write (standard UUID for many POS printers)
        printerCharacteristic = await service.getCharacteristic('00002af1-0000-1000-8000-00805f9b34fb');

        printerDevice.addEventListener('gattserverdisconnected', onDisconnected);

        // Update UI
        btn.classList.add('connected');
        btn.innerHTML = `<span class="status-dot"></span> Connected`;

        alert(`Connected to ${printerDevice.name}`);

    } catch (error) {
        console.error('Bluetooth Error:', error);
        alert('Failed to connect: ' + error);
    }
}

function onDisconnected() {
    const btn = document.getElementById('btn-connect');
    btn.classList.remove('connected');
    btn.innerHTML = `<span class="status-dot"></span> Connect Printer`;
    alert('Printer disconnected');
}

/* ESC/POS ENCODER */
// Helper to create byte arrays
const ESC = "\x1B";
const GS = "\x1D";
const CTL_LF = "\x0A"; // Line feed

const CMDS = {
    RESET: ESC + "@",
    TEXT_FMT: ESC + "!" + "\x00", // Normal
    TEXT_FMT_BOLD: ESC + "!" + "\x08",
    ALIGN_LEFT: ESC + "a" + "\x00",
    ALIGN_CENTER: ESC + "a" + "\x01",
    ALIGN_RIGHT: ESC + "a" + "\x02",
    PAPER_CUT: GS + "V" + "\x41" + "\x03" // Full cut
};

window.printBill = async function (orderId) {
    const order = allOrders.find(o => o.id === orderId);
    if (!order) return;

    // Check if Bluetooth is ready
    if (printerDevice && printerDevice.gatt.connected && printerCharacteristic) {
        await printViaBluetooth(order);
    } else {
        // Fallback to browser print for verification/older flow
        if (confirm("Printer not connected via Bluetooth. Use standard browser print?")) {
            // Populate standard HTML receipt (as backup)
            populateHtmlReceipt(order);
            window.print();
        } else {
            // Prompt to connect
            connectPrinter();
        }
    }
}

function populateHtmlReceipt(order) {
    // Current HTML Logic reuse
    const dateObj = new Date(order.timestamp);
    document.getElementById('print-date').textContent = dateObj.toLocaleDateString();
    document.getElementById('print-time').textContent = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('print-order-id').textContent = `#${order.id}`;
    document.getElementById('print-table').textContent = order.table;
    document.getElementById('print-subtotal').textContent = `Rs. ${order.total.toLocaleString()}`;
    document.getElementById('print-total').textContent = `Rs. ${order.total.toLocaleString()}`;

    document.getElementById('print-items').innerHTML = order.items.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>${item.price.toLocaleString()}</td>
            <td>${item.qty}</td>
            <td>${(item.price * item.qty).toLocaleString()}</td>
        </tr>
    `).join('');
}

async function printViaBluetooth(order) {
    const encoder = new TextEncoder();
    let data = "";

    // Header
    data += CMDS.RESET;
    data += CMDS.ALIGN_CENTER;
    data += CMDS.TEXT_FMT_BOLD;
    data += "GARDEN OF DREAMS" + CTL_LF;
    data += CMDS.TEXT_FMT; // Normal
    data += "Thamel, Kathmandu" + CTL_LF;
    data += "Tel: +977-1-4700000" + CTL_LF;
    data += CTL_LF;
    data += "RECEIPT" + CTL_LF;
    data += "--------------------------------" + CTL_LF; // 32 chars

    // Details
    data += CMDS.ALIGN_LEFT;
    data += `Inv: #${order.id}`.padEnd(16) + `Date: ${new Date(order.timestamp).toLocaleDateString()}` + CTL_LF;
    data += `Table: ${order.table}`.padEnd(16) + `Time: ${new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` + CTL_LF;

    data += "--------------------------------" + CTL_LF;
    data += "Item           Price Qty   Total" + CTL_LF; // Manually spaced for 32 cols
    // Item: 14, Price: 6, Qty: 4, Total: 8 ?? No that's tight.
    // Let's try flexible manual columns
    data += "--------------------------------" + CTL_LF;

    // Items
    order.items.forEach(item => {
        // Line 1: Name
        data += item.name.substring(0, 32) + CTL_LF;

        // Line 2: Numbers aligned
        // We want:   1200 x 2      2400
        const priceStr = item.price.toString();
        const qtyStr = item.qty.toString();
        const totalStr = (item.price * item.qty).toString();

        // Layout: "    Price x Qty        Total"
        // Indent
        data += `    ${priceStr} x ${qtyStr}`.padEnd(20) + totalStr.padStart(12) + CTL_LF;
    });

    data += "--------------------------------" + CTL_LF;

    // Totals
    data += CMDS.ALIGN_RIGHT;
    data += CMDS.TEXT_FMT_BOLD;
    data += "Sub-Total: Rs. " + order.total.toLocaleString() + CTL_LF;
    data += "Total: Rs. " + order.total.toLocaleString() + CTL_LF;
    data += CMDS.TEXT_FMT; // Reset

    // Footer
    data += CMDS.ALIGN_CENTER;
    data += CTL_LF;
    data += "** THANK YOU !! VISIT AGAIN **" + CTL_LF;
    data += CTL_LF + CTL_LF + CTL_LF; // Feed buffer

    // Send
    // We must send in chunks if too large, but receipts are usually small (< 512 bytes)
    try {
        const buffer = encoder.encode(data);
        await printerCharacteristic.writeValue(buffer);
        // alert('Sent to printer!'); // Optional feedback
    } catch (e) {
        alert('Print failed: ' + e);
    }
}

/* PRINT LOGIC */
window.printLastOrder = function () {
    // The last order is the one just placed, which would be at the end of the array (before any potential sorting/re-fetching)
    // Actually, logic: currentOrderId has already been incremented. So last order is currentOrderId - 1.
    const lastId = parseInt(localStorage.getItem('currentOrderId')) - 1;
    if (lastId > 0) {
        printBill(lastId);
    }
}

/* NEW STATUS FUNCTIONS */
window.toggleServed = function (orderId) {
    const order = allOrders.find(o => o.id === orderId);
    if (order) {
        order.served = !order.served; // Toggle
        saveOrders();
        renderHistory();
        if (typeof renderKitchen === 'function') renderKitchen();
        if (typeof renderBar === 'function') renderBar();
    }
}


window.deleteOrder = function (orderId) {
    if (confirm("Are you sure you want to permanently delete this order?")) {
        allOrders = allOrders.filter(o => o.id !== orderId);
        saveOrders();
        renderHistory();
        if (typeof renderKitchen === 'function') renderKitchen();
        if (typeof renderBar === 'function') renderBar();
    }
}

window.deleteItemFromOrder = function (orderId, itemIndex) {
    if (confirm("Remove this item from the order?")) {
        const order = allOrders.find(o => o.id === orderId);
        if (!order) return;

        // Remove item
        order.items.splice(itemIndex, 1);

        // If no items left, delete order
        if (order.items.length === 0) {
            deleteOrder(orderId);
            return;
        }

        // Recalculate Total
        let newTotal = 0;
        order.items.forEach(i => {
            newTotal += i.price * i.qty;
        });
        order.total = newTotal;

        saveOrders();
        renderHistory();
        if (typeof renderKitchen === 'function') renderKitchen();
        if (typeof renderBar === 'function') renderBar();
    }
}

window.togglePaid = function (orderId) {
    const order = allOrders.find(o => o.id === orderId);
    if (order) {
        order.paid = !order.paid; // Toggle
        saveOrders();
        renderHistory();
    }
}

function saveOrders() {
    localStorage.setItem('allOrders', JSON.stringify(allOrders));
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/* EVENT LISTENERS */
function setupEventListeners() {
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderMenu();
    });

    if (tableSelect) {
        tableSelect.addEventListener('change', () => {
            renderOrder();
        });
    }
}

// Update renderHistory to include Print Button
// We need to override the previous renderHistory function or ensure this new logic is applied.
// Since we are appending, I will overwrite the previous renderHistory definition by redefining it here.
// Javascript allows re-definition if using 'function' or 'var/changeable let'.
// The previous one was 'function renderHistory() {}', so redefining it here works fine.

window.renderHistory = function () {
    ordersGrid.innerHTML = '';

    // Sort by newest first
    const sorted = [...allOrders].reverse();

    // Stats
    statCount.textContent = sorted.length;
    const todayStr = new Date().toLocaleDateString();

    const todaysRevenue = sorted
        .filter(o => new Date(o.timestamp).toLocaleDateString() === todayStr)
        .reduce((sum, o) => sum + o.total, 0);

    statRevenue.textContent = `Rs. ${todaysRevenue.toLocaleString()}`;

    if (sorted.length === 0) {
        ordersGrid.innerHTML = '<p style="color:#888;">No orders recorded yet.</p>';
        return;
    }

    sorted.forEach(order => {
        const ticket = document.createElement('div');
        ticket.className = `order-ticket ${order.paid ? 'status-paid' : ''} ${order.served ? 'status-served' : ''}`;

        const timeStr = new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const itemsHtml = order.items.map((i, idx) => `
            <div class="ticket-item-row">
                <span>
                    ${i.qty}x ${i.name}
                </span>
                <div style="display:flex; align-items:center; gap:0.5rem;">
                    <span>Rs. ${i.price * i.qty}</span>
                    <button class="btn-delete-item" onclick="deleteItemFromOrder(${order.id}, ${idx})" title="Remove Item">✕</button>
                </div>
            </div>
        `).join('');

        const servedBtn = order.served
            ? `<span class="badge badge-success">✓ Served</span> <button class="undo-btn" onclick="toggleServed(${order.id})" title="Undo Served">↺</button>`
            : `<button class="action-btn" onclick="toggleServed(${order.id})">Mark Served</button>`;

        const paidBtn = order.paid
            ? `<span class="badge badge-success">✓ Paid</span> <button class="undo-btn" onclick="togglePaid(${order.id})" title="Undo Paid">↺</button>`
            : `<button class="action-btn btn-primary" onclick="togglePaid(${order.id})">Mark Paid</button>`;

        // Section Text
        const sectionBadge = order.section === 'bar' ? '🍹 Bar' : (order.section === 'kitchen' ? '👨‍🍳 Kitchen' : '📦 Order');

        ticket.innerHTML = `
            <div class="ticket-header">
                <div>
                    <span class="ticket-id">#${order.id} • Table ${order.table}</span>
                    <div class="ticket-time">${sectionBadge} • ${timeStr}</div>
                </div>
                <div class="ticket-status-icons">
                    ${order.served ? '🍽️' : ''} ${order.paid ? '💰' : ''}
                </div>
            </div>
            <div class="ticket-items">
                ${itemsHtml}
            </div>
            <div class="ticket-footer">
                <div class="ticket-total">
                    Total: Rs. ${order.total.toLocaleString()}
                </div>
                <div class="ticket-actions">
                    <button class="btn-delete-order" onclick="deleteOrder(${order.id})" title="Delete Order">🗑️</button>
                    <!-- <button class="action-btn" onclick="printBill(${order.id})" title="Print Receipt">🖨</button> -->
                    <button class="action-btn" onclick="printBill(${order.id})" title="Print Receipt">🖨</button>
                    ${servedBtn}
                    ${paidBtn}
                </div>
            </div>
        `;
        ordersGrid.appendChild(ticket);
    });
}

// Run
init();

/* REVENUE LOGIC */
window.renderRevenue = function () {
    // 1. Calculate Aggregates
    const todayStr = new Date().toLocaleDateString();

    // Financials
    const todayOrders = allOrders.filter(o => new Date(o.timestamp).toLocaleDateString() === todayStr);
    const todayRevenue = todayOrders.reduce((sum, o) => sum + o.total, 0);
    const totalOrdersCount = allOrders.length;
    const totalRevenueAllTime = allOrders.reduce((sum, o) => sum + o.total, 0);
    const avgOrderValue = totalOrdersCount > 0 ? (totalRevenueAllTime / totalOrdersCount) : 0;

    const allItemsSold = allOrders.reduce((count, o) => count + o.items.reduce((s, i) => s + i.qty, 0), 0);

    // Update Header Pills & cards
    const revTotalEl = document.getElementById('rev-total');
    if (revTotalEl) revTotalEl.textContent = `Rs. ${totalRevenueAllTime.toLocaleString()}`;

    const revAovEl = document.getElementById('rev-aov');
    if (revAovEl) revAovEl.textContent = `Rs. ${Math.round(avgOrderValue).toLocaleString()}`;

    const finTodayEl = document.getElementById('fin-today');
    if (finTodayEl) finTodayEl.textContent = `Rs. ${todayRevenue.toLocaleString()}`;

    const finOrdersEl = document.getElementById('fin-orders');
    if (finOrdersEl) finOrdersEl.textContent = totalOrdersCount;

    const finItemsEl = document.getElementById('fin-items');
    if (finItemsEl) finItemsEl.textContent = allItemsSold;

    // 2. Ranking Logic (Item Popularity)
    // Map: ItemName -> { qty, revenue }
    const itemStats = {};

    // Initialize with all menu items (for 0 sales tracking)
    menuItems.forEach(mi => {
        // Only if it's NOT a bar item
        if (getSection(mi) === 'kitchen') {
            itemStats[mi.name] = { name: mi.name, qty: 0, revenue: 0 };
        }
    });

    // Fill with Sales Data
    allOrders.forEach(order => {
        order.items.forEach(item => {
            // Check if item is kitchen
            // We can check item.category if stored, or lookup
            const section = getSection({ category: item.category || 'Unknown', name: item.name }); // Fallback lookup if needed? 
            // Ideally we look up in menuItems to be safe or use what we solved in checkout
            // The item obj in order now has category from checkout fix above. 
            // But for old orders, we might need lookup. 
            // Helper:
            let isKitchen = section === 'kitchen';
            // If section is unknown (old order), check name mapping? 
            // getSection handles it if categories match.

            if (isKitchen) {
                if (!itemStats[item.name]) {
                    // It might be a new item or one we missed in init
                    // Check again if it's kitchen before adding? 
                    if (isKitchen) {
                        itemStats[item.name] = { name: item.name, qty: 0, revenue: 0 };
                    }
                }

                if (itemStats[item.name]) {
                    itemStats[item.name].qty += item.qty;
                    itemStats[item.name].revenue += (item.price * item.qty);
                }
            }
        });
    });

    const sortedItems = Object.values(itemStats).sort((a, b) => {
        // Change: Sort by Revenue Descending
        return b.revenue - a.revenue;
    });

    // Separate items that have sales vs no sales (revenue > 0)
    // Actually, "sales count is exactly zero" for unsold.
    // "revenue value greater than zero" for ranked lists.

    // 1. Top Selling: Top N items from the sorted list (by revenue)
    // Let's take top 5
    const top5 = sortedItems.slice(0, 5).filter(i => i.revenue > 0);

    // Create a Set of names in top 5 to exclude from least sold
    const topNames = new Set(top5.map(i => i.name));

    // 2. Least Sold: From bottom of the same list
    // - Exclude items in Top Selling
    // - Include only items with revenue > 0
    // sortedItems is Descending (High -> Low).
    const potentialLeastSold = sortedItems
        .filter(i => i.revenue > 0 && !topNames.has(i.name));

    // Logic: Pull from the bottom (lowest items).
    // But User wants them displayed based on revenue itself (High -> Low).
    // potentialLeastSold is already High -> Low.
    // We want the *last* 5 items (which are the bottom items), but we want to display them in their current order (which is High -> Low)?
    // Wait. [1000, 900 ... 50, 40].
    // Last 5: [50, 40] (if only 2).
    // If we use slice(-5), we get [50, 40] (if array is long).
    // No, slice(-5) on [100, 90, 80, 70, 60, 50, 40, 30, 20, 10] returns [50, 40, 30, 20, 10].
    // This is High -> Low. This is what user wants (Highest of the lowest first).
    const least5 = potentialLeastSold.slice(-5);

    // 3. Unsold Dishes
    // Logic: "sales count for the specific period is exactly zero" -> qty === 0
    const unsoldList = sortedItems.filter(i => i.qty === 0);


    // Render Lists
    const topListEl = document.getElementById('top-selling-list');
    const leastListEl = document.getElementById('least-selling-list');
    const unsoldListEl = document.getElementById('unsold-list');

    if (topListEl) {
        topListEl.innerHTML = top5.map((item, index) => `
            <div class="ranking-item top-rank">
                <div class="rank-info">
                    <span class="rank-name text-truncate" title="${item.name}">${index + 1}. ${item.name}</span>
                    <span class="rank-meta">${item.qty} sold</span>
                </div>
                <div class="rank-stat fixed-price">Rs. ${item.revenue.toLocaleString()}</div>
            </div>
        `).join('') || '<div class="empty-state" style="text-align:center; color:#888;">No sales data yet</div>';
    }

    if (leastListEl) {
        leastListEl.innerHTML = least5.length > 0 ? least5.map((item, index) => `
            <div class="ranking-item low-rank">
                <div class="rank-info">
                    <span class="rank-name text-truncate" title="${item.name}">${index + 1}. ${item.name}</span>
                    <span class="rank-meta">${item.qty} sold</span>
                </div>
                <div class="rank-stat fixed-price">Rs. ${item.revenue.toLocaleString()}</div>
            </div>
        `).join('') : '<div class="empty-state" style="text-align:center; color:#888;">No items fit criteria</div>';
    }

    if (unsoldListEl) {
        unsoldListEl.innerHTML = unsoldList.length > 0 ? unsoldList.map((item, index) => `
             <div class="ranking-item">
                <div class="rank-info">
                    <span class="rank-name text-truncate" title="${item.name}">${index + 1}. ${item.name}</span>
                    <span class="rank-meta" style="color:#ef4444">0 sold</span>
                </div>
                <div class="rank-stat fixed-price" style="color:#888">-</div>
            </div>
        `).join('') : '<div class="empty-state" style="text-align:center; color:#888;">All items have been sold! 🎉</div>';
    }
}

