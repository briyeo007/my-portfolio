import { createTheme } from '@mui/material/styles';

/**
 * 포트폴리오 테마 설정
 * 컬러 팔레트: 삼국지 게임 캐릭터 아트워크 기반
 * 디자인 컨셉: 동양적 위엄 + 모던 다크 테마
 */
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#B22222',       // 진홍색 - 메인 강조
      light: '#DC3545',      // 밝은 빨강 - 호버 상태
      dark: '#8B0000',       // 어두운 빨강 - 액티브 상태
    },
    secondary: {
      main: '#D4A537',       // 골드 - 보조 강조
      light: '#F0C850',      // 밝은 골드
      dark: '#8B6914',       // 어두운 골드/브론즈
    },
    info: {
      main: '#48D1CC',       // 터콰이즈 - 포인트 컬러
      light: '#5FDDD8',
    },
    success: {
      main: '#4A5540',       // 탁한 녹색
    },
    warning: {
      main: '#FF8C00',       // 주황색
    },
    error: {
      main: '#B22222',       // 진홍색
    },
    background: {
      default: '#1C1410',    // 다크 브라운 - 메인 배경
      paper: '#2A2420',      // 약간 밝은 다크 - 카드 배경
    },
    text: {
      primary: '#F5F5DC',    // 베이지 화이트 - 주요 텍스트
      secondary: '#C0B8A8',  // 회베이지 - 보조 텍스트
      disabled: '#8B8878',   // 뮤트 그레이 - 비활성 텍스트
    },
    divider: '#3A3430',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#F5F5DC',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#D4A537',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    body1: {
      color: '#C0B8A8',
      lineHeight: 1.7,
    },
    body2: {
      color: '#8B8878',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #B22222 0%, #8B0000 100%)',
          '&:hover': {
            background: '#DC3545',
          },
        },
        outlinedSecondary: {
          borderColor: '#D4A537',
          color: '#D4A537',
          '&:hover': {
            backgroundColor: '#D4A537',
            color: '#1C1410',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#2A2420',
          border: '1px solid #3A3430',
          borderRadius: 12,
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: '#D4A537',
            boxShadow: '0 4px 12px rgba(212, 165, 55, 0.3)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(28, 20, 16, 0.9)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid #3A3430',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#48D1CC',
          '&:hover': {
            color: '#5FDDD8',
          },
        },
      },
    },
  },
  spacing: 8,
});

export default theme;
