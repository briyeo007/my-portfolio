import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import BottomNav from '../components/common/bottom-nav.jsx';
import { supabase } from '../lib/supabase.js';

/**
 * SearchPage 컴포넌트
 * 검색 페이지
 *
 * Props: 없음
 *
 * Example usage:
 * <SearchPage />
 */
function SearchPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState({
    users: [],
    hashtags: [],
  });

  const mockExplorePosts = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    imageUrl: `https://picsum.photos/seed/explore${i}/300/300`,
  }));

  useEffect(() => {
    const searchUsers = async () => {
      if (searchQuery.length < 1) {
        setSearchResults({ users: [], hashtags: [] });
        return;
      }

      setLoading(true);
      try {
        const { data: users, error } = await supabase
          .from('users')
          .select('id, nickname, name, profile_image')
          .or(`nickname.ilike.%${searchQuery}%,name.ilike.%${searchQuery}%`)
          .limit(10);

        if (error) throw error;

        const { data: hashtags, error: hashtagError } = await supabase
          .from('hashtags')
          .select('id, name')
          .ilike('name', `%${searchQuery}%`)
          .limit(10);

        setSearchResults({
          users: users || [],
          hashtags: hashtags || [],
        });
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchUsers, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsSearching(e.target.value.length > 0);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    setSearchResults({ users: [], hashtags: [] });
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'background.default',
        pb: '50px',
      }}
    >
      {/* 검색바 */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          bgcolor: 'background.paper',
          zIndex: 100,
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <TextField
          fullWidth
          placeholder="검색"
          value={searchQuery}
          onChange={handleSearchChange}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={handleClearSearch}>
                  <CloseIcon fontSize="small" />
                </IconButton>
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

      {isSearching ? (
        /* 검색 결과 */
        <Box>
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
            <Tab label="인기" />
            <Tab label="계정" />
            <Tab label="태그" />
            <Tab label="장소" />
          </Tabs>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {/* 인기 탭 - 계정과 태그 모두 표시 */}
              {activeTab === 0 && (
                <Box>
                  {searchResults.users.length === 0 && searchResults.hashtags.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Typography color="text.secondary">검색 결과가 없습니다.</Typography>
                    </Box>
                  ) : (
                    <>
                      {searchResults.users.map((user) => (
                        <Box
                          key={user.id}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 2,
                            cursor: 'pointer',
                            '&:hover': { bgcolor: 'action.hover' },
                          }}
                          onClick={() => navigate(`/profile/${user.nickname}`)}
                        >
                          <Avatar src={user.profile_image} sx={{ mr: 2 }} />
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {user.nickname}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {user.name}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                      {searchResults.hashtags.map((tag) => (
                        <Box
                          key={tag.id}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 2,
                            cursor: 'pointer',
                            '&:hover': { bgcolor: 'action.hover' },
                          }}
                          onClick={() => navigate(`/hashtag/${tag.name}`)}
                        >
                          <Box
                            sx={{
                              width: 44,
                              height: 44,
                              borderRadius: '50%',
                              border: '1px solid',
                              borderColor: 'divider',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mr: 2,
                              fontSize: '20px',
                            }}
                          >
                            #
                          </Box>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              #{tag.name}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </>
                  )}
                </Box>
              )}

              {/* 계정 탭 */}
              {activeTab === 1 && (
                <Box>
                  {searchResults.users.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Typography color="text.secondary">검색 결과가 없습니다.</Typography>
                    </Box>
                  ) : (
                    searchResults.users.map((user) => (
                      <Box
                        key={user.id}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          p: 2,
                          cursor: 'pointer',
                          '&:hover': { bgcolor: 'action.hover' },
                        }}
                        onClick={() => navigate(`/profile/${user.nickname}`)}
                      >
                        <Avatar src={user.profile_image} sx={{ mr: 2 }} />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {user.nickname}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {user.name}
                          </Typography>
                        </Box>
                      </Box>
                    ))
                  )}
                </Box>
              )}

              {/* 태그 탭 */}
              {activeTab === 2 && (
                <Box>
                  {searchResults.hashtags.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Typography color="text.secondary">검색 결과가 없습니다.</Typography>
                    </Box>
                  ) : (
                    searchResults.hashtags.map((tag) => (
                      <Box
                        key={tag.id}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          p: 2,
                          cursor: 'pointer',
                          '&:hover': { bgcolor: 'action.hover' },
                        }}
                        onClick={() => navigate(`/hashtag/${tag.name}`)}
                      >
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            borderRadius: '50%',
                            border: '1px solid',
                            borderColor: 'divider',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2,
                            fontSize: '20px',
                          }}
                        >
                          #
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            #{tag.name}
                          </Typography>
                        </Box>
                      </Box>
                    ))
                  )}
                </Box>
              )}

              {/* 장소 탭 */}
              {activeTab === 3 && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography color="text.secondary">장소 검색 기능은 준비 중입니다.</Typography>
                </Box>
              )}
            </>
          )}
        </Box>
      ) : (
        /* 탐색 화면 */
        <Box>
          {/* 추천 콘텐츠 그리드 */}
          <Grid container spacing={0.25}>
            {mockExplorePosts.map((post) => (
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
                    alt={`Explore ${post.id}`}
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
        </Box>
      )}

      <BottomNav />
    </Box>
  );
}

export default SearchPage;
