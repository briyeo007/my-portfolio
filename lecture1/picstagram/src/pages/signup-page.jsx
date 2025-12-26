import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../contexts/auth-context.jsx';

/**
 * SignupPage 컴포넌트
 * 사용자 회원가입을 위한 페이지
 *
 * Props: 없음
 *
 * Example usage:
 * <SignupPage />
 */
function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    gender: '',
    phone: '',
    nickname: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signup(formData);
      setSuccess('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.name.length > 0 &&
    formData.birthDate.length > 0 &&
    formData.gender.length > 0 &&
    formData.phone.length > 0 &&
    formData.nickname.length > 0 &&
    formData.password.length > 0;

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
        {/* 회원가입 카드 */}
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
              mb: 3,
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

          {/* 안내 문구 */}
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: 'center', mb: 3 }}
          >
            친구들의 사진과 동영상을 보려면 가입하세요.
          </Typography>

          {/* 에러 메시지 */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* 성공 메시지 */}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          {/* 회원가입 폼 */}
          <Box component="form" onSubmit={handleSignup}>
            {/* 이름 입력란 */}
            <TextField
              fullWidth
              name="name"
              placeholder="이름"
              value={formData.name}
              onChange={handleChange}
              sx={{ mb: 1.5 }}
              size="small"
              disabled={loading}
            />

            {/* 생일 입력란 */}
            <TextField
              fullWidth
              name="birthDate"
              type="date"
              placeholder="생년월일"
              value={formData.birthDate}
              onChange={handleChange}
              sx={{ mb: 1.5 }}
              size="small"
              InputLabelProps={{ shrink: true }}
              disabled={loading}
            />

            {/* 성별 입력란 */}
            <FormControl fullWidth sx={{ mb: 1.5 }} size="small">
              <InputLabel id="gender-label">성별</InputLabel>
              <Select
                labelId="gender-label"
                name="gender"
                value={formData.gender}
                label="성별"
                onChange={handleChange}
                disabled={loading}
                sx={{
                  bgcolor: '#FAFAFA',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#DBDBDB',
                  },
                }}
              >
                <MenuItem value="male">남성</MenuItem>
                <MenuItem value="female">여성</MenuItem>
                <MenuItem value="other">기타</MenuItem>
                <MenuItem value="prefer_not_to_say">밝히고 싶지 않음</MenuItem>
              </Select>
            </FormControl>

            {/* 휴대폰번호 입력란 */}
            <TextField
              fullWidth
              name="phone"
              placeholder="휴대폰 번호"
              value={formData.phone}
              onChange={handleChange}
              sx={{ mb: 1.5 }}
              size="small"
              disabled={loading}
            />

            {/* 사용자 닉네임 입력란 */}
            <TextField
              fullWidth
              name="nickname"
              placeholder="사용자 이름"
              value={formData.nickname}
              onChange={handleChange}
              sx={{ mb: 1.5 }}
              size="small"
              disabled={loading}
            />

            {/* 비밀번호 입력란 */}
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

            {/* 가입완료 버튼 */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!isFormValid || loading}
              sx={{ mb: 2 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : '가입하기'}
            </Button>
          </Box>

          {/* 이용약관 안내 */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textAlign: 'center', display: 'block' }}
          >
            가입하면 Picstagram의 약관, 데이터 정책 및 쿠키 정책에 동의하게 됩니다.
          </Typography>
        </Box>

        {/* 로그인 카드 */}
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
            계정이 있으신가요?{' '}
            <Link
              to="/login"
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
                로그인
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default SignupPage;
