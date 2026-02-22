import { useState, useEffect } from 'react'; // Added useState
import { usePOS } from './context/POSContext';
import Layout from './components/Layout';
import POSView from './components/POS/POSView';
import OrdersView from './components/Dashboard/OrdersView';
import KitchenView from './components/Dashboard/KitchenView';
import BarView from './components/Dashboard/BarView';
import RevenueView from './components/Dashboard/RevenueView';
import ReceiptPreview from './components/Common/ReceiptPreview';
import Login from './components/Login'; // Import Login

function App() {
  const { activeView } = usePOS();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Global Auth State

  // Reset all scrollable containers to the top whenever the view changes.
  // Double-rAF ensures we run after the browser's own scroll restoration tick.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.querySelectorAll('.view-section, .menu-section, .order-sidebar').forEach(el => {
          el.scrollTop = 0;
        });
        window.scrollTo(0, 0);
      });
    });
    return () => cancelAnimationFrame(id);
  }, [activeView]);

  const renderView = () => {
    switch (activeView) {
      case 'pos': return <POSView />;
      case 'orders': return <OrdersView />;
      case 'kitchen': return <KitchenView />;
      case 'bar': return <BarView />;
      case 'revenue': return <RevenueView />;
      default: return <POSView />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} title="Site Access" password="1152" />;
  }

  return (
    <Layout>
      {renderView()}
      <ReceiptPreview />
    </Layout>
  );
}

export default App;
