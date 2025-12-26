import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonIcon from '@mui/icons-material/Person';

/**
 * BottomNav 컴포넌트
 * 하단 네비게이션 바
 *
 * Props: 없음
 *
 * Example usage:
 * <BottomNav />
 */
function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/main' || path === '/') return 'home';
    if (path === '/search') return 'search';
    if (path === '/upload') return 'upload';
    if (path === '/profile') return 'profile';
    return 'home';
  };

  const handleNavigation = (event, newValue) => {
    switch (newValue) {
      case 'home':
        navigate('/main');
        break;
      case 'search':
        navigate('/search');
        break;
      case 'upload':
        navigate('/upload');
        break;
      case 'profile':
        navigate('/profile');
        break;
      default:
        navigate('/main');
    }
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
      elevation={0}
    >
      <BottomNavigation
        value={getActiveTab()}
        onChange={handleNavigation}
        sx={{
          bgcolor: 'background.paper',
          height: '50px',
          '& .MuiBottomNavigationAction-root': {
            minWidth: 'auto',
            padding: '6px 0',
            color: 'text.primary',
          },
          '& .Mui-selected': {
            color: 'text.primary',
          },
        }}
      >
        <BottomNavigationAction
          value="home"
          icon={
            getActiveTab() === 'home' ? (
              <HomeIcon sx={{ fontSize: 28 }} />
            ) : (
              <HomeOutlinedIcon sx={{ fontSize: 28 }} />
            )
          }
        />
        <BottomNavigationAction
          value="search"
          icon={<SearchIcon sx={{ fontSize: 28 }} />}
        />
        <BottomNavigationAction
          value="upload"
          icon={<AddBoxOutlinedIcon sx={{ fontSize: 28 }} />}
        />
        <BottomNavigationAction
          value="profile"
          icon={
            getActiveTab() === 'profile' ? (
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  border: '2px solid',
                  borderColor: 'text.primary',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Avatar
                  sx={{ width: 24, height: 24 }}
                  src=""
                />
              </Box>
            ) : (
              <Avatar
                sx={{ width: 28, height: 28, border: 'none' }}
                src=""
              />
            )
          }
        />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNav;
