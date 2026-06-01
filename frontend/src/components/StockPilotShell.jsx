import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

const tabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'products', label: 'Products' },
  { id: 'customers', label: 'Customers' },
  { id: 'orders', label: 'Orders' },
];

export function StockPilotShell({ activeTab, onTabChange, children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabChange = (tabId) => {
    onTabChange(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <Box>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ py: { xs: 1, sm: 0 } }}>
          <Container maxWidth="lg" disableGutters>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="h6" component="div" noWrap sx={{ flexGrow: 1 }}>
                StockPilot Control
              </Typography>

              <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', sm: 'flex' } }}>
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? 'contained' : 'text'}
                    onClick={() => handleTabChange(tab.id)}
                  >
                    {tab.label}
                  </Button>
                ))}
              </Stack>

              <IconButton
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-controls="mobile-navigation"
                aria-expanded={mobileMenuOpen}
                className={`mobile-menu-button${mobileMenuOpen ? ' is-open' : ''}`}
                onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
                sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
              >
                <Box component="span" className="menu-icon" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </Box>
              </IconButton>
            </Stack>

            <Collapse in={mobileMenuOpen} timeout="auto" unmountOnExit>
              <Stack id="mobile-navigation" spacing={1} sx={{ display: { xs: 'flex', sm: 'none' }, pt: 1.5, pb: 0.5 }}>
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    fullWidth
                    variant={activeTab === tab.id ? 'contained' : 'text'}
                    onClick={() => handleTabChange(tab.id)}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    {tab.label}
                  </Button>
                ))}
              </Stack>
            </Collapse>
          </Container>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
        {children}
      </Container>
    </Box>
  );
}
