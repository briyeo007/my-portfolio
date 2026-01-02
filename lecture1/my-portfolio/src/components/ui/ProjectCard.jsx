import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { CardContainer, CardBody, CardItem } from './ThreeDCard';

/**
 * ProjectCard 컴포넌트
 * 3D 호버 효과가 적용된 프로젝트 카드
 *
 * Props:
 * @param {string} title - 프로젝트 제목 [Required]
 * @param {string} description - 프로젝트 설명 [Required]
 * @param {array} techStack - 기술 스택 배열 [Optional, 기본값: []]
 * @param {string} thumbnailUrl - 썸네일 이미지 URL [Required]
 * @param {string} detailUrl - 배포된 사이트 URL [Required]
 *
 * Example usage:
 * <ProjectCard
 *   title="Picstagram"
 *   description="모바일 퍼스트 소셜 미디어 웹앱"
 *   techStack={["React", "Supabase"]}
 *   thumbnailUrl="https://image.thum.io/get/..."
 *   detailUrl="https://picstagram.netlify.app"
 * />
 */
function ProjectCard({ title, description, techStack = [], thumbnailUrl, detailUrl }) {
  const handleViewDetails = () => {
    window.open(detailUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <CardContainer>
      <CardBody>
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            overflow: 'hidden',
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              borderColor: 'secondary.main',
              boxShadow: '0 8px 32px rgba(212, 165, 55, 0.3)'
            }
          }}
        >
          <CardItem translateZ={60} sx={{ width: '100%' }}>
            <CardMedia
              component="img"
              image={thumbnailUrl}
              alt={`${title} thumbnail`}
              sx={{
                aspectRatio: '16/9',
                objectFit: 'cover'
              }}
            />
          </CardItem>

          <CardContent
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              p: { xs: 2, md: 3 }
            }}
          >
            <CardItem translateZ={50}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  color: 'secondary.main',
                  fontWeight: 600,
                  fontSize: { xs: '1rem', md: '1.25rem' }
                }}
              >
                {title}
              </Typography>
            </CardItem>

            <CardItem translateZ={40}>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.6,
                  fontSize: { xs: '0.875rem', md: '1rem' }
                }}
              >
                {description}
              </Typography>
            </CardItem>

            <CardItem translateZ={30} sx={{ width: '100%' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 0.5
                }}
              >
                {techStack.map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    size="small"
                    sx={{
                      bgcolor: 'background.default',
                      color: 'info.main',
                      border: '1px solid',
                      borderColor: 'info.main',
                      fontSize: '0.75rem'
                    }}
                  />
                ))}
              </Box>
            </CardItem>

            <CardItem translateZ={20} sx={{ width: '100%', mt: 'auto' }}>
              <Button
                variant="outlined"
                color="secondary"
                endIcon={<OpenInNewIcon />}
                onClick={handleViewDetails}
                fullWidth
                sx={{
                  transition: 'all 0.2s ease',
                  '&:active': {
                    transform: 'scale(0.98)'
                  }
                }}
              >
                View Details
              </Button>
            </CardItem>
          </CardContent>
        </Card>
      </CardBody>
    </CardContainer>
  );
}

export default ProjectCard;
