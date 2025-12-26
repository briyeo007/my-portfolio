import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../contexts/auth-context.jsx';

/**
 * EditProfilePage 컴포넌트
 * 프로필 편집 페이지
 *
 * Props: 없음
 *
 * Example usage:
 * <EditProfilePage />
 */
function EditProfilePage() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    bio: '',
    gender: '',
    website: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        username: user.nickname || '',
        bio: user.bio || '',
        gender: user.gender || '',
        website: user.website || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
    setSuccess('');
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateProfile(formData);
      setSuccess('프로필이 저장되었습니다.');
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography>로그인이 필요합니다.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      {/* 상단바 */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          zIndex: 100,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 1,
            py: 1,
            minHeight: '44px',
          }}
        >
          <IconButton onClick={() => navigate(-1)} disabled={loading}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h3" sx={{ fontWeight: 600 }}>
            프로필 편집
          </Typography>
          <Button onClick={handleSave} sx={{ fontWeight: 600 }} disabled={loading}>
            {loading ? <CircularProgress size={20} /> : '완료'}
          </Button>
        </Box>
      </Box>

      <Box sx={{ p: 3, maxWidth: '500px', mx: 'auto' }}>
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

        {/* 프로필 이미지 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Avatar
            src={user.profile_image}
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <Typography
            variant="body2"
            color="primary"
            sx={{ cursor: 'pointer', fontWeight: 600 }}
          >
            프로필 사진 바꾸기
          </Typography>
        </Box>

        {/* 폼 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            label="이름"
            name="name"
            value={formData.name}
            onChange={handleChange}
            size="small"
            disabled={loading}
          />
          <TextField
            fullWidth
            label="사용자 이름"
            name="username"
            value={formData.username}
            onChange={handleChange}
            size="small"
            disabled={loading}
          />
          <TextField
            fullWidth
            label="웹사이트"
            name="website"
            value={formData.website}
            onChange={handleChange}
            size="small"
            placeholder="웹사이트 추가"
            disabled={loading}
          />
          <TextField
            fullWidth
            label="소개"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            multiline
            rows={3}
            size="small"
            disabled={loading}
          />
          <FormControl fullWidth size="small">
            <InputLabel>성별</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
              label="성별"
              onChange={handleChange}
              disabled={loading}
            >
              <MenuItem value="male">남성</MenuItem>
              <MenuItem value="female">여성</MenuItem>
              <MenuItem value="other">기타</MenuItem>
              <MenuItem value="prefer_not_to_say">밝히고 싶지 않음</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}

export default EditProfilePage;
