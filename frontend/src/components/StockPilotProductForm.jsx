import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { StockPilotFormActions } from './ui/StockPilotFormActions.jsx';

const emptyProduct = {
  name: '',
  sku: '',
  price: '',
  quantity_in_stock: '',
};

export function StockPilotProductForm({ editingProduct, onCancelEdit, onSubmit }) {
  const [form, setForm] = useState(emptyProduct);

  useEffect(() => {
    setForm(editingProduct || emptyProduct);
  }, [editingProduct]);

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      name: form.name.trim(),
      sku: form.sku.trim(),
      price: Number(form.price),
      quantity_in_stock: Number(form.quantity_in_stock),
    });
    if (!editingProduct) setForm(emptyProduct);
  };

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit}>
      <TextField label="Product name" value={form.name} onChange={(event) => update('name', event.target.value)} required />
      <TextField label="SKU/code" value={form.sku} onChange={(event) => update('sku', event.target.value)} required />
      <TextField
        label="Price"
        type="number"
        inputProps={{ min: 0, step: '0.01' }}
        value={form.price}
        onChange={(event) => update('price', event.target.value)}
        required
      />
      <TextField
        label="Quantity in stock"
        type="number"
        inputProps={{ min: 0, step: 1 }}
        value={form.quantity_in_stock}
        onChange={(event) => update('quantity_in_stock', event.target.value)}
        required
      />
      <StockPilotFormActions>
        <Button variant="contained" type="submit">
          {editingProduct ? 'Update Product' : 'Add Product'}
        </Button>
        {editingProduct && (
          <Button type="button" onClick={onCancelEdit}>
            Cancel
          </Button>
        )}
      </StockPilotFormActions>
    </Stack>
  );
}
