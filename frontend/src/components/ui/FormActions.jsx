import Stack from '@mui/material/Stack';

export function FormActions({ children }) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems={{ xs: 'stretch', sm: 'center' }}>
      {children}
    </Stack>
  );
}
