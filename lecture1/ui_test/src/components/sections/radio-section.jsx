import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

/**
 * RadioSection 컴포넌트
 * MUI RadioGroup과 FormControlLabel을 사용한 라디오 버튼 섹션
 *
 * 기능:
 * - FormLabel로 그룹 제목 설정
 * - 4개 라디오 옵션
 * - 선택값 실시간 표시
 */
function RadioSection() {
  const [value, setValue] = useState('');

  const options = [
    { value: 'frontend', label: '프론트엔드 개발자' },
    { value: 'backend', label: '백엔드 개발자' },
    { value: 'fullstack', label: '풀스택 개발자' },
    { value: 'devops', label: 'DevOps 엔지니어' }
  ];

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const getSelectedLabel = () => {
    const selected = options.find((option) => option.value === value);
    return selected ? selected.label : null;
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
        Radio
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl>
            <FormLabel id="job-radio-group-label">
              희망 직무를 선택하세요
            </FormLabel>
            <RadioGroup
              aria-labelledby="job-radio-group-label"
              name="job-radio-group"
              value={value}
              onChange={handleChange}
            >
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              p: 2,
              bgcolor: 'grey.100',
              borderRadius: 1,
              minHeight: 100
            }}
          >
            <Typography variant="caption" color="text.secondary">
              선택된 직무:
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {getSelectedLabel() || '선택된 항목이 없습니다'}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RadioSection;
