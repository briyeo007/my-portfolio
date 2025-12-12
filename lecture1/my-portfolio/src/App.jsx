import { Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Navigation from './components/common/Navigation';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';

/**
 * App 컴포넌트
 * 포트폴리오 메인 앱 - React Router 설정
 *
 * 라우트 구성:
 * - / : Home (5개 섹션)
 * - /about : About Me 페이지
 * - /projects : Projects 페이지
 */
function App() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}
    >
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </Box>
  );
}

export default App;
