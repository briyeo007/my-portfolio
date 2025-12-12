import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

/**
 * Navigation 컴포넌트
 * 포트폴리오 사이트의 메인 네비게이션
 *
 * 기능:
 * - Home, About Me, Projects 3개 탭
 * - 반응형 햄버거 메뉴 (모바일)
 * - 현재 페이지 하이라이트
 */
function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Me', path: '/about' },
    { label: 'Projects', path: '/projects' }
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: 'center',
        bgcolor: 'background.default',
        height: '100%',
        pt: 2
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          color: 'secondary.main',
          fontWeight: 700
        }}
      >
        Portfolio
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                textAlign: 'center',
                color: isActive(item.path) ? 'secondary.main' : 'text.secondary',
                '&:hover': {
                  color: 'secondary.main',
                  bgcolor: 'background.paper'
                }
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              color: 'secondary.main',
              fontWeight: 700,
              textDecoration: 'none',
              '&:hover': {
                color: 'secondary.light'
              }
            }}
          >
            Portfolio
          </Typography>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: isActive(item.path) ? 'secondary.main' : 'text.secondary',
                    borderBottom: isActive(item.path) ? '2px solid' : 'none',
                    borderColor: 'secondary.main',
                    borderRadius: 0,
                    px: 2,
                    '&:hover': {
                      color: 'secondary.main',
                      bgcolor: 'transparent'
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
            bgcolor: 'background.default'
          }
        }}
      >
        {drawer}
      </Drawer>

      {/* Toolbar spacing */}
      <Toolbar />
    </>
  );
}

export default Navigation;
