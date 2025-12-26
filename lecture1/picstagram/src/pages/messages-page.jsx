import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

/**
 * MessagesPage 컴포넌트
 * 메시지 목록 페이지
 *
 * Props: 없음
 *
 * Example usage:
 * <MessagesPage />
 */
function MessagesPage() {
  const navigate = useNavigate();

  const mockConversations = [
    {
      id: 1,
      username: 'travel_korea',
      avatarUrl: '',
      lastMessage: '좋은 사진이네요!',
      time: '1시간 전',
      isOnline: true,
      unread: true,
    },
    {
      id: 2,
      username: 'foodie_daily',
      avatarUrl: '',
      lastMessage: '다음에 같이 가요',
      time: '3시간 전',
      isOnline: false,
      unread: false,
    },
    {
      id: 3,
      username: 'photo_artist',
      avatarUrl: '',
      lastMessage: '감사합니다!',
      time: '어제',
      isOnline: true,
      unread: false,
    },
  ];

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
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h3" sx={{ fontWeight: 600 }}>
            메시지
          </Typography>
          <IconButton>
            <EditOutlinedIcon />
          </IconButton>
        </Box>
      </Box>

      {/* 메시지 목록 */}
      <Box>
        {mockConversations.map((conv) => (
          <Box
            key={conv.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              cursor: 'pointer',
              '&:hover': { bgcolor: 'action.hover' },
            }}
            onClick={() => navigate(`/chat/${conv.id}`)}
          >
            <Box sx={{ position: 'relative', mr: 2 }}>
              <Avatar src={conv.avatarUrl} sx={{ width: 56, height: 56 }} />
              {conv.isOnline && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 2,
                    right: 2,
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    bgcolor: '#78C257',
                    border: '2px solid white',
                  }}
                />
              )}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: conv.unread ? 600 : 400 }}
              >
                {conv.username}
              </Typography>
              <Typography
                variant="body2"
                color={conv.unread ? 'text.primary' : 'text.secondary'}
                sx={{
                  fontWeight: conv.unread ? 600 : 400,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {conv.lastMessage} · {conv.time}
              </Typography>
            </Box>
            {conv.unread && (
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default MessagesPage;
