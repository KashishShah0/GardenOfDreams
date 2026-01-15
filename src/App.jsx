import { usePOS } from './context/POSContext';
import Layout from './components/Layout';
import POSView from './components/POS/POSView';
import OrdersView from './components/Dashboard/OrdersView';
import KitchenView from './components/Dashboard/KitchenView';
import BarView from './components/Dashboard/BarView';
import RevenueView from './components/Dashboard/RevenueView';
import ReceiptPreview from './components/Common/ReceiptPreview';

function App() {
  const { activeView } = usePOS();

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

  return (
    <Layout>
      {renderView()}
      <ReceiptPreview />
    </Layout>
  );
}

export default App;
