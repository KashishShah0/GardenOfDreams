import { useState } from 'react';
import { usePOS } from '../../context/POSContext';
import TopBar from './TopBar';
import CategoryScrubber from './CategoryScrubber';
import MenuGrid from './MenuGrid';
import OrderSidebar from './OrderSidebar';
import VariantModal from '../Modals/VariantModal';
import SuccessModal from '../Modals/SuccessModal';

const POSView = () => {
    const { isMobileCartOpen, addToCart } = usePOS();
    const [variantItem, setVariantItem] = useState(null);
    const [lastOrder, setLastOrder] = useState(null);

    const handleVariantSelect = (item) => {
        setVariantItem(item);
    };

    const handleVariantConfirm = (itemId, variantName, price) => {
        addToCart(itemId, variantName, price);
        setVariantItem(null);
    };

    const handleCheckoutSuccess = (order) => {
        setLastOrder(order);
    };

    const closeSuccessModal = () => {
        setLastOrder(null);
    };

    return (
        <div id="view-pos" className="view-section active">
            <div className={`pos-layout ${isMobileCartOpen ? 'show-mobile-cart' : ''}`}>
                <main className="menu-section">
                    <TopBar />
                    <CategoryScrubber />
                    <MenuGrid onVariantSelect={handleVariantSelect} />
                </main>
                <OrderSidebar onCheckout={handleCheckoutSuccess} />
            </div>

            <VariantModal
                item={variantItem}
                isOpen={!!variantItem}
                onClose={() => setVariantItem(null)}
                onConfirm={handleVariantConfirm}
            />

            <SuccessModal
                order={lastOrder}
                isOpen={!!lastOrder}
                onClose={closeSuccessModal}
            />
        </div>
    );
};

export default POSView;
