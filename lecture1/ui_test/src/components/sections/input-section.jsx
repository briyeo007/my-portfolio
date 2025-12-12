import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

/**
 * InputSection 컴포넌트
 * MUI TextField의 다양한 variant를 보여주는 섹션
 *
 * 표시되는 입력 필드:
 * - variant: standard, outlined, filled
 * - 입력값 실시간 표시
 */
function InputSection() {
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

  const variants = [
    { name: 'standard', label: 'Standard', placeholder: 'Standard 입력' },
    { name: 'outlined', label: 'Outlined', placeholder: 'Outlined 입력' },
    { name: 'filled', label: 'Filled', placeholder: 'Filled 입력' }
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
        Input
      </Typography>

      <Grid container spacing={3}>
        {variants.map((variant) => (
          <Grid key={variant.name} size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              variant={variant.name}
              label={variant.label}
              placeholder={variant.placeholder}
              value={values[variant.name]}
              onChange={handleChange(variant.name)}
            />
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
                입력값:
              </Typography>
              <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                {values[variant.name] || '-'}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default InputSection;
