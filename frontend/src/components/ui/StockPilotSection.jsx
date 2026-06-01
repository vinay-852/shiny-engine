import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export function StockPilotSection({ title, children, padded = true }) {
  return (
    <Paper variant="outlined" sx={padded ? { p: { xs: 2, sm: 3 } } : undefined}>
      {title && (
        <Box sx={{ p: padded ? 0 : 2, pb: padded ? 2 : 2 }}>
          <Typography variant="h6">{title}</Typography>
        </Box>
      )}
      {children}
    </Paper>
  );
}
