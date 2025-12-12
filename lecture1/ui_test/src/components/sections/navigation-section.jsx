import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

/**
 * NavigationSection 컴포넌트
 * MUI AppBar와 Toolbar를 사용한 네비게이션 섹션
 *
 * 기능:
 * - 데스크톱: 가로 메뉴 버튼
 * - 모바일: 햄버거 메뉴 + Drawer
 * - 클릭 시 알림창 표시
 */
function NavigationSection() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = ['홈', '소개', '서비스', '연락처'];

  const handleMenuClick = (menu) => {
    alert(`${menu} 메뉴가 클릭되었습니다!`);
    setDrawerOpen(false);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ mb: { xs: 4, md: 6 } }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: 600,
          mb: 3,
          pb: 1,
          borderBottom: '2px solid',
          borderColor: 'primary.main'
        }}
      >
        Navigation
      </Typography>

      <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontWeight: 600 }}
            >
              Logo
            </Typography>

            {isMobile ? (
              <>
                <IconButton
                  color="inherit"
                  edge="end"
                  onClick={toggleDrawer(true)}
                  aria-label="메뉴 열기"
                >
                  <MenuIcon />
                </IconButton>
                <Drawer
                  anchor="right"
                  open={drawerOpen}
                  onClose={toggleDrawer(false)}
                >
                  <Box sx={{ width: 250, pt: 2 }}>
                    <List>
                      {menuItems.map((item) => (
                        <ListItem key={item} disablePadding>
                          <ListItemButton onClick={() => handleMenuClick(item)}>
                            <ListItemText primary={item} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Drawer>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item}
                    color="inherit"
                    onClick={() => handleMenuClick(item)}
                  >
                    {item}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 2, textAlign: 'center' }}
      >
        화면 크기를 조절하여 반응형 메뉴를 확인하세요
      </Typography>
    </Box>
  );
}

export default NavigationSection;
