import { useState, useEffect } from 'react';
import { usePOS } from '../../context/POSContext';
import MenuGrid from '../POS/MenuGrid';
import CategoryScrubber from '../POS/CategoryScrubber';
import VariantModal from '../Modals/VariantModal';

const AddItemModal = ({ order, onClose }) => {
    const { addItemToOrder, searchQuery, setSearchQuery } = usePOS();
    const [variantItem, setVariantItem] = useState(null);

    // Reset search on mount and unmount
    useEffect(() => {
        setSearchQuery('');
        return () => setSearchQuery('');
    }, [setSearchQuery]);

    const handleItemSelect = (item) => {
        addItemToOrder(order.id, item.id);
        // We can optionally close here, or keep open for more items. 
        // User request implied "add dishes", potentially plural, so keeping open is better.
        // But maybe a toast would be nice? For now, we rely on the background update or a simple alert if needed, 
        // but looking at POSContext, it just updates. 
        // Let's keep it open.
    };

    const handleVariantSelect = (item) => {
        setVariantItem(item);
    };

    const handleVariantConfirm = (itemId, variantName, price) => {
        addItemToOrder(order.id, itemId, variantName, price);
        setVariantItem(null);
    };

    return (
        <div className="modal-overlay">
            <div className="add-item-modal-content" style={{
                background: 'var(--bg-secondary)',
                width: '90%',
                maxWidth: '1000px',
                height: '85vh',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid var(--border-color)'
            }}>
                <header style={{
                    padding: '1rem',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'var(--bg-card)'
                }}>
                    <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Add Items to Order #{order.id} (Table {order.table})</h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '1.5rem',
                            color: 'var(--text-secondary)',
                            cursor: 'pointer'
                        }}
                    >
                        ✕
                    </button>
                </header>

                <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '1rem 1rem 0.5rem 1rem' }}>
                        <input
                            type="text"
                            placeholder="Search items..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid var(--border-color)',
                                backgroundColor: 'var(--bg-primary)',
                                color: 'var(--text-primary)',
                                fontSize: '1rem',
                                marginBottom: '0.5rem'
                            }}
                            autoFocus
                        />
                        <CategoryScrubber />
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                        <MenuGrid
                            onVariantSelect={handleVariantSelect}
                            onItemSelect={handleItemSelect}
                        />
                    </div>
                </div>

                <VariantModal
                    item={variantItem}
                    isOpen={!!variantItem}
                    onClose={() => setVariantItem(null)}
                    onConfirm={handleVariantConfirm}
                />
            </div>
        </div>
    );
};

export default AddItemModal;
