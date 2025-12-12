import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

/**
 * CardSection 컴포넌트
 * MUI Card를 사용한 카드 섹션
 *
 * 기능:
 * - CardContent와 CardActions 구조
 * - 3개 예시 카드
 * - 호버 효과 및 그림자
 */
function CardSection() {
  const cards = [
    {
      id: 1,
      title: 'React 기초',
      description: 'React의 기본 개념과 컴포넌트 구조를 학습합니다. JSX, Props, State 등 핵심 개념을 다룹니다.',
      level: '입문'
    },
    {
      id: 2,
      title: 'MUI 컴포넌트',
      description: 'Material-UI의 다양한 컴포넌트를 활용하여 아름다운 UI를 구현하는 방법을 배웁니다.',
      level: '중급'
    },
    {
      id: 3,
      title: '상태 관리',
      description: 'Redux, Context API 등 다양한 상태 관리 방법을 비교하고 실습합니다.',
      level: '고급'
    }
  ];

  const handleClick = (title) => {
    alert(`${title} 카드가 클릭되었습니다!`);
  };

  return (
    <Box sx={{ mb: { xs: 4, md: 6 } }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: 600,
          mb: 3,
          pb: 1,
          borderBottom: '2px solid',
          borderColor: 'primary.main'
        }}
      >
        Card
      </Typography>

      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid key={card.id} size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1
                  }}
                >
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                    {card.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      px: 1,
                      py: 0.5,
                      bgcolor: 'primary.main',
                      color: 'white',
                      borderRadius: 1
                    }}
                  >
                    {card.level}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button size="small" onClick={() => handleClick(card.title)}>
                  자세히 보기
                </Button>
                <Button size="small" color="secondary">
                  공유
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CardSection;
