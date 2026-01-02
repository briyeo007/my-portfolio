import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SchoolIcon from '@mui/icons-material/School';
import BrushIcon from '@mui/icons-material/Brush';
import CodeIcon from '@mui/icons-material/Code';

/**
 * AboutSection 컴포넌트
 * 홈페이지 내 간단한 자기소개 섹션
 */
function AboutSection() {
  const highlights = [
    {
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      title: 'Langara College',
      description: 'Web Development 전공'
    },
    {
      icon: <BrushIcon sx={{ fontSize: 40 }} />,
      title: 'Emily Carr University',
      description: 'Art + Design 전공'
    },
    {
      icon: <CodeIcon sx={{ fontSize: 40 }} />,
      title: 'Web Publisher',
      description: 'HTML, CSS, JavaScript'
    }
  ];

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: '#2A2420',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
        {/* 섹션 타이틀 */}
        <Typography
          variant="h4"
          component="h2"
          sx={{
            color: 'secondary.main',
            textAlign: 'center',
            mb: 2,
            fontWeight: 600,
            fontSize: { xs: '1.5rem', md: '2rem' }
          }}
        >
          About Me
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
            mb: { xs: 4, md: 6 },
            maxWidth: 600,
            mx: 'auto',
            fontSize: { xs: '1rem', md: '1.1rem' },
            lineHeight: 1.8
          }}
        >
          미술을 전공하다 COVID-19 팬데믹을 계기로 웹 개발의 세계에 발을 들였습니다.
          창의성과 기술을 결합하여 사용자에게 가치를 전달하는 것을 목표로 합니다.
        </Typography>

        {/* 하이라이트 카드들 */}
        <Grid container spacing={3} sx={{ mb: { xs: 4, md: 6 } }}>
          {highlights.map((item, index) => (
            <Grid key={index} size={{ xs: 12, sm: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  bgcolor: 'background.default',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'secondary.main',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(212, 165, 55, 0.15)'
                  }
                }}
              >
                <CardContent
                  sx={{
                    textAlign: 'center',
                    p: { xs: 3, md: 4 }
                  }}
                >
                  <Box sx={{ color: 'secondary.main', mb: 2 }}>
                    {item.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'text.primary',
                      fontWeight: 600,
                      mb: 1,
                      fontSize: { xs: '1rem', md: '1.1rem' }
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontSize: { xs: '0.875rem', md: '0.95rem' }
                    }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 더 알아보기 버튼 */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            component={Link}
            to="/about"
            variant="outlined"
            color="secondary"
            size="large"
            sx={{ px: 4 }}
          >
            더 알아보기
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default AboutSection;
