import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';

/**
 * ChatPage 컴포넌트
 * 메시지 대화 페이지
 *
 * Props: 없음
 *
 * Example usage:
 * <ChatPage />
 */
function ChatPage() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [message, setMessage] = useState('');

  const mockUser = {
    username: 'travel_korea',
    avatarUrl: '',
    isOnline: true,
  };

  const mockMessages = [
    { id: 1, senderId: 'other', content: '안녕하세요!', time: '오전 10:30' },
    { id: 2, senderId: 'me', content: '안녕하세요! 반갑습니다', time: '오전 10:31' },
    { id: 3, senderId: 'other', content: '좋은 사진이네요!', time: '오전 10:32', isRead: true },
    { id: 4, senderId: 'me', content: '감사합니다! 서울에서 찍은 사진이에요', time: '오전 10:33' },
    { id: 5, senderId: 'other', content: '어디서 찍으셨어요? 저도 가보고 싶네요', time: '오전 10:35' },
  ];

  const handleSend = () => {
    if (message.trim()) {
      console.log('Send message:', message);
      setMessage('');
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      {/* 상단바 */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              ml: 1,
              cursor: 'pointer',
            }}
            onClick={() => navigate(`/profile/${mockUser.username}`)}
          >
            <Box sx={{ position: 'relative', mr: 1.5 }}>
              <Avatar src={mockUser.avatarUrl} sx={{ width: 32, height: 32 }} />
              {mockUser.isOnline && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: '#78C257',
                    border: '2px solid white',
                  }}
                />
              )}
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {mockUser.username}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {mockUser.isOnline ? '활동 중' : '오프라인'}
              </Typography>
            </Box>
          </Box>
          <IconButton>
            <InfoOutlinedIcon />
          </IconButton>
        </Box>
      </Box>

      {/* 대화 영역 */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {/* 날짜 구분선 */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ textAlign: 'center', my: 2 }}
        >
          오늘
        </Typography>

        {mockMessages.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              display: 'flex',
              justifyContent: msg.senderId === 'me' ? 'flex-end' : 'flex-start',
            }}
          >
            {msg.senderId !== 'me' && (
              <Avatar sx={{ width: 24, height: 24, mr: 1 }} />
            )}
            <Box
              sx={{
                maxWidth: '70%',
                bgcolor: msg.senderId === 'me' ? 'primary.main' : 'background.paper',
                color: msg.senderId === 'me' ? 'white' : 'text.primary',
                borderRadius: '18px',
                px: 2,
                py: 1,
                border: msg.senderId === 'me' ? 'none' : '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="body2">{msg.content}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* 입력 영역 */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
          p: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            bgcolor: '#EFEFEF',
            borderRadius: '22px',
            px: 1,
          }}
        >
          <IconButton size="small">
            <CameraAltOutlinedIcon />
          </IconButton>
          <TextField
            fullWidth
            placeholder="메시지 보내기..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant="standard"
            InputProps={{ disableUnderline: true }}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          {message ? (
            <IconButton size="small" onClick={handleSend} color="primary">
              <SendIcon />
            </IconButton>
          ) : (
            <>
              <IconButton size="small">
                <ImageOutlinedIcon />
              </IconButton>
              <IconButton size="small">
                <FavoriteBorderIcon />
              </IconButton>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ChatPage;
