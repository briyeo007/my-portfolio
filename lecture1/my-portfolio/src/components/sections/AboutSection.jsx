import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

/**
 * AboutSection 컴포넌트
 * 홈페이지 내 간단한 자기소개 섹션
 *
 * 기능:
 * - 간단한 자기소개
 * - '더 알아보기' 버튼 (About Me 페이지로 이동)
 */
function AboutSection() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: '#2A2420',
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
            bgcolor: 'background.default'
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
            About Me
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.8,
              mb: 4,
              fontSize: { xs: '1rem', md: '1.1rem' }
            }}
          >
            여기는 About Me 섹션입니다. 간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다.
          </Typography>
          <Button
            component={Link}
            to="/about"
            variant="outlined"
            color="secondary"
            size="large"
          >
            더 알아보기
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default AboutSection;
