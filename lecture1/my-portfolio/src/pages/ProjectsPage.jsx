import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { supabase } from '../lib/supabase';
import ProjectCard from '../components/ui/ProjectCard';

/**
 * ProjectsPage 컴포넌트
 * 포트폴리오 작품 목록 페이지
 *
 * 기능:
 * - Supabase에서 프로젝트 데이터 조회
 * - MUI Grid를 사용한 반응형 카드 레이아웃
 * - design-system.md 규칙 준수
 */
function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (fetchError) {
        throw fetchError;
      }

      setProjects(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          width: '100%',
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (error) {
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
              borderColor: 'error.main',
              borderRadius: 3,
              bgcolor: 'background.paper'
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: 'error.main', mb: 2 }}
            >
              Error
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary' }}
            >
              {error}
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 64px)',
        py: { xs: 4, md: 8 }
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            color: 'secondary.main',
            fontWeight: 700,
            textAlign: 'center',
            mb: { xs: 2, md: 3 },
            fontSize: { xs: '2rem', md: '3rem' }
          }}
        >
          Projects
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
            lineHeight: 1.6
          }}
        >
          다양한 기술 스택을 활용하여 만든 프로젝트들입니다.
          각 프로젝트를 클릭하여 자세한 내용을 확인해보세요.
        </Typography>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
            {projects.map((project) => (
              <Grid key={project.id} size={{ xs: 12, sm: 6, md: 6 }}>
                <Box sx={{ height: 420 }}>
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    techStack={project.tech_stack}
                    thumbnailUrl={project.thumbnail_url}
                    detailUrl={project.detail_url}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {projects.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary' }}
            >
              아직 등록된 프로젝트가 없습니다.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default ProjectsPage;
