import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../contexts/auth-context.jsx';

/**
 * LoginPage 컴포넌트
 * 사용자 로그인을 위한 페이지
 *
 * Props: 없음
 *
 * Example usage:
 * <LoginPage />
 */
function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.username, formData.password);
      navigate('/main');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.username.length > 0 && formData.password.length > 0;

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 2, md: 4 },
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="xs">
        {/* 로그인 카드 */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            p: { xs: 4, md: 5 },
            mb: 2,
          }}
        >
          {/* 로고 */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 4,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontFamily: '"Billabong", cursive',
                fontSize: { xs: '36px', md: '42px' },
                fontWeight: 400,
                background: 'linear-gradient(45deg, #F77737, #E1306C, #833AB4)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Picstagram
            </Typography>
          </Box>

          {/* 에러 메시지 */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* 로그인 폼 */}
          <Box component="form" onSubmit={handleLogin}>
            <TextField
              fullWidth
              name="username"
              placeholder="사용자 이름 또는 휴대폰 번호"
              value={formData.username}
              onChange={handleChange}
              sx={{ mb: 1.5 }}
              size="small"
              disabled={loading}
            />
            <TextField
              fullWidth
              name="password"
              type="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange}
              sx={{ mb: 2 }}
              size="small"
              disabled={loading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!isFormValid || loading}
              sx={{ mb: 2 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : '로그인'}
            </Button>
          </Box>

          {/* 구분선 */}
          <Divider sx={{ my: 2 }}>
            <Typography variant="caption" color="text.secondary">
              또는
            </Typography>
          </Divider>

          {/* 아이디/비밀번호 찾기 */}
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link
              to="/find-account"
              style={{ textDecoration: 'none' }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: 'text.primary',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                비밀번호를 잊으셨나요?
              </Typography>
            </Link>
          </Box>
        </Box>

        {/* 회원가입 카드 */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            p: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="body1">
            계정이 없으신가요?{' '}
            <Link
              to="/signup"
              style={{ textDecoration: 'none' }}
            >
              <Typography
                component="span"
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                가입하기
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default LoginPage;
