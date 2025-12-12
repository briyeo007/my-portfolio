import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

/**
 * HeroSection 컴포넌트
 * 포트폴리오 메인 비주얼 섹션
 *
 * 기능:
 * - 메인 비주얼, 이름, 간단 소개가 들어갈 공간
 */
function HeroSection() {
  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            textAlign: 'center',
            p: { xs: 4, md: 6 },
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            bgcolor: 'background.paper'
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              color: 'secondary.main',
              mb: 3,
              fontWeight: 600
            }}
          >
            Hero Section
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.8,
              fontSize: { xs: '1rem', md: '1.1rem' }
            }}
          >
            여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default HeroSection;
