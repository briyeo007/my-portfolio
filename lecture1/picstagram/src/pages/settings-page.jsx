import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

/**
 * SettingsPage 컴포넌트
 * 설정 페이지
 *
 * Props: 없음
 *
 * Example usage:
 * <SettingsPage />
 */
function SettingsPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  const handleLogout = () => {
    navigate('/login');
  };

  const SettingItem = ({ icon, label, onClick, rightElement }) => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? { bgcolor: 'action.hover' } : {},
      }}
      onClick={onClick}
    >
      {icon && <Box sx={{ mr: 2, color: 'text.secondary' }}>{icon}</Box>}
      <Typography variant="body1" sx={{ flex: 1 }}>
        {label}
      </Typography>
      {rightElement || (onClick && <ChevronRightIcon color="action" />)}
    </Box>
  );

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
            px: 1,
            py: 1,
            minHeight: '44px',
          }}
        >
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h3" sx={{ fontWeight: 600, flex: 1, textAlign: 'center', mr: 5 }}>
            설정
          </Typography>
        </Box>
      </Box>

      {/* 계정 설정 */}
      <Box sx={{ bgcolor: 'background.paper', mb: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ p: 2, pb: 1 }}>
          계정
        </Typography>
        <SettingItem
          icon={<PersonOutlineIcon />}
          label="프로필 편집"
          onClick={() => navigate('/edit-profile')}
        />
        <SettingItem
          icon={<LockOutlinedIcon />}
          label="비밀번호 변경"
          onClick={() => console.log('비밀번호 변경')}
        />
        <SettingItem
          icon={<SecurityOutlinedIcon />}
          label="개인정보 설정"
          onClick={() => console.log('개인정보 설정')}
        />
      </Box>

      {/* 알림 설정 */}
      <Box sx={{ bgcolor: 'background.paper', mb: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ p: 2, pb: 1 }}>
          알림
        </Typography>
        <SettingItem
          icon={<NotificationsOutlinedIcon />}
          label="푸시 알림"
          rightElement={
            <Switch
              checked={pushNotifications}
              onChange={(e) => setPushNotifications(e.target.checked)}
            />
          }
        />
      </Box>

      {/* 테마 설정 */}
      <Box sx={{ bgcolor: 'background.paper', mb: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ p: 2, pb: 1 }}>
          테마
        </Typography>
        <SettingItem
          icon={<DarkModeOutlinedIcon />}
          label="다크 모드"
          rightElement={
            <Switch
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />
          }
        />
      </Box>

      {/* 정보 */}
      <Box sx={{ bgcolor: 'background.paper', mb: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ p: 2, pb: 1 }}>
          정보
        </Typography>
        <SettingItem
          icon={<HelpOutlineIcon />}
          label="도움말"
          onClick={() => console.log('도움말')}
        />
        <SettingItem
          icon={<InfoOutlinedIcon />}
          label="정보"
          onClick={() => console.log('정보')}
        />
        <SettingItem
          label="이용약관"
          onClick={() => console.log('이용약관')}
        />
        <SettingItem
          label="개인정보 처리방침"
          onClick={() => console.log('개인정보 처리방침')}
        />
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography variant="caption" color="text.secondary">
            앱 버전 1.0.0
          </Typography>
        </Box>
      </Box>

      {/* 로그아웃 */}
      <Box sx={{ bgcolor: 'background.paper' }}>
        <SettingItem
          icon={<LogoutIcon sx={{ color: 'error.main' }} />}
          label={
            <Typography color="error">로그아웃</Typography>
          }
          onClick={handleLogout}
        />
      </Box>
    </Box>
  );
}

export default SettingsPage;
