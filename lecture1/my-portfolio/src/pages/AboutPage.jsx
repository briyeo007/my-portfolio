import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';

/**
 * AboutPage 컴포넌트
 * 상세한 자기소개 페이지
 */
function AboutPage() {
  const education = [
    {
      school: 'Langara College',
      major: 'Web Development',
      period: '4년',
      description: '웹 퍼블리싱 및 웹 개발 기술 학습'
    },
    {
      school: 'Emily Carr University of Art + Design',
      major: 'Art + Design',
      period: '',
      description: '미술 및 디자인 기초, 창의적 문제 해결 능력 배양'
    }
  ];

  const values = [
    {
      title: '지속적인 성장',
      description: '새로운 기술을 배우고 성장하는 것을 즐깁니다. 변화하는 웹 생태계에 발맞춰 꾸준히 학습합니다.'
    },
    {
      title: '협업과 소통',
      description: '팀의 목표를 달성하기 위해 적극적으로 소통하고 협업합니다. 다양한 의견을 존중합니다.'
    },
    {
      title: '사용자 중심',
      description: '사용자 친화적인 UI/UX를 설계하고, 실제 사용자에게 가치를 전달하는 것을 최우선으로 합니다.'
    }
  ];

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 64px)',
        py: { xs: 4, md: 8 }
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
        {/* 페이지 헤더 */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              color: 'secondary.main',
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            About Me
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.8,
              fontSize: { xs: '1rem', md: '1.1rem' }
            }}
          >
            안녕하세요, 웹 퍼블리셔 Brian Ungjun Yeo입니다.
          </Typography>
        </Box>

        {/* 소개 섹션 */}
        <Card
          sx={{
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            mb: { xs: 4, md: 6 }
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Grid container spacing={4} alignItems="center">
              <Grid size={{ xs: 12, md: 4 }}>
                <Box
                  component="img"
                  src="/images/profile.jpg"
                  alt="Brian Ungjun Yeo"
                  sx={{
                    width: { xs: 150, md: 200 },
                    height: { xs: 150, md: 200 },
                    borderRadius: '50%',
                    objectFit: 'cover',
                    mx: 'auto',
                    display: 'block',
                    border: '3px solid',
                    borderColor: 'secondary.main'
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: 'text.primary',
                    fontWeight: 600,
                    mb: 2,
                    textAlign: { xs: 'center', md: 'left' }
                  }}
                >
                  Brian Ungjun Yeo
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.8,
                    mb: 2,
                    textAlign: { xs: 'center', md: 'left' }
                  }}
                >
                  저는 Emily Carr University에서 미술을 전공하다가, COVID-19 팬데믹을 계기로
                  웹 개발의 세계에 발을 들이게 되었습니다. 이후 Langara College에서
                  웹 개발을 전공하며 웹 퍼블리셔로서의 여정을 시작했습니다.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.8,
                    textAlign: { xs: 'center', md: 'left' }
                  }}
                >
                  미술적 배경은 UI/UX 디자인에 대한 감각을 키워주었고,
                  이를 기술과 결합하여 사용자에게 가치를 전달하는 웹 애플리케이션을 만드는 것을 목표로 합니다.
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* 학력 섹션 */}
        <Box sx={{ mb: { xs: 4, md: 6 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <SchoolIcon sx={{ color: 'secondary.main', mr: 1, fontSize: 28 }} />
            <Typography
              variant="h5"
              sx={{
                color: 'text.primary',
                fontWeight: 600,
                fontSize: { xs: '1.25rem', md: '1.5rem' }
              }}
            >
              Education
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {education.map((edu, index) => (
              <Grid key={index} size={{ xs: 12, md: 6 }}>
                <Card
                  sx={{
                    height: '100%',
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 3
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'secondary.main',
                        fontWeight: 600,
                        mb: 1
                      }}
                    >
                      {edu.school}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.primary',
                        mb: 1
                      }}
                    >
                      {edu.major}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.6
                      }}
                    >
                      {edu.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: { xs: 4, md: 6 }, borderColor: 'divider' }} />

        {/* 가치관 섹션 */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <FavoriteIcon sx={{ color: 'secondary.main', mr: 1, fontSize: 28 }} />
            <Typography
              variant="h5"
              sx={{
                color: 'text.primary',
                fontWeight: 600,
                fontSize: { xs: '1.25rem', md: '1.5rem' }
              }}
            >
              My Values
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {values.map((value, index) => (
              <Grid key={index} size={{ xs: 12, md: 4 }}>
                <Card
                  sx={{
                    height: '100%',
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'secondary.main',
                      transform: 'translateY(-4px)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'secondary.main',
                        fontWeight: 600,
                        mb: 2,
                        fontSize: '1.1rem'
                      }}
                    >
                      {value.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.7
                      }}
                    >
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default AboutPage;
