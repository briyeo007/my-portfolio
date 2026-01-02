import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

/**
 * ContactSection 컴포넌트
 * 연락처 및 SNS 섹션
 */
function ContactSection() {
  const contactInfo = {
    email: 'brianuyeo@gmail.com',
    github: 'briyeo007',
    linkedin: 'ungjun-yeo'
  };

  const socialLinks = [
    {
      name: 'Email',
      icon: <EmailIcon sx={{ fontSize: 32 }} />,
      href: `mailto:${contactInfo.email}`,
      label: contactInfo.email,
      color: '#EA4335'
    },
    {
      name: 'GitHub',
      icon: <GitHubIcon sx={{ fontSize: 32 }} />,
      href: `https://github.com/${contactInfo.github}`,
      label: `@${contactInfo.github}`,
      color: '#FFFFFF'
    },
    {
      name: 'LinkedIn',
      icon: <LinkedInIcon sx={{ fontSize: 32 }} />,
      href: `https://linkedin.com/in/${contactInfo.linkedin}`,
      label: contactInfo.linkedin,
      color: '#0A66C2'
    }
  ];

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: '#2A2420'
      }}
    >
      <Container maxWidth="md" sx={{ px: { xs: 2, md: 3 } }}>
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
          Contact
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
          Feel free to reach out to me via the channels below!
        </Typography>

        {/* 연락처 카드들 */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {socialLinks.map((social, index) => (
            <Grid key={index} size={{ xs: 12, sm: 4 }}>
              <Card
                component={Link}
                href={social.href}
                target={social.name !== 'Email' ? '_blank' : undefined}
                rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                sx={{
                  height: '100%',
                  bgcolor: 'background.default',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'block',
                  '&:hover': {
                    borderColor: social.color,
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 24px ${social.color}20`
                  }
                }}
              >
                <CardContent
                  sx={{
                    textAlign: 'center',
                    p: { xs: 3, md: 4 }
                  }}
                >
                  <Box
                    sx={{
                      color: social.color,
                      mb: 2,
                      transition: 'transform 0.2s ease',
                      '&:hover': {
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    {social.icon}
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
                    {social.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontSize: { xs: '0.75rem', md: '0.85rem' },
                      wordBreak: 'break-all'
                    }}
                  >
                    {social.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 소셜 아이콘 바 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            mb: 4
          }}
        >
          <IconButton
            component={Link}
            href={`mailto:${contactInfo.email}`}
            sx={{
              color: 'text.secondary',
              border: '1px solid',
              borderColor: 'divider',
              '&:hover': {
                color: '#EA4335',
                borderColor: '#EA4335',
                bgcolor: 'rgba(234, 67, 53, 0.1)'
              }
            }}
          >
            <EmailIcon />
          </IconButton>
          <IconButton
            component={Link}
            href={`https://github.com/${contactInfo.github}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'text.secondary',
              border: '1px solid',
              borderColor: 'divider',
              '&:hover': {
                color: '#FFFFFF',
                borderColor: '#FFFFFF',
                bgcolor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            component={Link}
            href={`https://linkedin.com/in/${contactInfo.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'text.secondary',
              border: '1px solid',
              borderColor: 'divider',
              '&:hover': {
                color: '#0A66C2',
                borderColor: '#0A66C2',
                bgcolor: 'rgba(10, 102, 194, 0.1)'
              }
            }}
          >
            <LinkedInIcon />
          </IconButton>
        </Box>

        {/* 저작권 */}
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
            fontSize: '0.85rem',
            opacity: 0.7
          }}
        >
          © 2024 Brian Ungjun Yeo. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default ContactSection;
