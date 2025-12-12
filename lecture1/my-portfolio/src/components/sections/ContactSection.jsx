import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

/**
 * ContactSection 컴포넌트
 * 연락처 및 SNS 섹션
 *
 * 기능:
 * - 연락처, SNS 링크
 * - 간단한 메시지 폼
 */
function ContactSection() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.default'
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
            Contact
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.8,
              fontSize: { xs: '1rem', md: '1.1rem' }
            }}
          >
            여기는 Contact 섹션입니다. 연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default ContactSection;
