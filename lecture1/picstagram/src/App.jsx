import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login-page.jsx';
import SignupPage from './pages/signup-page.jsx';
import MainPage from './pages/main-page.jsx';
import ProfilePage from './pages/profile-page.jsx';
import EditProfilePage from './pages/edit-profile-page.jsx';
import SearchPage from './pages/search-page.jsx';
import UploadPage from './pages/upload-page.jsx';
import PostDetailPage from './pages/post-detail-page.jsx';
import MessagesPage from './pages/messages-page.jsx';
import ChatPage from './pages/chat-page.jsx';
import NotificationsPage from './pages/notifications-page.jsx';
import FollowersPage from './pages/followers-page.jsx';
import FindAccountPage from './pages/find-account-page.jsx';
import SettingsPage from './pages/settings-page.jsx';

/**
 * App 컴포넌트
 * 애플리케이션의 라우팅을 관리하는 메인 컴포넌트
 */
function App() {
  return (
    <Routes>
      {/* 인증 관련 */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/find-account" element={<FindAccountPage />} />

      {/* 메인 */}
      <Route path="/main" element={<MainPage />} />

      {/* 프로필 */}
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/:username" element={<ProfilePage />} />
      <Route path="/edit-profile" element={<EditProfilePage />} />

      {/* 팔로워/팔로잉 */}
      <Route path="/followers/:username" element={<FollowersPage />} />
      <Route path="/following/:username" element={<FollowersPage />} />

      {/* 검색 */}
      <Route path="/search" element={<SearchPage />} />

      {/* 게시물 */}
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/post/:postId" element={<PostDetailPage />} />

      {/* 메시지 */}
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/chat/:chatId" element={<ChatPage />} />

      {/* 알림 */}
      <Route path="/notifications" element={<NotificationsPage />} />

      {/* 설정 */}
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
}

export default App;
