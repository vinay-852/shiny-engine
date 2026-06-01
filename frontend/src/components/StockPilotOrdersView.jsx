import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { api } from '../api/client.js';
import { StockPilotOrderForm } from './StockPilotOrderForm.jsx';
import { StockPilotActions } from './ui/StockPilotActions.jsx';
import { StockPilotDataTable } from './ui/StockPilotDataTable.jsx';
import { StockPilotPage } from './ui/StockPilotPage.jsx';
import { StockPilotSection } from './ui/StockPilotSection.jsx';

export function StockPilotOrdersView({ orders, customers, products, runAction }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const selectOrder = async (id) => {
    setSelectedOrder(await api.getOrder(id));
  };

  const orderColumns = [
    { key: 'id', header: 'Order', render: (order) => `#${order.id}` },
    { key: 'customer', header: 'Customer', render: (order) => order.customer.full_name },
    { key: 'items', header: 'Items', render: (order) => order.items.length },
    { key: 'total_amount', header: 'Total', render: (order) => `$${Number(order.total_amount).toFixed(2)}` },
    {
      key: 'actions',
      header: 'Actions',
      render: (order) => (
        <StockPilotActions>
          <Button size="small" onClick={() => selectOrder(order.id)}>
            View
          </Button>
          <Button
            size="small"
            color="error"
            onClick={() => runAction(() => api.deleteOrder(order.id), 'Order cancelled and stock restored.')}
          >
            Delete
          </Button>
        </StockPilotActions>
      ),
    },
  ];

  const detailColumns = [
    { key: 'product', header: 'Product', render: (item) => item.product.name },
    { key: 'quantity', header: 'Quantity' },
    { key: 'unit_price', header: 'Unit price', render: (item) => `$${Number(item.unit_price).toFixed(2)}` },
    { key: 'line_total', header: 'Line total', render: (item) => `$${Number(item.line_total).toFixed(2)}` },
  ];

  return (
    <StockPilotPage title="Orders" description="Create orders and view order details.">
      <StockPilotSection title="Create Order">
        <StockPilotOrderForm
          customers={customers}
          products={products}
          onSubmit={(payload) => runAction(() => api.createOrder(payload), 'Order created and stock updated.')}
        />
      </StockPilotSection>

      <StockPilotSection title="Order List" padded={false}>
        <StockPilotDataTable columns={orderColumns} rows={orders} getRowKey={(order) => order.id} />
      </StockPilotSection>

      {selectedOrder && (
        <StockPilotSection>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }} sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Order #{selectedOrder.id}
            </Typography>
            <Button onClick={() => setSelectedOrder(null)}>Close</Button>
          </Stack>
          <Typography gutterBottom>Customer: {selectedOrder.customer.full_name}</Typography>
          <Typography gutterBottom>Total: ${Number(selectedOrder.total_amount).toFixed(2)}</Typography>
          <StockPilotDataTable columns={detailColumns} rows={selectedOrder.items} getRowKey={(item) => item.id} />
        </StockPilotSection>
      )}
    </StockPilotPage>
  );
}
