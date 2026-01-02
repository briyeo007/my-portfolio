import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';

/**
 * SkillSection 컴포넌트
 * 기술 스택 시각화 섹션
 */
function SkillSection() {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: [
        { name: 'HTML/CSS', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'TypeScript', level: 75 },
        { name: 'React', level: 85 },
        { name: 'Vue.js', level: 70 },
        { name: 'Next.js', level: 80 }
      ]
    },
    {
      category: 'Tools & Others',
      skills: [
        { name: 'Git/GitHub', level: 85 },
        { name: 'Figma', level: 70 },
        { name: 'Responsive Design', level: 90 },
        { name: 'UI/UX Design', level: 75 },
        { name: 'REST API', level: 80 },
        { name: 'Supabase', level: 70 }
      ]
    }
  ];

  const techStack = [
    'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Vue.js',
    'Next.js', 'MUI', 'Tailwind CSS', 'Git', 'GitHub', 'Figma',
    'Supabase', 'Firebase', 'Netlify', 'Vercel'
  ];

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.default',
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
          Skill Tree
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
          웹 퍼블리싱에 필요한 기술들을 꾸준히 학습하고 있습니다.
        </Typography>

        {/* 스킬 프로그레스 바 */}
        <Grid container spacing={4} sx={{ mb: { xs: 5, md: 6 } }}>
          {skillCategories.map((category, categoryIndex) => (
            <Grid key={categoryIndex} size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  p: { xs: 3, md: 4 },
                  bgcolor: 'background.paper',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: 'secondary.main',
                    fontWeight: 600,
                    mb: 3,
                    fontSize: { xs: '1.1rem', md: '1.25rem' }
                  }}
                >
                  {category.category}
                </Typography>

                {category.skills.map((skill, skillIndex) => (
                  <Box key={skillIndex} sx={{ mb: 2.5 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 0.5
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.primary',
                          fontWeight: 500,
                          fontSize: { xs: '0.875rem', md: '0.95rem' }
                        }}
                      >
                        {skill.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          fontSize: { xs: '0.75rem', md: '0.85rem' }
                        }}
                      >
                        {skill.level}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={skill.level}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: 'rgba(212, 165, 55, 0.1)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                          bgcolor: 'secondary.main'
                        }
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* 기술 스택 태그들 */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'text.secondary',
              mb: 2,
              fontWeight: 500
            }}
          >
            Tech Stack
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 1
            }}
          >
            {techStack.map((tech, index) => (
              <Chip
                key={index}
                label={tech}
                sx={{
                  bgcolor: 'background.paper',
                  color: 'info.main',
                  border: '1px solid',
                  borderColor: 'info.main',
                  fontSize: { xs: '0.75rem', md: '0.85rem' },
                  '&:hover': {
                    bgcolor: 'info.main',
                    color: 'background.default'
                  },
                  transition: 'all 0.2s ease'
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default SkillSection;
