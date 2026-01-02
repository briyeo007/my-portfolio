import Box from '@mui/material/Box';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillSection from '@/components/sections/SkillSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';

/**
 * HomePage 컴포넌트
 * 포트폴리오 메인 페이지 (5개 섹션 구성)
 *
 * 섹션 구성:
 * 1. Hero - 메인 비주얼, 이름, 간단 소개
 * 2. About Me - 간단한 자기소개 + 더 알아보기 버튼
 * 3. Skill Tree - 기술 스택 시각화
 * 4. Projects - 대표작 썸네일 + 더 보기 버튼
 * 5. Contact - 연락처, SNS, 메시지 폼
 */
function HomePage() {
  return (
    <Box sx={{ width: '100%' }}>
      <HeroSection />
      <AboutSection />
      <SkillSection />
      <ProjectsSection />
      <ContactSection />
    </Box>
  );
}

export default HomePage;
