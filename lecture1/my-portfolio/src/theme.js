import { createTheme } from '@mui/material/styles';

/**
 * 포트폴리오 다크 테마
 * 골드 & 다크 브라운 컬러 스킴
 */
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D4A537',
      light: '#E4B84A',
      dark: '#B8922F'
    },
    secondary: {
      main: '#D4A537',
      light: '#E4B84A',
      dark: '#B8922F'
    },
    background: {
      default: '#1A1613',
      paper: '#2A2420'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B8B0A8'
    },
    divider: 'rgba(212, 165, 55, 0.2)',
    info: {
      main: '#64B5F6'
    },
    error: {
      main: '#EF5350'
    },
    success: {
      main: '#66BB6A'
    }
  },
  typography: {
    fontFamily: '"Inter", "Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontWeight: 700
    },
    h2: {
      fontWeight: 600
    },
    h3: {
      fontWeight: 600
    },
    h4: {
      fontWeight: 600
    },
    h5: {
      fontWeight: 600
    },
    h6: {
      fontWeight: 600
    }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    }
  }
});

export default theme;
