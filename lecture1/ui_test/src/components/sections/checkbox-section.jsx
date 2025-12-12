import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

/**
 * CheckboxSection 컴포넌트
 * MUI Checkbox와 FormControlLabel을 사용한 체크박스 섹션
 *
 * 기능:
 * - 4개 체크박스 옵션
 * - 전체 선택/해제 기능
 * - 체크된 항목 실시간 표시
 */
function CheckboxSection() {
  const [checked, setChecked] = useState({
    javascript: false,
    typescript: false,
    python: false,
    java: false
  });

  const options = [
    { key: 'javascript', label: 'JavaScript' },
    { key: 'typescript', label: 'TypeScript' },
    { key: 'python', label: 'Python' },
    { key: 'java', label: 'Java' }
  ];

  const handleChange = (key) => (event) => {
    setChecked((prev) => ({
      ...prev,
      [key]: event.target.checked
    }));
  };

  const checkedCount = Object.values(checked).filter(Boolean).length;
  const isAllChecked = checkedCount === options.length;
  const isIndeterminate = checkedCount > 0 && checkedCount < options.length;

  const handleSelectAll = (event) => {
    const newValue = event.target.checked;
    setChecked({
      javascript: newValue,
      typescript: newValue,
      python: newValue,
      java: newValue
    });
  };

  const getCheckedLabels = () => {
    return options
      .filter((option) => checked[option.key])
      .map((option) => option.label);
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
        Checkbox
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAllChecked}
                  indeterminate={isIndeterminate}
                  onChange={handleSelectAll}
                />
              }
              label={<Typography sx={{ fontWeight: 600 }}>전체 선택</Typography>}
            />
            <Box sx={{ ml: 3 }}>
              {options.map((option) => (
                <FormControlLabel
                  key={option.key}
                  control={
                    <Checkbox
                      checked={checked[option.key]}
                      onChange={handleChange(option.key)}
                    />
                  }
                  label={option.label}
                />
              ))}
            </Box>
          </FormGroup>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              p: 2,
              bgcolor: 'grey.100',
              borderRadius: 1,
              minHeight: 120
            }}
          >
            <Typography variant="caption" color="text.secondary">
              선택된 항목 ({checkedCount}개):
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {getCheckedLabels().length > 0
                ? getCheckedLabels().join(', ')
                : '선택된 항목이 없습니다'}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CheckboxSection;
