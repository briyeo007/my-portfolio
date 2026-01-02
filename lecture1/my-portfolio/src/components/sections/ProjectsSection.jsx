import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import ProjectCard from '../ui/ProjectCard';

/**
 * ProjectsSection 컴포넌트
 * 홈페이지 내 대표 프로젝트 섹션
 *
 * 기능:
 * - Supabase에서 최신 프로젝트 3개 조회
 * - MUI Grid를 사용한 반응형 카드 레이아웃
 * - '더 보기' 버튼 (Projects 페이지로 이동)
 * - design-system.md 규칙 준수
 */
function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true })
        .limit(3);

      setProjects(data || []);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: '#2A2420',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
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
          Projects
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
            mb: { xs: 4, md: 6 },
            maxWidth: 500,
            mx: 'auto',
            fontSize: { xs: '1rem', md: '1.1rem' },
            lineHeight: 1.6
          }}
        >
          다양한 기술 스택을 활용하여 만든 프로젝트들입니다.
        </Typography>

        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              py: 8
            }}
          >
            <CircularProgress color="secondary" />
          </Box>
        ) : (
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
        )}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: { xs: 4, md: 6 }
          }}
        >
          <Button
            component={Link}
            to="/projects"
            variant="outlined"
            color="secondary"
            size="large"
          >
            View All Projects
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default ProjectsSection;
