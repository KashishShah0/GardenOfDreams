import { usePOS } from '../context/POSContext';

const Sidebar = () => {
    const { activeView, setActiveView, isMobileCartOpen, setIsMobileCartOpen } = usePOS();

    const navItems = [
        {
            id: 'pos',
            label: 'Menu',
            icon: (
                <svg width="24" height="24" fill="none" className="icon" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            )
        },
        {
            id: 'orders',
            label: 'Orders',
            icon: (
                <svg width="24" height="24" fill="none" className="icon" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
            )
        },
        {
            id: 'kitchen',
            label: 'Kitchen',
            icon: (
                <svg width="24" height="24" fill="none" className="icon" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
            )
        },
        {
            id: 'bar',
            label: 'Bar',
            icon: (
                <svg width="24" height="24" fill="none" className="icon" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
            )
        },
        {
            id: 'revenue',
            label: 'Revenue',
            icon: (
                <svg width="24" height="24" fill="none" className="icon" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
            )
        }
    ];

    const toggleCart = () => {
        setIsMobileCartOpen(!isMobileCartOpen);
        // If we open cart, we usually stay on POS view, but logically in mobile it's an overlay or separate view state
        if (!isMobileCartOpen) {
            setActiveView('pos'); // Ensure we are on POS
        }
    };

    return (
        <nav className="nav-rail">
            <div className="nav-brand">
                {/* Logo removed as per user request */}
            </div>
            <div className="nav-items">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        className={`nav-btn ${activeView === item.id && !isMobileCartOpen ? 'active' : ''}`}
                        onClick={() => { setActiveView(item.id); setIsMobileCartOpen(false); }}
                        title={item.label}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </button>
                ))}

                {/* Mobile Only Cart Toggle */}
                <button
                    className={`nav-btn mobile-only ${isMobileCartOpen ? 'active' : ''}`}
                    onClick={toggleCart}
                    title="Current Order"
                >
                    <svg width="24" height="24" fill="none" className="icon" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    <span>Cart</span>
                </button>
            </div>
            <div className="nav-footer">

            </div>
        </nav>
    );
};

export default Sidebar;
