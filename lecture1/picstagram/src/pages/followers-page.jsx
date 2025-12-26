import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../contexts/auth-context.jsx';
import { supabase } from '../lib/supabase.js';

/**
 * FollowersPage 컴포넌트
 * 팔로워/팔로잉 목록 페이지
 *
 * Props: 없음
 *
 * Example usage:
 * <FollowersPage />
 */
function FollowersPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = useParams();
  const { user: currentUser } = useAuth();

  const isFollowingTab = location.pathname.includes('/following/');
  const [activeTab, setActiveTab] = useState(isFollowingTab ? 1 : 0);
  const [searchQuery, setSearchQuery] = useState('');
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileUser, setProfileUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id, nickname')
          .eq('nickname', username)
          .single();

        if (userError) throw userError;
        setProfileUser(userData);

        const { data: followersData, error: followersError } = await supabase
          .from('follows')
          .select(`
            id,
            follower_id,
            users!follows_follower_id_fkey (
              id,
              nickname,
              name,
              profile_image
            )
          `)
          .eq('following_id', userData.id);

        if (followersError) throw followersError;

        const { data: followingData, error: followingError } = await supabase
          .from('follows')
          .select(`
            id,
            following_id,
            users!follows_following_id_fkey (
              id,
              nickname,
              name,
              profile_image
            )
          `)
          .eq('follower_id', userData.id);

        if (followingError) throw followingError;

        let myFollowingIds = [];
        if (currentUser) {
          const { data: myFollowing } = await supabase
            .from('follows')
            .select('following_id')
            .eq('follower_id', currentUser.id);

          myFollowingIds = (myFollowing || []).map((f) => f.following_id);
        }

        const formattedFollowers = (followersData || []).map((f) => ({
          id: f.users.id,
          odId: f.id,
          username: f.users.nickname,
          name: f.users.name,
          avatarUrl: f.users.profile_image,
          isFollowing: myFollowingIds.includes(f.users.id),
        }));

        const formattedFollowing = (followingData || []).map((f) => ({
          id: f.users.id,
          odId: f.id,
          username: f.users.nickname,
          name: f.users.name,
          avatarUrl: f.users.profile_image,
          isFollowing: myFollowingIds.includes(f.users.id),
        }));

        setFollowers(formattedFollowers);
        setFollowing(formattedFollowing);
      } catch (err) {
        console.error('Error fetching follow data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username, currentUser]);

  const handleFollowToggle = async (targetUser) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    try {
      if (targetUser.isFollowing) {
        await supabase
          .from('follows')
          .delete()
          .eq('follower_id', currentUser.id)
          .eq('following_id', targetUser.id);
      } else {
        await supabase
          .from('follows')
          .insert({
            follower_id: currentUser.id,
            following_id: targetUser.id,
          });

        // 팔로우 알림 생성
        await supabase.from('notifications').insert({
          user_id: targetUser.id,
          actor_id: currentUser.id,
          type: 'follow',
          content: '님이 회원님을 팔로우하기 시작했습니다.',
        });
      }

      const updateList = (list) =>
        list.map((u) =>
          u.id === targetUser.id ? { ...u, isFollowing: !u.isFollowing } : u
        );

      setFollowers(updateList);
      setFollowing(updateList);
    } catch (err) {
      console.error('Follow toggle error:', err);
    }
  };

  const currentList = activeTab === 0 ? followers : following;
  const filteredList = currentList.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
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
            {username}
          </Typography>
        </Box>

        {/* 탭 메뉴 */}
        <Tabs
          value={activeTab}
          onChange={(e, v) => setActiveTab(v)}
          variant="fullWidth"
          sx={{
            borderBottom: '1px solid',
            borderColor: 'divider',
            '& .MuiTab-root': { minHeight: '44px' },
          }}
        >
          <Tab label={`팔로워 ${followers.length}`} />
          <Tab label={`팔로잉 ${following.length}`} />
        </Tabs>
      </Box>

      {/* 검색 */}
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          placeholder="검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: '#EFEFEF',
              borderRadius: '10px',
            },
          }}
        />
      </Box>

      {/* 사용자 목록 */}
      <Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : filteredList.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary">
              {activeTab === 0 ? '팔로워가 없습니다.' : '팔로잉하는 사용자가 없습니다.'}
            </Typography>
          </Box>
        ) : (
          filteredList.map((user) => (
            <Box
              key={user.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                px: 2,
                py: 1,
              }}
            >
              <Avatar
                src={user.avatarUrl}
                sx={{ width: 44, height: 44, mr: 2, cursor: 'pointer' }}
                onClick={() => navigate(`/profile/${user.username}`)}
              />
              <Box
                sx={{ flex: 1, cursor: 'pointer' }}
                onClick={() => navigate(`/profile/${user.username}`)}
              >
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {user.username}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user.name}
                </Typography>
              </Box>
              {currentUser && currentUser.id !== user.id && (
                <Button
                  variant={user.isFollowing ? 'outlined' : 'contained'}
                  size="small"
                  onClick={() => handleFollowToggle(user)}
                  sx={user.isFollowing ? {
                    borderColor: 'divider',
                    color: 'text.primary',
                  } : {}}
                >
                  {user.isFollowing ? '팔로잉' : '팔로우'}
                </Button>
              )}
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}

export default FollowersPage;
