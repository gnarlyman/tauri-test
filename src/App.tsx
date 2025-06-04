import { useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, IconButton, Switch, Toolbar, Typography, useMediaQuery } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';

const drawerWidth = 240;
const features = ['Feature 1', 'Feature 2', 'Feature 3'];
const cardData = {
  'Feature 1': [
    { title: 'Customer A', description: 'Info about A' },
    { title: 'Customer B', description: 'Info about B' },
    { title: 'Customer C', description: 'Info about C' },
  ],
  'Feature 2': [
    { title: 'Product X', description: 'Details of X' },
    { title: 'Product Y', description: 'Details of Y' },
  ],
  'Feature 3': [
    { title: 'Report 1', description: 'Summary of report 1' },
    { title: 'Report 2', description: 'Summary of report 2' },
    { title: 'Report 3', description: 'Summary of report 3' },
  ],
};

const lightTheme = createTheme({ palette: { mode: 'light' } });
const darkTheme = createTheme({ palette: { mode: 'dark' } });

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(features[0]);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          {isMobile && <Typography variant="h6">App Logo</Typography>}
          <Box sx={{ flexGrow: 1 }} />
          <Switch checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} />
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex' }}>
        <Sidebar
          features={features}
          selectedFeature={selectedFeature}
          onFeatureSelect={setSelectedFeature}
          mobileOpen={mobileOpen}
          onDrawerToggle={handleDrawerToggle}
          isMobile={isMobile}
          drawerWidth={drawerWidth}
        />
        <MainContent
          selectedFeature={selectedFeature}
          cardData={cardData}
          drawerWidth={drawerWidth}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;