import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export function Feedback({ message, onDismiss }) {
  return (
    <Snackbar open={Boolean(message)} autoHideDuration={5000} onClose={onDismiss}>
      {message ? (
        <Alert severity={message.type === 'error' ? 'error' : 'success'} onClose={onDismiss} variant="filled">
          {message.text}
        </Alert>
      ) : undefined}
    </Snackbar>
  );
}
