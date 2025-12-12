import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

/**
 * DropdownSection 컴포넌트
 * MUI Select와 MenuItem을 사용한 드롭다운 섹션
 *
 * 기능:
 * - FormControl과 InputLabel 적용
 * - 3가지 variant (standard, outlined, filled)
 * - 선택값 실시간 표시
 */
function DropdownSection() {
  const [values, setValues] = useState({
    standard: '',
    outlined: '',
    filled: ''
  });

  const handleChange = (variant) => (event) => {
    setValues((prev) => ({
      ...prev,
      [variant]: event.target.value
    }));
  };

  const options = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'next', label: 'Next.js' }
  ];

  const variants = [
    { name: 'standard', label: 'Standard' },
    { name: 'outlined', label: 'Outlined' },
    { name: 'filled', label: 'Filled' }
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
        Dropdown
      </Typography>

      <Grid container spacing={3}>
        {variants.map((variant) => (
          <Grid key={variant.name} size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth variant={variant.name}>
              <InputLabel id={`${variant.name}-select-label`}>
                프레임워크 선택
              </InputLabel>
              <Select
                labelId={`${variant.name}-select-label`}
                id={`${variant.name}-select`}
                value={values[variant.name]}
                label="프레임워크 선택"
                onChange={handleChange(variant.name)}
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box
              sx={{
                mt: 1.5,
                p: 1.5,
                bgcolor: 'grey.100',
                borderRadius: 1,
                minHeight: 40
              }}
            >
              <Typography variant="caption" color="text.secondary">
                선택값 ({variant.label}):
              </Typography>
              <Typography variant="body2">
                {values[variant.name]
                  ? options.find((o) => o.value === values[variant.name])?.label
                  : '-'}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default DropdownSection;
