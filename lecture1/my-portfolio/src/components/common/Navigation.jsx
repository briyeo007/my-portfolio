import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';

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

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Me', path: '/about' },
    { label: 'Projects', path: '/projects' }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <Typography
        variant="h6"
        sx={{
          color: 'secondary.main',
          fontWeight: 700,
          px: 2,
          mb: 2
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
              onClick={handleDrawerToggle}
              sx={{
                bgcolor: isActive(item.path) ? 'action.selected' : 'transparent',
                '&:hover': {
                  bgcolor: 'action.hover'
                }
              }}
            >
              <ListItemText
                primary={item.label}
                sx={{
                  '& .MuiListItemText-primary': {
                    color: isActive(item.path) ? 'secondary.main' : 'text.secondary',
                    fontWeight: isActive(item.path) ? 600 : 400,
                    textAlign: 'center'
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: 'rgba(26, 22, 19, 0.9)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
          boxShadow: 'none'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ height: 64 }}>
            {/* Logo */}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: { xs: 1, md: 0 },
                color: 'secondary.main',
                fontWeight: 700,
                textDecoration: 'none',
                mr: { md: 4 },
                '&:hover': {
                  color: 'secondary.light'
                }
              }}
            >
              Portfolio
            </Typography>

            {/* Desktop Navigation */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                flexGrow: 1,
                gap: 0.5
              }}
            >
              {navItems.map((item) => (
                <Box
                  key={item.label}
                  component={Link}
                  to={item.path}
                  sx={{
                    px: 2,
                    py: 1,
                    color: isActive(item.path) ? 'secondary.main' : 'text.secondary',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    borderBottom: isActive(item.path) ? '2px solid' : '2px solid transparent',
                    borderColor: isActive(item.path) ? 'secondary.main' : 'transparent',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: 'secondary.main'
                    }
                  }}
                >
                  {item.label}
                </Box>
              ))}
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            bgcolor: 'background.paper',
            borderLeft: '1px solid',
            borderColor: 'divider'
          }
        }}
      >
        {drawer}
      </Drawer>

      {/* Spacer for fixed header */}
      <Toolbar sx={{ height: 64 }} />
    </>
  );
}

export default Navigation;
