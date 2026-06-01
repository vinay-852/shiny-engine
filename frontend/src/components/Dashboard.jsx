import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { DataTable } from './ui/DataTable.jsx';
import { Page } from './ui/Page.jsx';
import { Section } from './ui/Section.jsx';

export function Dashboard({ summary }) {
  const metrics = [
    { label: 'Products', value: summary.totalProducts },
    { label: 'Customers', value: summary.totalCustomers },
    { label: 'Orders', value: summary.totalOrders },
    { label: 'Low stock', value: summary.lowStockProducts.length },
  ];

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'sku', header: 'SKU' },
    { key: 'quantity_in_stock', header: 'Stock' },
  ];

  return (
    <Page title="Dashboard" description="Overview of products, customers, orders, and inventory alerts.">
      <Box className="metric-grid">
        {metrics.map((metric) => (
          <Card key={metric.label} variant="outlined">
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                {metric.label}
              </Typography>
              <Typography variant="h4">{metric.value}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Section title="Low Stock Products" padded={false}>
        <DataTable
          columns={columns}
          rows={summary.lowStockProducts}
          getRowKey={(product) => product.id}
          emptyText="No products are currently at or below the low stock threshold."
        />
      </Section>
    </Page>
  );
}
