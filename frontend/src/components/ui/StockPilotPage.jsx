import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export function StockPilotPage({ title, description, children }) {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontSize: { xs: '1.8rem', sm: '2.125rem' } }}>
          {title}
        </Typography>
        {description && <Typography color="text.secondary">{description}</Typography>}
      </Box>
      {children}
    </Stack>
  );
}
