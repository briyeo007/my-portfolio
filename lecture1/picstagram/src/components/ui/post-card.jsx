import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useAuth } from '../../contexts/auth-context.jsx';
import { supabase } from '../../lib/supabase.js';

/**
 * PostCard 컴포넌트
 * 피드에 표시되는 게시물 카드
 *
 * Props:
 * @param {object} post - 게시물 데이터 [Required]
 * @param {string} post.id - 게시물 ID
 * @param {string} post.username - 작성자 이름
 * @param {string} post.avatarUrl - 작성자 프로필 이미지
 * @param {string} post.location - 위치/장소
 * @param {array} post.images - 이미지 URL 배열
 * @param {number} post.likesCount - 좋아요 수
 * @param {string} post.caption - 게시물 내용
 * @param {number} post.commentsCount - 댓글 수
 * @param {string} post.createdAt - 업로드 시간
 *
 * Example usage:
 * <PostCard post={postData} />
 */
function PostCard({ post }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullCaption, setShowFullCaption] = useState(false);

  useEffect(() => {
    const checkLikeStatus = async () => {
      if (!user) return;

      const { data } = await supabase
        .from('likes')
        .select('id')
        .eq('post_id', post.id)
        .eq('user_id', user.id)
        .single();

      setIsLiked(!!data);
    };

    checkLikeStatus();
  }, [post.id, user]);

  const handleLike = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      if (isLiked) {
        await supabase
          .from('likes')
          .delete()
          .eq('post_id', post.id)
          .eq('user_id', user.id);

        setLikesCount((prev) => prev - 1);
      } else {
        await supabase
          .from('likes')
          .insert({
            post_id: post.id,
            user_id: user.id,
          });

        setLikesCount((prev) => prev + 1);

        // 알림 생성 (자신의 게시물이 아닌 경우에만)
        if (post.userId && post.userId !== user.id) {
          await supabase.from('notifications').insert({
            user_id: post.userId,
            actor_id: user.id,
            type: 'like',
            content: '님이 회원님의 게시물을 좋아합니다.',
            post_id: post.id,
          });
        }
      }
      setIsLiked(!isLiked);
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleProfileClick = () => {
    navigate(`/profile/${post.username}`);
  };

  const handleImageSwipe = (direction) => {
    if (direction === 'next' && currentImageIndex < post.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else if (direction === 'prev' && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleDoubleClick = async () => {
    if (!isLiked) {
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        await supabase
          .from('likes')
          .insert({
            post_id: post.id,
            user_id: user.id,
          });

        setLikesCount((prev) => prev + 1);
        setIsLiked(true);

        // 알림 생성 (자신의 게시물이 아닌 경우에만)
        if (post.userId && post.userId !== user.id) {
          await supabase.from('notifications').insert({
            user_id: post.userId,
            actor_id: user.id,
            type: 'like',
            content: '님이 회원님의 게시물을 좋아합니다.',
            post_id: post.id,
          });
        }
      } catch (err) {
        console.error('Like error:', err);
      }
    }
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        mb: 0,
      }}
    >
      {/* 프로필 영역 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 1.5,
          px: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            cursor: 'pointer',
          }}
          onClick={handleProfileClick}
        >
          <Avatar
            src={post.avatarUrl}
            sx={{ width: 32, height: 32 }}
          />
          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, lineHeight: 1.2 }}
            >
              {post.username}
            </Typography>
            {post.location && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ lineHeight: 1 }}
              >
                {post.location}
              </Typography>
            )}
          </Box>
        </Box>
        <IconButton size="small">
          <MoreHorizIcon />
        </IconButton>
      </Box>

      {/* 이미지 영역 */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          bgcolor: '#000',
          cursor: 'pointer',
        }}
        onDoubleClick={handleDoubleClick}
      >
        <Box
          component="img"
          src={post.images[currentImageIndex]}
          alt={`Post image ${currentImageIndex + 1}`}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* 이미지 네비게이션 (여러 장일 경우) */}
        {post.images.length > 1 && (
          <>
            {/* 좌우 버튼 */}
            {currentImageIndex > 0 && (
              <Box
                onClick={() => handleImageSwipe('prev')}
                sx={{
                  position: 'absolute',
                  left: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  bgcolor: 'rgba(255,255,255,0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#262626',
                }}
              >
                ‹
              </Box>
            )}
            {currentImageIndex < post.images.length - 1 && (
              <Box
                onClick={() => handleImageSwipe('next')}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  bgcolor: 'rgba(255,255,255,0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#262626',
                }}
              >
                ›
              </Box>
            )}

            {/* 이미지 순서 인디케이터 */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 12,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 0.5,
              }}
            >
              {post.images.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: index === currentImageIndex
                      ? '#0095F6'
                      : 'rgba(255,255,255,0.5)',
                  }}
                />
              ))}
            </Box>
          </>
        )}
      </Box>

      {/* 리액션 영역 */}
      <Box sx={{ px: 1, pt: 1 }}>
        {/* 아이콘 버튼들 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton onClick={handleLike} sx={{ color: isLiked ? '#ED4956' : 'text.primary' }}>
              {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <IconButton sx={{ color: 'text.primary' }} onClick={() => navigate(`/post/${post.id}`)}>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <IconButton sx={{ color: 'text.primary' }}>
              <SendOutlinedIcon />
            </IconButton>
          </Box>
          <IconButton onClick={handleSave} sx={{ color: 'text.primary' }}>
            {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </Box>

        {/* 좋아요 수 */}
        <Typography
          variant="body2"
          sx={{ fontWeight: 600, px: 1 }}
        >
          좋아요 {likesCount.toLocaleString()}개
        </Typography>

        {/* 캡션 */}
        <Box sx={{ px: 1, mt: 0.5 }}>
          <Typography variant="body2" component="span">
            <Typography
              component="span"
              variant="body2"
              sx={{ fontWeight: 600, mr: 0.5 }}
            >
              {post.username}
            </Typography>
            {showFullCaption || post.caption.length <= 100
              ? post.caption
              : `${post.caption.substring(0, 100)}...`}
            {post.caption.length > 100 && !showFullCaption && (
              <Typography
                component="span"
                variant="body2"
                color="text.secondary"
                sx={{ cursor: 'pointer', ml: 0.5 }}
                onClick={() => setShowFullCaption(true)}
              >
                더 보기
              </Typography>
            )}
          </Typography>
        </Box>

        {/* 댓글 수 */}
        {post.commentsCount > 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ px: 1, mt: 0.5, cursor: 'pointer' }}
            onClick={() => navigate(`/post/${post.id}`)}
          >
            댓글 {post.commentsCount}개 모두 보기
          </Typography>
        )}

        {/* 업로드 시간 */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ px: 1, display: 'block', mt: 0.5, pb: 1.5 }}
        >
          {post.createdAt}
        </Typography>
      </Box>
    </Box>
  );
}

export default PostCard;
