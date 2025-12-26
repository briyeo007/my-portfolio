import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Header from '../components/common/header.jsx';
import BottomNav from '../components/common/bottom-nav.jsx';
import StoryList from '../components/ui/story-list.jsx';
import PostCard from '../components/ui/post-card.jsx';
import { supabase } from '../lib/supabase.js';

/**
 * MainPage 컴포넌트
 * 메인 피드 페이지
 *
 * Props: 없음
 *
 * Example usage:
 * <MainPage />
 */
function MainPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data: postsData, error } = await supabase
          .from('posts')
          .select(`
            id,
            caption,
            location,
            likes_hidden,
            comments_enabled,
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
          .order('created_at', { ascending: false })
          .limit(20);

        if (error) throw error;

        const formattedPosts = await Promise.all(
          (postsData || []).map(async (post) => {
            const { count: likesCount } = await supabase
              .from('likes')
              .select('*', { count: 'exact', head: true })
              .eq('post_id', post.id);

            const { count: commentsCount } = await supabase
              .from('comments')
              .select('*', { count: 'exact', head: true })
              .eq('post_id', post.id);

            const images = post.post_images
              .sort((a, b) => a.image_order - b.image_order)
              .map((img) => img.image_url);

            const createdAt = new Date(post.created_at);
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

            return {
              id: post.id,
              userId: post.user_id,
              username: post.users?.nickname || 'unknown',
              avatarUrl: post.users?.profile_image || '',
              location: post.location || '',
              images: images.length > 0 ? images : ['https://picsum.photos/seed/default/600/600'],
              likesCount: likesCount || 0,
              caption: post.caption || '',
              commentsCount: commentsCount || 0,
              createdAt: timeAgo,
              likesHidden: post.likes_hidden,
              commentsEnabled: post.comments_enabled,
            };
          })
        );

        setPosts(formattedPosts);
      } catch (err) {
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      {/* 상단바 */}
      <Header />

      {/* 메인 콘텐츠 */}
      <Box
        sx={{
          pt: { xs: '44px', md: '60px' },
          pb: '50px',
          maxWidth: '470px',
          mx: 'auto',
        }}
      >
        {/* 스토리 영역 */}
        <StoryList />

        {/* 타임라인 영역 */}
        <Box>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : posts.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography color="text.secondary">
                게시물이 없습니다. 첫 게시물을 올려보세요!
              </Typography>
            </Box>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </Box>
      </Box>

      {/* 하단바 */}
      <BottomNav />
    </Box>
  );
}

export default MainPage;
