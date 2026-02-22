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

  // iOS Safari restores overflow-container scroll by firing a 'scroll' event.
  // We intercept every scroll event on all containers for 800ms after a view
  // change and force scrollTop back to 0. After 800ms the guard lifts so
  // normal user scrolling works fine. This avoids programmatic scrollTop calls
  // during a touch (which cancel iOS tap gestures and break button clicks).
  useEffect(() => {
    const containers = Array.from(document.querySelectorAll(
      '.menu-section, .order-sidebar, .revenue-dashboard, #view-kitchen, #view-orders, #view-bar'
    ));

    // Immediate reset on view change
    containers.forEach(el => { el.scrollTop = 0; });
    window.scrollTo(0, 0);

    let active = true;
    const entries = containers.map(el => {
      const handler = () => { if (active) el.scrollTop = 0; };
      el.addEventListener('scroll', handler, { passive: true });
      return { el, handler };
    });

    // Stop intercepting after 800 ms so the user can scroll normally
    const guard = setTimeout(() => { active = false; }, 800);

    return () => {
      clearTimeout(guard);
      active = false;
      entries.forEach(({ el, handler }) => el.removeEventListener('scroll', handler));
    };
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
