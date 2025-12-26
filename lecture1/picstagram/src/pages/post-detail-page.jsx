import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useAuth } from '../contexts/auth-context.jsx';
import { supabase } from '../lib/supabase.js';

/**
 * PostDetailPage 컴포넌트
 * 게시물 상세 페이지
 *
 * Props: 없음
 *
 * Example usage:
 * <PostDetailPage />
 */
function PostDetailPage() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comment, setComment] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);
      try {
        // 게시물 정보 가져오기
        const { data: postData, error: postError } = await supabase
          .from('posts')
          .select(`
            id,
            caption,
            location,
            created_at,
            user_id,
            users (
              id,
              nickname,
              profile_image
            ),
            post_images (
              id,
              image_url,
              image_order
            )
          `)
          .eq('id', postId)
          .single();

        if (postError) throw postError;

        const images = postData.post_images
          .sort((a, b) => a.image_order - b.image_order)
          .map((img) => img.image_url);

        // 시간 계산
        const createdAt = new Date(postData.created_at);
        const now = new Date();
        const diffMs = now - createdAt;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        let timeAgo;
        if (diffMins < 60) {
          timeAgo = `${diffMins}분 전`;
        } else if (diffHours < 24) {
          timeAgo = `${diffHours}시간 전`;
        } else {
          timeAgo = `${diffDays}일 전`;
        }

        setPost({
          id: postData.id,
          username: postData.users?.nickname || 'unknown',
          avatarUrl: postData.users?.profile_image || '',
          location: postData.location || '',
          images: images.length > 0 ? images : [],
          caption: postData.caption || '',
          createdAt: timeAgo,
          userId: postData.user_id,
        });

        // 좋아요 수 가져오기
        const { count: likes } = await supabase
          .from('likes')
          .select('*', { count: 'exact', head: true })
          .eq('post_id', postId);

        setLikesCount(likes || 0);

        // 현재 사용자가 좋아요 했는지 확인
        if (user) {
          const { data: likeData } = await supabase
            .from('likes')
            .select('id')
            .eq('post_id', postId)
            .eq('user_id', user.id)
            .single();

          setIsLiked(!!likeData);
        }

        // 댓글 가져오기
        const { data: commentsData, error: commentsError } = await supabase
          .from('comments')
          .select(`
            id,
            content,
            created_at,
            user_id,
            users (
              id,
              nickname,
              profile_image
            )
          `)
          .eq('post_id', postId)
          .order('created_at', { ascending: true });

        if (!commentsError && commentsData) {
          const formattedComments = commentsData.map((cmt) => {
            const cmtCreatedAt = new Date(cmt.created_at);
            const cmtDiffMs = now - cmtCreatedAt;
            const cmtDiffMins = Math.floor(cmtDiffMs / 60000);
            const cmtDiffHours = Math.floor(cmtDiffMs / 3600000);
            const cmtDiffDays = Math.floor(cmtDiffMs / 86400000);

            let cmtTimeAgo;
            if (cmtDiffMins < 60) {
              cmtTimeAgo = `${cmtDiffMins}분 전`;
            } else if (cmtDiffHours < 24) {
              cmtTimeAgo = `${cmtDiffHours}시간 전`;
            } else {
              cmtTimeAgo = `${cmtDiffDays}일 전`;
            }

            return {
              id: cmt.id,
              username: cmt.users?.nickname || 'unknown',
              avatarUrl: cmt.users?.profile_image || '',
              content: cmt.content,
              createdAt: cmtTimeAgo,
            };
          });

          setComments(formattedComments);
        }
      } catch (err) {
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [postId, user]);

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
          .eq('post_id', postId)
          .eq('user_id', user.id);

        setLikesCount((prev) => prev - 1);
      } else {
        await supabase
          .from('likes')
          .insert({
            post_id: postId,
            user_id: user.id,
          });

        setLikesCount((prev) => prev + 1);

        // 알림 생성 (자신의 게시물이 아닌 경우에만)
        if (post?.userId && post.userId !== user.id) {
          await supabase.from('notifications').insert({
            user_id: post.userId,
            actor_id: user.id,
            type: 'like',
            content: '님이 회원님의 게시물을 좋아합니다.',
            post_id: postId,
          });
        }
      }
      setIsLiked(!isLiked);
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  const handleSubmitComment = async () => {
    if (!comment.trim() || !user) {
      if (!user) navigate('/login');
      return;
    }

    setSubmitting(true);
    try {
      const { data: newComment, error } = await supabase
        .from('comments')
        .insert({
          post_id: postId,
          user_id: user.id,
          content: comment.trim(),
        })
        .select(`
          id,
          content,
          created_at,
          users (
            id,
            nickname,
            profile_image
          )
        `)
        .single();

      if (error) throw error;

      setComments((prev) => [
        ...prev,
        {
          id: newComment.id,
          username: newComment.users?.nickname || user.nickname,
          avatarUrl: newComment.users?.profile_image || user.profile_image,
          content: newComment.content,
          createdAt: '방금 전',
        },
      ]);

      // 알림 생성 (자신의 게시물이 아닌 경우에만)
      if (post?.userId && post.userId !== user.id) {
        const shortComment = comment.trim().length > 20
          ? comment.trim().substring(0, 20) + '...'
          : comment.trim();
        await supabase.from('notifications').insert({
          user_id: post.userId,
          actor_id: user.id,
          type: 'comment',
          content: `님이 댓글을 남겼습니다: "${shortComment}"`,
          post_id: postId,
        });
      }

      setComment('');
    } catch (err) {
      console.error('Comment error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
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
        <CircularProgress />
      </Box>
    );
  }

  if (!post) {
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
        <Typography>게시물을 찾을 수 없습니다.</Typography>
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
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h3" sx={{ fontWeight: 600 }}>
            게시물
          </Typography>
          <IconButton>
            <SendOutlinedIcon />
          </IconButton>
        </Box>
      </Box>

      {/* 게시물 영역 */}
      <Box sx={{ maxWidth: '470px', mx: 'auto' }}>
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
            onClick={() => navigate(`/profile/${post.username}`)}
          >
            <Avatar src={post.avatarUrl} sx={{ width: 32, height: 32 }} />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {post.username}
              </Typography>
              {post.location && (
                <Typography variant="caption" color="text.secondary">
                  {post.location}
                </Typography>
              )}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton size="small">
              <MoreHorizIcon />
            </IconButton>
          </Box>
        </Box>

        {/* 이미지 영역 */}
        {post.images.length > 0 && (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              aspectRatio: '1 / 1',
              bgcolor: '#000',
            }}
          >
            <Box
              component="img"
              src={post.images[currentImageIndex]}
              alt="Post"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {post.images.length > 1 && (
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
                    onClick={() => setCurrentImageIndex(index)}
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: index === currentImageIndex ? '#0095F6' : 'rgba(255,255,255,0.5)',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>
        )}

        {/* 리액션 영역 */}
        <Box sx={{ px: 1, pt: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton onClick={handleLike}>
                {isLiked ? <FavoriteIcon sx={{ color: '#ED4956' }} /> : <FavoriteBorderIcon />}
              </IconButton>
              <IconButton>
                <ChatBubbleOutlineIcon />
              </IconButton>
              <IconButton>
                <SendOutlinedIcon />
              </IconButton>
            </Box>
            <IconButton>
              <BookmarkBorderIcon />
            </IconButton>
          </Box>

          <Typography
            variant="body2"
            sx={{ fontWeight: 600, px: 1 }}
          >
            좋아요 {likesCount.toLocaleString()}개
          </Typography>

          <Box sx={{ px: 1, mt: 0.5 }}>
            <Typography variant="body2">
              <Typography component="span" sx={{ fontWeight: 600, mr: 0.5 }}>
                {post.username}
              </Typography>
              {post.caption}
            </Typography>
          </Box>

          <Typography variant="caption" color="text.secondary" sx={{ px: 1, display: 'block', mt: 0.5 }}>
            {post.createdAt}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* 댓글 영역 */}
        <Box sx={{ px: 2, pb: 10 }}>
          {comments.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography color="text.secondary">
                첫 번째 댓글을 남겨보세요.
              </Typography>
            </Box>
          ) : (
            comments.map((cmt) => (
              <Box key={cmt.id} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <Avatar
                    src={cmt.avatarUrl}
                    sx={{ width: 32, height: 32, cursor: 'pointer' }}
                    onClick={() => navigate(`/profile/${cmt.username}`)}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2">
                      <Typography
                        component="span"
                        sx={{ fontWeight: 600, mr: 0.5, cursor: 'pointer' }}
                        onClick={() => navigate(`/profile/${cmt.username}`)}
                      >
                        {cmt.username}
                      </Typography>
                      {cmt.content}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        {cmt.createdAt}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Box>

      {/* 댓글 입력 영역 */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
          p: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Avatar src={user?.profile_image} sx={{ width: 32, height: 32 }} />
        <TextField
          fullWidth
          placeholder={user ? '댓글 달기...' : '로그인 후 댓글을 작성하세요'}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          variant="standard"
          InputProps={{ disableUnderline: true }}
          disabled={!user || submitting}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmitComment();
            }
          }}
        />
        <Button
          disabled={!comment.trim() || submitting}
          onClick={handleSubmitComment}
          sx={{ fontWeight: 600 }}
        >
          {submitting ? '...' : '게시'}
        </Button>
      </Box>
    </Box>
  );
}

export default PostDetailPage;
