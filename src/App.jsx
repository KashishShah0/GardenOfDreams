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

  // On every view change, immediately reset scroll on the relevant container.
  // Single rAF waits for the new view's DOM to be painted before resetting.
  // No scroll-event listeners — they cause iOS to cancel tap gestures.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      document.querySelectorAll(
        '.menu-section, .order-sidebar, .revenue-dashboard, #view-kitchen, #view-orders, #view-bar'
      ).forEach(el => { el.scrollTop = 0; });
      window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(id);
  }, [activeView]);

  const renderView = () => {
    switch (activeView) {
      case 'pos':     return <POSView />;
      case 'orders':  return <OrdersView />;
      case 'kitchen': return <KitchenView />;
      case 'bar':     return <BarView />;
      case 'revenue': return <RevenueView />;
      default:        return <POSView />;
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
