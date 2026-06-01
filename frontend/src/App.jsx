import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { StockPilotCustomersView } from './components/StockPilotCustomersView.jsx';
import { StockPilotDashboard } from './components/StockPilotDashboard.jsx';
import { StockPilotFeedback } from './components/StockPilotFeedback.jsx';
import { StockPilotOrdersView } from './components/StockPilotOrdersView.jsx';
import { StockPilotProductsView } from './components/StockPilotProductsView.jsx';
import { StockPilotShell } from './components/StockPilotShell.jsx';
import { useStockPilotInventoryData } from './hooks/useStockPilotInventoryData.js';

export default function StockPilotApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { products, customers, orders, loading, message, setMessage, summary, runAction } = useStockPilotInventoryData();

  return (
    <StockPilotShell activeTab={activeTab} onTabChange={setActiveTab}>
      <StockPilotFeedback message={message} onDismiss={() => setMessage(null)} />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {activeTab === 'dashboard' && <StockPilotDashboard summary={summary} />}
          {activeTab === 'products' && <StockPilotProductsView products={products} runAction={runAction} />}
          {activeTab === 'customers' && <StockPilotCustomersView customers={customers} runAction={runAction} />}
          {activeTab === 'orders' && (
            <StockPilotOrdersView orders={orders} customers={customers} products={products} runAction={runAction} />
          )}
        </>
      )}
    </StockPilotShell>
  );
}
