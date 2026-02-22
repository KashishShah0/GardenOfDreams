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
  // Triple-layer (double-rAF + 300ms) covers every phone timing variant.
  useEffect(() => {
    const reset = () => {
      document.querySelectorAll(
        '.view-section, .menu-section, .order-sidebar, .revenue-dashboard, #view-kitchen, #view-orders, #view-bar'
      ).forEach(el => { el.scrollTop = 0; });
      window.scrollTo(0, 0);
    };
    const id1 = requestAnimationFrame(() => {
      const id2 = requestAnimationFrame(reset);
      return () => cancelAnimationFrame(id2);
    });
    const t1 = setTimeout(reset, 100);
    const t2 = setTimeout(reset, 300);
    return () => {
      cancelAnimationFrame(id1);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [activeView]);

  const renderView = () => {
    switch (activeView) {
      case 'pos':     return <POSView     key={activeView} />;
      case 'orders':  return <OrdersView  key={activeView} />;
      case 'kitchen': return <KitchenView key={activeView} />;
      case 'bar':     return <BarView     key={activeView} />;
      case 'revenue': return <RevenueView key={activeView} />;
      default:        return <POSView     key={activeView} />;
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
