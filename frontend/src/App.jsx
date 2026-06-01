import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { CustomersView } from './components/CustomersView.jsx';
import { Dashboard } from './components/Dashboard.jsx';
import { Feedback } from './components/Feedback.jsx';
import { OrdersView } from './components/OrdersView.jsx';
import { ProductsView } from './components/ProductsView.jsx';
import { Shell } from './components/Shell.jsx';
import { useInventoryData } from './hooks/useInventoryData.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { products, customers, orders, loading, message, setMessage, summary, runAction } = useInventoryData();

  return (
    <Shell activeTab={activeTab} onTabChange={setActiveTab}>
      <Feedback message={message} onDismiss={() => setMessage(null)} />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {activeTab === 'dashboard' && <Dashboard summary={summary} />}
          {activeTab === 'products' && <ProductsView products={products} runAction={runAction} />}
          {activeTab === 'customers' && <CustomersView customers={customers} runAction={runAction} />}
          {activeTab === 'orders' && (
            <OrdersView orders={orders} customers={customers} products={products} runAction={runAction} />
          )}
        </>
      )}
    </Shell>
  );
}
