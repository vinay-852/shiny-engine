import Button from '@mui/material/Button';
import { api } from '../api/client.js';
import { CustomerForm } from './CustomerForm.jsx';
import { DataTable } from './ui/DataTable.jsx';
import { Page } from './ui/Page.jsx';
import { Section } from './ui/Section.jsx';

export function CustomersView({ customers, runAction }) {
  const columns = [
    { key: 'full_name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone' },
    {
      key: 'actions',
      header: 'Actions',
      render: (customer) => (
        <Button
          size="small"
          color="error"
          onClick={() => runAction(() => api.deleteCustomer(customer.id), 'Customer deleted.')}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Page title="Customers" description="Create and manage customer records.">
      <Section title="Add Customer">
        <CustomerForm onSubmit={(payload) => runAction(() => api.createCustomer(payload), 'Customer created.')} />
      </Section>

      <Section title="Customer List" padded={false}>
        <DataTable columns={columns} rows={customers} getRowKey={(customer) => customer.id} />
      </Section>
    </Page>
  );
}
