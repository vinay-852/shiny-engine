import Button from '@mui/material/Button';
import { useState } from 'react';
import { api } from '../api/client.js';
import { StockPilotProductForm } from './StockPilotProductForm.jsx';
import { StockPilotActions } from './ui/StockPilotActions.jsx';
import { StockPilotDataTable } from './ui/StockPilotDataTable.jsx';
import { StockPilotPage } from './ui/StockPilotPage.jsx';
import { StockPilotSection } from './ui/StockPilotSection.jsx';

export function StockPilotProductsView({ products, runAction }) {
  const [editingProduct, setEditingProduct] = useState(null);

  const saveProduct = (payload) => {
    const action = editingProduct
      ? () => api.updateProduct(editingProduct.id, payload)
      : () => api.createProduct(payload);
    runAction(action, editingProduct ? 'Product updated.' : 'Product created.');
    setEditingProduct(null);
  };

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'sku', header: 'SKU' },
    { key: 'price', header: 'Price', render: (product) => `$${Number(product.price).toFixed(2)}` },
    { key: 'quantity_in_stock', header: 'Stock' },
    {
      key: 'actions',
      header: 'Actions',
      render: (product) => (
        <StockPilotActions>
          <Button size="small" onClick={() => setEditingProduct(product)}>
            Edit
          </Button>
          <Button size="small" color="error" onClick={() => runAction(() => api.deleteProduct(product.id), 'Product deleted.')}>
            Delete
          </Button>
        </StockPilotActions>
      ),
    },
  ];

  return (
    <StockPilotPage title="Products" description="Create, update, and delete product inventory records.">
      <StockPilotSection title={editingProduct ? 'Edit Product' : 'Add Product'}>
        <StockPilotProductForm
          editingProduct={editingProduct}
          onCancelEdit={() => setEditingProduct(null)}
          onSubmit={saveProduct}
        />
      </StockPilotSection>

      <StockPilotSection title="Product List" padded={false}>
        <StockPilotDataTable columns={columns} rows={products} getRowKey={(product) => product.id} />
      </StockPilotSection>
    </StockPilotPage>
  );
}
