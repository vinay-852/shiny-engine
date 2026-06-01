import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { FormActions } from './ui/FormActions.jsx';

const emptyCustomer = {
  full_name: '',
  email: '',
  phone: '',
};

export function CustomerForm({ onSubmit }) {
  const [form, setForm] = useState(emptyCustomer);
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    });
    setForm(emptyCustomer);
  };

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit}>
      <TextField label="Full name" value={form.full_name} onChange={(event) => update('full_name', event.target.value)} required />
      <TextField
        label="Email address"
        type="email"
        value={form.email}
        onChange={(event) => update('email', event.target.value)}
        required
      />
      <TextField label="Phone number" value={form.phone} onChange={(event) => update('phone', event.target.value)} required />
      <FormActions>
        <Button variant="contained" type="submit">
          Add Customer
        </Button>
      </FormActions>
    </Stack>
  );
}
