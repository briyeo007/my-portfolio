import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import DragDropSection from './components/ui/DragDropSection';

function App() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 2, md: 4 }
      }}
    >
      <Container maxWidth="md" sx={{ py: 4 }}>
        <DragDropSection />
      </Container>
    </Box>
  );
}

export default App;
