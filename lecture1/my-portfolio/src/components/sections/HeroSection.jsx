import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import FloatingLines from '../ui/FloatingLines';

/**
 * HeroSection 컴포넌트
 * 포트폴리오 메인 비주얼 섹션
 * FloatingLines WebGL 배경 효과 적용
 */
function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#1A1613',
        overflow: 'hidden'
      }}
    >
      {/* FloatingLines 배경 */}
      <FloatingLines
        enabledWaves={['top', 'middle', 'bottom']}
        lineCount={[10, 15, 20]}
        lineDistance={[8, 6, 4]}
        bendRadius={5.0}
        bendStrength={-0.5}
        interactive={true}
        parallax={true}
        linesGradient={['#D4A537', '#C9963A', '#A67C3D', '#8B6914']}
      />

      {/* 콘텐츠 */}
      <Container
        maxWidth="md"
        sx={{
          px: { xs: 2, md: 3 },
          position: 'relative',
          zIndex: 1
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            p: { xs: 4, md: 6 }
          }}
        >
          {/* 인사말 */}
          <Typography
            variant="overline"
            sx={{
              color: 'text.secondary',
              letterSpacing: 3,
              fontSize: { xs: '0.75rem', md: '0.875rem' },
              mb: 2,
              display: 'block'
            }}
          >
            Welcome to My Portfolio
          </Typography>

          {/* 이름 */}
          <Typography
            variant="h1"
            component="h1"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2.5rem', md: '4rem' },
              lineHeight: 1.2
            }}
          >
            Brian Ungjun Yeo
          </Typography>

          {/* 직함 */}
          <Typography
            variant="h4"
            component="h2"
            sx={{
              color: 'secondary.main',
              fontWeight: 500,
              mb: 4,
              fontSize: { xs: '1.25rem', md: '1.75rem' }
            }}
          >
            Web Publisher
          </Typography>

          {/* 소개 */}
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.8,
              fontSize: { xs: '1rem', md: '1.1rem' },
              maxWidth: 600,
              mx: 'auto',
              mb: 5
            }}
          >
            사용자 친화적인 UI/UX 설계와 반응형 웹 개발에 열정을 가진 웹 개발자입니다.
            새로운 기술을 배우고 성장하는 것을 즐기며, 협업을 통해 가치를 만들어갑니다.
          </Typography>

          {/* CTA 버튼들 */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              component={Link}
              to="/projects"
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600
              }}
            >
              View Projects
            </Button>
            <Button
              component={Link}
              to="/about"
              variant="outlined"
              color="secondary"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem'
              }}
            >
              About Me
            </Button>
          </Stack>
        </Box>
      </Container>

      {/* 스크롤 인디케이터 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1
        }}
      >
        <Box
          sx={{
            width: 30,
            height: 50,
            border: '2px solid',
            borderColor: 'secondary.main',
            borderRadius: 15,
            position: 'relative',
            opacity: 0.6,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 6,
              height: 6,
              bgcolor: 'secondary.main',
              borderRadius: '50%',
              animation: 'scrollIndicator 2s infinite'
            },
            '@keyframes scrollIndicator': {
              '0%': { opacity: 1, top: 8 },
              '100%': { opacity: 0, top: 32 }
            }
          }}
        />
      </Box>
    </Box>
  );
}

export default HeroSection;
