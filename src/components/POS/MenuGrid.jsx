import { useState } from 'react';
import { usePOS } from '../../context/POSContext';
import ConfirmationModal from '../Modals/ConfirmationModal';

const MenuGrid = ({ onVariantSelect, onItemSelect }) => {
    const { menuItems, activeCategory, searchQuery, addToCart } = usePOS();
    const [confirmationData, setConfirmationData] = useState({ isOpen: false, item: null });

    const filtered = menuItems.filter(item => {
        const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Handle card click - behavior now isolates add to cart only to plus button
    const handleItemClick = (item) => {
        if (item.variants && item.variants.length > 0) {
            onVariantSelect(item);
        } else {
            // Do nothing for simple items on card click as requested by user
        }
    };

    const handlePlusClick = (e, item) => {
        e.stopPropagation(); // Stop bubbling to card click
        if (item.variants && item.variants.length > 0) {
            onVariantSelect(item);
            // Alternatively, could show confirmation then variant select, but variant select is its own confirmation.
        } else {
            setConfirmationData({ isOpen: true, item });
        }
    };

    const confirmAddToCart = () => {
        if (confirmationData.item) {
            if (onItemSelect) {
                onItemSelect(confirmationData.item);
            } else {
                addToCart(confirmationData.item.id);
            }
        }
        setConfirmationData({ isOpen: false, item: null });
    };

    if (filtered.length === 0) {
        return (
            <div className="menu-grid" id="menu-grid">
                <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#888', padding: '2rem' }}>
                    No items found.
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="menu-grid" id="menu-grid">
                {filtered.map(item => (
                    <div key={item.id} className="menu-item-card" onClick={() => handleItemClick(item)}>
                        <div className="card-info">
                            <h4>{item.name}</h4>
                            <p>{item.description || ''}</p>
                        </div>
                        <div className="card-footer">
                            <span className="price">
                                {item.variants ? 'View Options' : `Rs. ${item.price}`}
                            </span>
                            <div className="add-btn" onClick={(e) => handlePlusClick(e, item)}>+</div>
                        </div>
                    </div>
                ))}
            </div>

            <ConfirmationModal
                isOpen={confirmationData.isOpen}
                onClose={() => setConfirmationData({ isOpen: false, item: null })}
                onConfirm={confirmAddToCart}
                title={onItemSelect ? "Add Item" : "Add to Cart"}
                message={`Are you sure you want to add "${confirmationData.item?.name}"?`}
            />
        </>
    );
};

export default MenuGrid;
