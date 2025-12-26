import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../contexts/auth-context.jsx';
import { supabase } from '../lib/supabase.js';

/**
 * NotificationsPage 컴포넌트
 * 알림 페이지
 *
 * Props: 없음
 *
 * Example usage:
 * <NotificationsPage />
 */
function NotificationsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState({ today: [], thisWeek: [], thisMonth: [] });
  const [loading, setLoading] = useState(true);
  const [followingIds, setFollowingIds] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // 내가 팔로우하는 사람들 목록 가져오기
        const { data: myFollowing } = await supabase
          .from('follows')
          .select('following_id')
          .eq('follower_id', user.id);

        const myFollowingIds = (myFollowing || []).map((f) => f.following_id);
        setFollowingIds(myFollowingIds);

        // 알림 가져오기
        const { data: notificationsData, error } = await supabase
          .from('notifications')
          .select(`
            id,
            type,
            content,
            post_id,
            created_at,
            is_read,
            actor_id,
            users!notifications_actor_id_fkey (
              id,
              nickname,
              profile_image
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(50);

        if (error) throw error;

        const now = new Date();
        const today = [];
        const thisWeek = [];
        const thisMonth = [];

        for (const noti of notificationsData || []) {
          const createdAt = new Date(noti.created_at);
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

          // 게시물 이미지 가져오기 (좋아요, 댓글인 경우)
          let postImage = null;
          if (noti.post_id && (noti.type === 'like' || noti.type === 'comment')) {
            const { data: postImages } = await supabase
              .from('post_images')
              .select('image_url')
              .eq('post_id', noti.post_id)
              .order('image_order', { ascending: true })
              .limit(1);

            postImage = postImages?.[0]?.image_url || null;
          }

          const formattedNoti = {
            id: noti.id,
            type: noti.type,
            username: noti.users?.nickname || 'unknown',
            avatarUrl: noti.users?.profile_image || '',
            actorId: noti.actor_id,
            content: noti.content,
            time: timeAgo,
            postId: noti.post_id,
            postImage,
            isFollowing: myFollowingIds.includes(noti.actor_id),
          };

          if (diffDays < 1) {
            today.push(formattedNoti);
          } else if (diffDays < 7) {
            thisWeek.push(formattedNoti);
          } else {
            thisMonth.push(formattedNoti);
          }
        }

        setNotifications({ today, thisWeek, thisMonth });
      } catch (err) {
        console.error('Error fetching notifications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [user]);

  const handleFollowToggle = async (notification) => {
    if (!user) return;

    try {
      if (notification.isFollowing) {
        await supabase
          .from('follows')
          .delete()
          .eq('follower_id', user.id)
          .eq('following_id', notification.actorId);

        setFollowingIds((prev) => prev.filter((id) => id !== notification.actorId));
      } else {
        await supabase
          .from('follows')
          .insert({
            follower_id: user.id,
            following_id: notification.actorId,
          });

        setFollowingIds((prev) => [...prev, notification.actorId]);
      }

      // 알림 목록 업데이트
      const updateNotifications = (list) =>
        list.map((n) =>
          n.actorId === notification.actorId ? { ...n, isFollowing: !n.isFollowing } : n
        );

      setNotifications((prev) => ({
        today: updateNotifications(prev.today),
        thisWeek: updateNotifications(prev.thisWeek),
        thisMonth: updateNotifications(prev.thisMonth),
      }));
    } catch (err) {
      console.error('Follow toggle error:', err);
    }
  };

  const renderNotification = (notification) => (
    <Box
      key={notification.id}
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        cursor: 'pointer',
        '&:hover': { bgcolor: 'action.hover' },
      }}
      onClick={() => {
        if (notification.type === 'follow') {
          navigate(`/profile/${notification.username}`);
        } else if (notification.postId) {
          navigate(`/post/${notification.postId}`);
        }
      }}
    >
      <Avatar
        src={notification.avatarUrl}
        sx={{ width: 44, height: 44, mr: 2 }}
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/profile/${notification.username}`);
        }}
      />
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2">
          <Typography component="span" sx={{ fontWeight: 600 }}>
            {notification.username}
          </Typography>
          {notification.content}{' '}
          <Typography component="span" color="text.secondary">
            {notification.time}
          </Typography>
        </Typography>
      </Box>
      {notification.type === 'follow' ? (
        <Button
          variant={notification.isFollowing ? 'outlined' : 'contained'}
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleFollowToggle(notification);
          }}
          sx={notification.isFollowing ? {
            borderColor: 'divider',
            color: 'text.primary',
          } : {}}
        >
          {notification.isFollowing ? '팔로잉' : '팔로우'}
        </Button>
      ) : (
        notification.postImage && (
          <Box
            component="img"
            src={notification.postImage}
            alt="Post"
            sx={{ width: 44, height: 44, objectFit: 'cover' }}
          />
        )
      )}
    </Box>
  );

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

  const hasNotifications =
    notifications.today.length > 0 ||
    notifications.thisWeek.length > 0 ||
    notifications.thisMonth.length > 0;

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
            알림
          </Typography>
        </Box>
      </Box>

      {/* 알림 목록 */}
      <Box>
        {!hasNotifications ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography color="text.secondary">
              알림이 없습니다.
            </Typography>
          </Box>
        ) : (
          <>
            {/* 오늘 */}
            {notifications.today.length > 0 && (
              <Box>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, p: 2, pb: 1 }}
                >
                  오늘
                </Typography>
                {notifications.today.map(renderNotification)}
              </Box>
            )}

            {/* 이번 주 */}
            {notifications.thisWeek.length > 0 && (
              <Box>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, p: 2, pb: 1 }}
                >
                  이번 주
                </Typography>
                {notifications.thisWeek.map(renderNotification)}
              </Box>
            )}

            {/* 이번 달 */}
            {notifications.thisMonth.length > 0 && (
              <Box>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, p: 2, pb: 1 }}
                >
                  이번 달
                </Typography>
                {notifications.thisMonth.map(renderNotification)}
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

export default NotificationsPage;
