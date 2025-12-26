import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

/**
 * Header 컴포넌트
 * 메인 페이지 상단 네비게이션 바
 *
 * Props: 없음
 *
 * Example usage:
 * <Header />
 */
function Header() {
  const navigate = useNavigate();
  const [notificationCount] = useState(3);

  const handleNotificationClick = () => {
    navigate('/notifications');
  };

  const handleMessageClick = () => {
    navigate('/messages');
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          minHeight: { xs: '44px', md: '60px' },
          px: { xs: 2, md: 3 },
        }}
      >
        {/* 로고 */}
        <Box
          onClick={() => navigate('/')}
          sx={{ cursor: 'pointer' }}
        >
          <Typography
            sx={{
              fontFamily: '"Billabong", cursive',
              fontSize: { xs: '24px', md: '28px' },
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

        {/* 우측 아이콘 영역 */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {/* 알림 버튼 */}
          <IconButton
            onClick={handleNotificationClick}
            sx={{ color: 'text.primary' }}
          >
            <Badge badgeContent={notificationCount} color="error">
              <FavoriteBorderIcon />
            </Badge>
          </IconButton>

          {/* 메시지 버튼 */}
          <IconButton
            onClick={handleMessageClick}
            sx={{ color: 'text.primary' }}
          >
            <ChatBubbleOutlineIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
