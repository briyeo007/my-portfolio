import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

/**
 * ProjectsPage 컴포넌트
 * 포트폴리오 작품 목록 페이지
 *
 * 기능:
 * - 포트폴리오 작품들이 들어갈 공간
 */
function ProjectsPage() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 4, md: 8 }
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
            variant="h3"
            component="h1"
            sx={{
              color: 'secondary.main',
              mb: 4,
              fontWeight: 700
            }}
          >
            Projects
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.8,
              fontSize: { xs: '1rem', md: '1.1rem' }
            }}
          >
            Projects 페이지가 개발될 공간입니다. 포트폴리오 작품들이 들어갈 예정입니다.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default ProjectsPage;
