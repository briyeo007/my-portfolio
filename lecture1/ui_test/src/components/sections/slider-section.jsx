import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';

/**
 * SliderSection 컴포넌트
 * MUI Slider를 사용한 슬라이더 섹션
 *
 * 기능:
 * - 0-100 범위 슬라이더
 * - marks로 눈금 표시
 * - valueLabelDisplay로 값 표시
 * - 현재값 실시간 표시
 */
function SliderSection() {
  const [values, setValues] = useState({
    basic: 30,
    discrete: 50,
    range: [20, 70]
  });

  const handleChange = (key) => (event, newValue) => {
    setValues((prev) => ({
      ...prev,
      [key]: newValue
    }));
  };

  const marks = [
    { value: 0, label: '0' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 75, label: '75' },
    { value: 100, label: '100' }
  ];

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
        Slider
      </Typography>

      <Grid container spacing={4}>
        {/* 기본 슬라이더 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
            Basic Slider
          </Typography>
          <Box sx={{ px: 1 }}>
            <Slider
              value={values.basic}
              onChange={handleChange('basic')}
              valueLabelDisplay="auto"
              min={0}
              max={100}
            />
          </Box>
          <Box sx={{ mt: 2, p: 1.5, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary">
              현재값:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {values.basic}
            </Typography>
          </Box>
        </Grid>

        {/* 눈금 표시 슬라이더 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
            Discrete Slider (marks)
          </Typography>
          <Box sx={{ px: 1 }}>
            <Slider
              value={values.discrete}
              onChange={handleChange('discrete')}
              valueLabelDisplay="on"
              step={25}
              marks={marks}
              min={0}
              max={100}
            />
          </Box>
          <Box sx={{ mt: 2, p: 1.5, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary">
              현재값:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {values.discrete}
            </Typography>
          </Box>
        </Grid>

        {/* 범위 슬라이더 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
            Range Slider
          </Typography>
          <Box sx={{ px: 1 }}>
            <Slider
              value={values.range}
              onChange={handleChange('range')}
              valueLabelDisplay="auto"
              min={0}
              max={100}
            />
          </Box>
          <Box sx={{ mt: 2, p: 1.5, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary">
              범위:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {values.range[0]} - {values.range[1]}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SliderSection;
