import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ButtonSection from './components/sections/button-section';
import InputSection from './components/sections/input-section';
import NavigationSection from './components/sections/navigation-section';
import DropdownSection from './components/sections/dropdown-section';
import CheckboxSection from './components/sections/checkbox-section';
import RadioSection from './components/sections/radio-section';
import SliderSection from './components/sections/slider-section';
import ModalSection from './components/sections/modal-section';
import CardSection from './components/sections/card-section';
import DragDropSection from './components/sections/drag-drop-section';

/**
 * App 컴포넌트
 * 16개 UI 섹션을 순차적으로 추가할 수 있는 메인 레이아웃
 *
 * 섹션 추가 방법:
 * 1. src/components/sections/ 에 새 섹션 컴포넌트 생성
 * 2. 여기서 import 후 섹션 영역에 추가
 */
function App() {
  return (
    <Box sx={{
      width: '100%',
      minHeight: '100vh',
      bgcolor: 'background.default'
    }}>
      {/* 헤더 영역 */}
      <Box
        component="header"
        sx={{
          py: { xs: 3, md: 4 },
          textAlign: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.5rem', md: '2rem' }
            }}
          >
            UI Components Test
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            16개 UI 요소 테스트 페이지
          </Typography>
        </Container>
      </Box>

      {/* 메인 컨텐츠 영역 - 섹션들이 순차적으로 추가됨 */}
      <Box component="main">
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
          {/* 섹션 1: Button */}
          <ButtonSection />

          {/* 섹션 2: Input */}
          <InputSection />

          {/* 섹션 3: Navigation */}
          <NavigationSection />

          {/* 섹션 4: Dropdown */}
          <DropdownSection />

          {/* 섹션 5: Checkbox */}
          <CheckboxSection />

          {/* 섹션 6: Radio */}
          <RadioSection />

          {/* 섹션 7: Slider */}
          <SliderSection />

          {/* 섹션 8: Modal */}
          <ModalSection />

          {/* 섹션 9: Card */}
          <CardSection />

          {/* 섹션 10: Drag & Drop */}
          <DragDropSection />

          {/* 섹션 11 */}
          {/* <Section11 /> */}

          {/* 섹션 12 */}
          {/* <Section12 /> */}

          {/* 섹션 13 */}
          {/* <Section13 /> */}

          {/* 섹션 14 */}
          {/* <Section14 /> */}

          {/* 섹션 15 */}
          {/* <Section15 /> */}

          {/* 섹션 16 */}
          {/* <Section16 /> */}
        </Container>
      </Box>
    </Box>
  );
}

export default App;
