import Button from '@mui/material/Button';
import { api } from '../api/client.js';
import { StockPilotCustomerForm } from './StockPilotCustomerForm.jsx';
import { StockPilotDataTable } from './ui/StockPilotDataTable.jsx';
import { StockPilotPage } from './ui/StockPilotPage.jsx';
import { StockPilotSection } from './ui/StockPilotSection.jsx';

export function StockPilotCustomersView({ customers, runAction }) {
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
    <StockPilotPage title="Customers" description="Create and manage customer records.">
      <StockPilotSection title="Add Customer">
        <StockPilotCustomerForm onSubmit={(payload) => runAction(() => api.createCustomer(payload), 'Customer created.')} />
      </StockPilotSection>

      <StockPilotSection title="Customer List" padded={false}>
        <StockPilotDataTable columns={columns} rows={customers} getRowKey={(customer) => customer.id} />
      </StockPilotSection>
    </StockPilotPage>
  );
}
