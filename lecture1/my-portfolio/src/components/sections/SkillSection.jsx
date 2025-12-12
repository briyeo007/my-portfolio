import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

/**
 * SkillSection 컴포넌트
 * 기술 스택 시각화 섹션
 *
 * 기능:
 * - 기술 스택을 트리나 프로그레스바로 시각화할 공간
 */
function SkillSection() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
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
            Skill Tree
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.8,
              fontSize: { xs: '1rem', md: '1.1rem' }
            }}
          >
            여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default SkillSection;
