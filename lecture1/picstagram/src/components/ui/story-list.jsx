import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

/**
 * StoryItem 컴포넌트
 * 개별 스토리 아이템
 *
 * Props:
 * @param {string} username - 사용자 이름 [Required]
 * @param {string} avatarUrl - 프로필 이미지 URL [Optional]
 * @param {boolean} hasStory - 스토리 존재 여부 [Optional, 기본값: true]
 * @param {boolean} isViewed - 스토리 조회 여부 [Optional, 기본값: false]
 * @param {function} onClick - 클릭 시 실행할 함수 [Optional]
 *
 * Example usage:
 * <StoryItem username="user1" hasStory={true} />
 */
function StoryItem({ username, avatarUrl, hasStory = true, isViewed = false, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        minWidth: '66px',
      }}
    >
      {/* 스토리 링 */}
      <Box
        sx={{
          width: '66px',
          height: '66px',
          borderRadius: '50%',
          padding: '3px',
          background: hasStory
            ? isViewed
              ? '#DBDBDB'
              : 'linear-gradient(45deg, #F77737, #E1306C, #833AB4)'
            : 'transparent',
          mb: 0.5,
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            bgcolor: 'background.paper',
            padding: '2px',
          }}
        >
          <Avatar
            src={avatarUrl}
            sx={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
          />
        </Box>
      </Box>
      <Typography
        variant="caption"
        sx={{
          maxWidth: '66px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          color: 'text.primary',
        }}
      >
        {username}
      </Typography>
    </Box>
  );
}

/**
 * StoryList 컴포넌트
 * 스토리 목록을 가로 스크롤로 표시
 *
 * Props: 없음
 *
 * Example usage:
 * <StoryList />
 */
function StoryList() {
  const mockStories = [
    { id: 1, username: '내 스토리', hasStory: false },
    { id: 2, username: 'user_one', hasStory: true, isViewed: false },
    { id: 3, username: 'traveler', hasStory: true, isViewed: false },
    { id: 4, username: 'foodie_kr', hasStory: true, isViewed: true },
    { id: 5, username: 'photo_daily', hasStory: true, isViewed: false },
    { id: 6, username: 'music_lover', hasStory: true, isViewed: true },
    { id: 7, username: 'pet_friends', hasStory: true, isViewed: false },
  ];

  const handleStoryClick = (storyId) => {
    console.log('Story clicked:', storyId);
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        py: 2,
        px: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {mockStories.map((story) => (
          <StoryItem
            key={story.id}
            username={story.username}
            avatarUrl={story.avatarUrl}
            hasStory={story.hasStory}
            isViewed={story.isViewed}
            onClick={() => handleStoryClick(story.id)}
          />
        ))}
      </Box>
    </Box>
  );
}

export default StoryList;
