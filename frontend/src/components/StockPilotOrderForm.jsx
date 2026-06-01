import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useMemo, useState } from 'react';
import { StockPilotFormActions } from './ui/StockPilotFormActions.jsx';

export function StockPilotOrderForm({ customers, products, onSubmit }) {
  const [customerId, setCustomerId] = useState('');
  const [items, setItems] = useState([{ product_id: '', quantity: 1 }]);

  const productMap = useMemo(() => new Map(products.map((product) => [String(product.id), product])), [products]);
  const estimatedTotal = items.reduce((sum, item) => {
    const product = productMap.get(String(item.product_id));
    return sum + (product ? Number(product.price) * Number(item.quantity || 0) : 0);
  }, 0);

  const updateItem = (index, field, value) => {
    setItems((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      customer_id: Number(customerId),
      items: items.map((item) => ({
        product_id: Number(item.product_id),
        quantity: Number(item.quantity),
      })),
    });
    setCustomerId('');
    setItems([{ product_id: '', quantity: 1 }]);
  };

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit}>
      <TextField select label="Customer" value={customerId} onChange={(event) => setCustomerId(event.target.value)} required>
        {customers.map((customer) => (
          <MenuItem value={customer.id} key={customer.id}>
            {customer.full_name}
          </MenuItem>
        ))}
      </TextField>

      {items.map((item, index) => (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} key={index}>
          <TextField
            select
            fullWidth
            label="Product"
            value={item.product_id}
            onChange={(event) => updateItem(index, 'product_id', event.target.value)}
            required
          >
            {products.map((product) => (
              <MenuItem value={product.id} key={product.id}>
                {product.name} ({product.quantity_in_stock} in stock)
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Quantity"
            type="number"
            inputProps={{ min: 1, step: 1 }}
            value={item.quantity}
            onChange={(event) => updateItem(index, 'quantity', event.target.value)}
            required
            sx={{ width: { xs: '100%', sm: 160 } }}
          />
          <Button
            type="button"
            color="error"
            disabled={items.length === 1}
            onClick={() => setItems((current) => current.filter((_, itemIndex) => itemIndex !== index))}
          >
            Remove
          </Button>
        </Stack>
      ))}

      <StockPilotFormActions>
        <Button type="button" onClick={() => setItems((current) => [...current, { product_id: '', quantity: 1 }])}>
          Add Item
        </Button>
        <Typography sx={{ flexGrow: 1 }}>Estimated total: ${estimatedTotal.toFixed(2)}</Typography>
        <Button variant="contained" type="submit">
          Create Order
        </Button>
      </StockPilotFormActions>
    </Stack>
  );
}
