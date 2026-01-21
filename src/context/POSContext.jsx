import { createContext, useState, useContext, useEffect } from 'react';
import { menuItems, categories } from '../data/menuData';
import { getSection } from '../utils/helpers';

const POSContext = createContext();

export const usePOS = () => useContext(POSContext);

export const POSProvider = ({ children }) => {
    // UI State
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeView, setActiveView] = useState('pos'); // pos, orders, kitchen, bar, revenue
    const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);

    // Business Data
    const [cart, setCart] = useState([]);
    const [tableNumber, setTableNumber] = useState('R1');

    // BACKEND DATA
    const [allOrders, setAllOrders] = useState([]);
    const [currentOrderId, setCurrentOrderId] = useState(1);

    // 1. Initial Load & Polling
    let API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/orders';
    // Fix for production where VITE_API_URL might be just the domain
    if (!API_URL.endsWith('/api/orders')) {
        // Remove trailing slash if present before appending
        API_URL = API_URL.replace(/\/$/, '') + '/api/orders';
    }

    const fetchOrders = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setAllOrders(data);

            // Calculate next ID
            if (data.length > 0) {
                const maxId = Math.max(...data.map(o => o.id));
                setCurrentOrderId(maxId + 1);
            } else {
                setCurrentOrderId(1);
            }
        } catch (err) {
            console.error("Failed to fetch orders:", err);
        }
    };

    useEffect(() => {
        fetchOrders(); // Initial fetch
        const interval = setInterval(fetchOrders, 3000); // Poll every 3 seconds
        return () => clearInterval(interval);
    }, []);

    // 2. Actions
    const addToCart = (id, variantName = null, variantPrice = null) => {
        const item = menuItems.find(i => i.id === id);
        if (!item) return;

        const cartItem = {
            ...item,
            variantName,
            variantPrice: variantPrice || item.price,
            qty: 1,
            status: 'pending'
        };

        setCart(prev => {
            const existing = prev.find(i => i.id === id && i.variantName === variantName);
            if (existing) {
                return prev.map(i => (i.id === id && i.variantName === variantName) ? { ...i, qty: i.qty + 1 } : i);
            }
            return [...prev, cartItem];
        });

        // Auto-open mobile cart on add - REMOVED per user request
        // if (window.innerWidth <= 768) setIsMobileCartOpen(true);
    };

    const updateQty = (index, change) => {
        setCart(prev => {
            const newCart = [...prev];
            newCart[index].qty += change;
            if (newCart[index].qty <= 0) return newCart.filter((_, i) => i !== index);
            return newCart;
        });
    };

    const checkout = async () => {
        if (cart.length === 0) return null;

        const total = cart.reduce((sum, item) => sum + (item.variantPrice * item.qty), 0);

        const newOrder = {
            id: currentOrderId,
            table: tableNumber,
            items: cart,
            total: total,
            timestamp: new Date().toISOString(),
            served: false,
            paid: false
        };

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newOrder)
            });

            if (res.ok) {
                const savedOrder = await res.json();
                setCart([]);
                setCurrentOrderId(prev => prev + 1);
                setIsMobileCartOpen(false);
                fetchOrders(); // Refresh immediately
                return savedOrder;
            }
        } catch (err) {
            alert('Failed to place order: ' + err.message);
        }
        return null;
    };

    const toggleServed = async (orderId) => {
        try {
            const order = allOrders.find(o => o.id === orderId);
            if (!order) return;

            await fetch(`${API_URL}/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ served: !order.served })
            });
            fetchOrders();
        } catch (err) {
            console.error(err);
        }
    };

    const togglePaid = async (orderId, paymentDetails = null) => {
        try {
            const order = allOrders.find(o => o.id === orderId);
            if (!order) return;

            const newPaidStatus = paymentDetails ? true : !order.paid;
            const newPaymentDetails = paymentDetails || { cash: 0, online: 0 }; // Reset if unmarking or default

            await fetch(`${API_URL}/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    paid: newPaidStatus,
                    paymentDetails: newPaymentDetails
                })
            });
            fetchOrders();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteOrder = async (orderId) => {
        try {
            await fetch(`${API_URL}/${orderId}`, { method: 'DELETE' });
            fetchOrders();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteItemFromOrder = async (orderId, itemIndex) => {
        const order = allOrders.find(o => o.id === orderId);
        if (!order) return;

        const updatedItems = order.items.filter((_, idx) => idx !== itemIndex);
        const newTotal = updatedItems.reduce((sum, i) => sum + (i.variantPrice || i.price) * i.qty, 0);

        try {
            await fetch(`${API_URL}/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: updatedItems, total: newTotal })
            });
            fetchOrders();
        } catch (err) {
            console.error(err);
        }
    };

    const markItemsServed = async (orderId, itemIndices) => {
        const order = allOrders.find(o => o.id === orderId);
        if (!order) return;

        const updatedItems = [...order.items];
        itemIndices.forEach(index => {
            updatedItems[index] = { ...updatedItems[index], status: 'served' };
        });

        // Check if ALL items are now served
        const allServed = updatedItems.every(i => i.status === 'served');

        try {
            await fetch(`${API_URL}/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: updatedItems, served: allServed })
            });
            fetchOrders();
        } catch (err) {
            console.error(err);
        }
    };

    const toggleItemStatus = async (orderId, itemIndex) => {
        const order = allOrders.find(o => o.id === orderId);
        if (!order) return;

        const updatedItems = [...order.items];
        const currentStatus = updatedItems[itemIndex].status || 'pending';
        const nextStatus = currentStatus === 'pending' ? 'preparing' : (currentStatus === 'preparing' ? 'ready' : (currentStatus === 'ready' ? 'served' : 'pending'));

        updatedItems[itemIndex] = { ...updatedItems[itemIndex], status: nextStatus };

        // Check if ALL items are served (only if we just toggled to served, but good to check always)
        const allServed = updatedItems.every(i => i.status === 'served');

        try {
            await fetch(`${API_URL}/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: updatedItems, served: allServed })
            });
            fetchOrders();
        } catch (err) {
            console.error(err);
        }
    };

    const applyDiscount = async (orderId, discountAmount) => {
        const order = allOrders.find(o => o.id === orderId);
        if (!order) return;

        // Calculate original total from items to ensure accuracy
        const itemsTotal = order.items.reduce((sum, i) => sum + (i.variantPrice || i.price) * i.qty, 0);
        const newTotal = itemsTotal - discountAmount;

        try {
            await fetch(`${API_URL}/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ discount: discountAmount, total: newTotal < 0 ? 0 : newTotal })
            });
            fetchOrders();
        } catch (err) {
            console.error(err);
        }
    };

    const addItemToOrder = async (orderId, itemId, variantName = null, variantPrice = null) => {
        const order = allOrders.find(o => o.id === orderId);
        if (!order) return;

        const itemData = menuItems.find(i => i.id === itemId);
        if (!itemData) return;

        const newItem = {
            ...itemData,
            variantName,
            variantPrice: variantPrice || itemData.price,
            qty: 1,
            status: 'pending'
        };

        // Check if item already exists in order (same id and variant)
        const existingItemIndex = order.items.findIndex(i => i.id === itemId && i.variantName === variantName);
        let updatedItems = [...order.items];

        if (existingItemIndex >= 0) {
            updatedItems[existingItemIndex] = {
                ...updatedItems[existingItemIndex],
                qty: updatedItems[existingItemIndex].qty + 1
            };
        } else {
            updatedItems.push(newItem);
        }

        const newTotal = updatedItems.reduce((sum, i) => sum + (i.variantPrice || i.price) * i.qty, 0);

        try {
            await fetch(`${API_URL}/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: updatedItems, total: newTotal })
            });
            fetchOrders();
        } catch (err) {
            console.error(err);
        }
    };

    const resetSystem = async () => {
        if (!confirm('Are you sure you want to delete ALL history?')) return;
        try {
            await fetch(API_URL, { method: 'DELETE' });
            fetchOrders();
        } catch (err) { console.error(err); }
    };

    const value = {
        menuItems,
        categories,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        cart,
        addToCart,
        updateQty,
        checkout,
        allOrders,
        currentOrderId,
        activeView,
        setActiveView,
        isMobileCartOpen,
        setIsMobileCartOpen,
        tableNumber,
        setTableNumber,
        toggleServed,
        togglePaid: (id, details) => togglePaid(id, details),
        deleteOrder,
        deleteItemFromOrder,
        toggleItemStatus,
        markItemsServed,
        applyDiscount,
        addItemToOrder,
        resetSystem
    };

    return (
        <POSContext.Provider value={value}>
            {children}
        </POSContext.Provider>
    );
};
