import { usePOS } from '../../context/POSContext';

const MenuGrid = ({ onVariantSelect }) => {
    const { menuItems, activeCategory, searchQuery, addToCart } = usePOS();

    const filtered = menuItems.filter(item => {
        const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleItemClick = (item) => {
        if (item.variants && item.variants.length > 0) {
            onVariantSelect(item);
        } else {
            addToCart(item.id);
        }
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
                        <div className="add-btn">+</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MenuGrid;
