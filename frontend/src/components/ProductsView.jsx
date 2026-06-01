import Button from '@mui/material/Button';
import { useState } from 'react';
import { api } from '../api/client.js';
import { ProductForm } from './ProductForm.jsx';
import { Actions } from './ui/Actions.jsx';
import { DataTable } from './ui/DataTable.jsx';
import { Page } from './ui/Page.jsx';
import { Section } from './ui/Section.jsx';

export function ProductsView({ products, runAction }) {
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
        <Actions>
          <Button size="small" onClick={() => setEditingProduct(product)}>
            Edit
          </Button>
          <Button size="small" color="error" onClick={() => runAction(() => api.deleteProduct(product.id), 'Product deleted.')}>
            Delete
          </Button>
        </Actions>
      ),
    },
  ];

  return (
    <Page title="Products" description="Create, update, and delete product inventory records.">
      <Section title={editingProduct ? 'Edit Product' : 'Add Product'}>
        <ProductForm
          editingProduct={editingProduct}
          onCancelEdit={() => setEditingProduct(null)}
          onSubmit={saveProduct}
        />
      </Section>

      <Section title="Product List" padded={false}>
        <DataTable columns={columns} rows={products} getRowKey={(product) => product.id} />
      </Section>
    </Page>
  );
}
