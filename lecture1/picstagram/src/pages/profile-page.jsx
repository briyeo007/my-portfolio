import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import GridOnIcon from '@mui/icons-material/GridOn';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BottomNav from '../components/common/bottom-nav.jsx';
import { useAuth } from '../contexts/auth-context.jsx';
import { supabase } from '../lib/supabase.js';

/**
 * ProfilePage 컴포넌트
 * 사용자 프로필 페이지
 *
 * Props: 없음
 *
 * Example usage:
 * <ProfilePage />
 */
function ProfilePage() {
  const navigate = useNavigate();
  const { username } = useParams();
  const { user: currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    postsCount: 0,
    followersCount: 0,
    followingCount: 0,
  });
  const [posts, setPosts] = useState([]);

  const isOwnProfile = !username || (currentUser && currentUser.nickname === username);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        let userData;

        if (isOwnProfile && currentUser) {
          userData = currentUser;
        } else if (username) {
          const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('nickname', username)
            .single();

          if (error) throw error;
          userData = data;
        }

        setProfileUser(userData);

        if (userData) {
          const { count: postsCount } = await supabase
            .from('posts')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userData.id);

          const { count: followersCount } = await supabase
            .from('follows')
            .select('*', { count: 'exact', head: true })
            .eq('following_id', userData.id);

          const { count: followingCount } = await supabase
            .from('follows')
            .select('*', { count: 'exact', head: true })
            .eq('follower_id', userData.id);

          setStats({
            postsCount: postsCount || 0,
            followersCount: followersCount || 0,
            followingCount: followingCount || 0,
          });

          if (currentUser && !isOwnProfile) {
            const { data: followData } = await supabase
              .from('follows')
              .select('id')
              .eq('follower_id', currentUser.id)
              .eq('following_id', userData.id)
              .single();

            setIsFollowing(!!followData);
          }

          // 사용자의 게시물 가져오기
          const { data: postsData, error: postsError } = await supabase
            .from('posts')
            .select(`
              id,
              post_images (
                id,
                image_url,
                image_order
              )
            `)
            .eq('user_id', userData.id)
            .order('created_at', { ascending: false });

          if (!postsError && postsData) {
            const formattedPosts = postsData.map((post) => {
              const sortedImages = post.post_images
                .sort((a, b) => a.image_order - b.image_order);
              return {
                id: post.id,
                imageUrl: sortedImages[0]?.image_url || '',
              };
            }).filter((post) => post.imageUrl);

            setPosts(formattedPosts);
          }
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username, currentUser, isOwnProfile]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleFollowClick = async () => {
    if (!currentUser || !profileUser) return;

    try {
      if (isFollowing) {
        await supabase
          .from('follows')
          .delete()
          .eq('follower_id', currentUser.id)
          .eq('following_id', profileUser.id);

        setStats(prev => ({ ...prev, followersCount: prev.followersCount - 1 }));
      } else {
        await supabase
          .from('follows')
          .insert({
            follower_id: currentUser.id,
            following_id: profileUser.id,
          });

        setStats(prev => ({ ...prev, followersCount: prev.followersCount + 1 }));

        // 팔로우 알림 생성
        await supabase.from('notifications').insert({
          user_id: profileUser.id,
          actor_id: currentUser.id,
          type: 'follow',
          content: '님이 회원님을 팔로우하기 시작했습니다.',
        });
      }
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error('Follow error:', err);
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

  if (!profileUser) {
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
        <Typography>사용자를 찾을 수 없습니다.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'background.default',
        pb: '50px',
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
            px: 2,
            py: 1,
            minHeight: '44px',
          }}
        >
          {!isOwnProfile ? (
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>
          ) : (
            <Box sx={{ width: 40 }} />
          )}
          <Typography variant="h3" sx={{ fontWeight: 600 }}>
            {profileUser.nickname}
          </Typography>
          {isOwnProfile ? (
            <IconButton onClick={() => navigate('/settings')}>
              <SettingsOutlinedIcon />
            </IconButton>
          ) : (
            <Box sx={{ width: 40 }} />
          )}
        </Box>
      </Box>

      <Container maxWidth="sm" sx={{ pt: 2 }}>
        {/* 프로필 정보 */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, px: 2 }}>
          {/* 프로필 이미지 */}
          <Avatar
            src={profileUser.profile_image}
            sx={{ width: 77, height: 77, mr: 4 }}
          />

          {/* 통계 */}
          <Box sx={{ display: 'flex', gap: 4, flex: 1 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {stats.postsCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                게시물
              </Typography>
            </Box>
            <Box
              sx={{ textAlign: 'center', cursor: 'pointer' }}
              onClick={() => navigate(`/followers/${profileUser.nickname}`)}
            >
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {stats.followersCount.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                팔로워
              </Typography>
            </Box>
            <Box
              sx={{ textAlign: 'center', cursor: 'pointer' }}
              onClick={() => navigate(`/following/${profileUser.nickname}`)}
            >
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {stats.followingCount.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                팔로잉
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* 이름 및 바이오 */}
        <Box sx={{ px: 2, mb: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {profileUser.name}
          </Typography>
          <Typography variant="body2">
            {profileUser.bio || '소개가 없습니다.'}
          </Typography>
        </Box>

        {/* 버튼 영역 */}
        <Box sx={{ display: 'flex', gap: 1, px: 2, mb: 2 }}>
          {isOwnProfile ? (
            <>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  borderColor: 'divider',
                  color: 'text.primary',
                  bgcolor: 'background.paper',
                }}
                onClick={() => navigate('/edit-profile')}
              >
                프로필 편집
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  borderColor: 'divider',
                  color: 'text.primary',
                  bgcolor: 'background.paper',
                }}
              >
                프로필 공유
              </Button>
            </>
          ) : (
            <>
              <Button
                variant={isFollowing ? 'outlined' : 'contained'}
                fullWidth
                onClick={handleFollowClick}
                sx={isFollowing ? {
                  borderColor: 'divider',
                  color: 'text.primary',
                  bgcolor: 'background.paper',
                } : {}}
              >
                {isFollowing ? '팔로잉' : '팔로우'}
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  borderColor: 'divider',
                  color: 'text.primary',
                  bgcolor: 'background.paper',
                }}
                onClick={() => navigate('/messages')}
              >
                메시지
              </Button>
            </>
          )}
        </Box>

        {/* 탭 메뉴 */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            borderTop: '1px solid',
            borderColor: 'divider',
            '& .MuiTab-root': {
              minHeight: '44px',
              color: 'text.secondary',
            },
            '& .Mui-selected': {
              color: 'text.primary',
            },
          }}
        >
          <Tab icon={<GridOnIcon />} aria-label="게시물" />
          {isOwnProfile && <Tab icon={<BookmarkBorderIcon />} aria-label="저장됨" />}
          <Tab icon={<AccountBoxOutlinedIcon />} aria-label="태그됨" />
        </Tabs>

        {/* 게시물 그리드 */}
        {posts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography color="text.secondary">
              게시물이 없습니다.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={0.25}>
            {posts.map((post) => (
              <Grid size={{ xs: 4 }} key={post.id}>
                <Box
                  sx={{
                    aspectRatio: '1 / 1',
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate(`/post/${post.id}`)}
                >
                  <Box
                    component="img"
                    src={post.imageUrl}
                    alt={`Post ${post.id}`}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <BottomNav />
    </Box>
  );
}

export default ProfilePage;
