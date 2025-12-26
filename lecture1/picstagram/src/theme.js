import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0095F6',
      light: '#B2DFFC',
      dark: '#1877F2',
    },
    secondary: {
      main: '#E1306C',
      light: '#F77737',
      dark: '#833AB4',
    },
    error: {
      main: '#ED4956',
    },
    success: {
      main: '#78C257',
    },
    warning: {
      main: '#FFCC00',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#262626',
      secondary: '#8E8E8E',
    },
    divider: '#DBDBDB',
  },
  typography: {
    fontFamily: '"Pretendard", "Noto Sans KR", "Inter", -apple-system, sans-serif',
    h1: {
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h2: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    body1: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.4,
    },
    button: {
      fontSize: '14px',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          height: '44px',
          borderRadius: '8px',
        },
        containedPrimary: {
          backgroundColor: '#0095F6',
          '&:hover': {
            backgroundColor: '#1877F2',
          },
          '&:disabled': {
            backgroundColor: '#B2DFFC',
          },
        },
        outlinedSecondary: {
          borderColor: '#DBDBDB',
          color: '#262626',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#FAFAFA',
            borderRadius: '6px',
            height: '44px',
            '& fieldset': {
              borderColor: '#DBDBDB',
            },
            '&:hover fieldset': {
              borderColor: '#A8A8A8',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#A8A8A8',
            },
          },
          '& .MuiInputBase-input': {
            padding: '0 12px',
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#8E8E8E',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: 'none',
          border: '1px solid #DBDBDB',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: '1px solid #DBDBDB',
        },
      },
    },
  },
  spacing: 8,
});

export default theme;
