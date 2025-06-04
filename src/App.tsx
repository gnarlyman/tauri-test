import {useMemo, useState } from "react";
import "./App.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {AppBar, Avatar, Box, Card, CardContent, CssBaseline, Drawer, Grid, IconButton, List, ListItem, ListItemText,
  Switch, Toolbar, Typography, useMediaQuery } from "@mui/material";

const drawerWidth = 240;
const features = ['Feature 1', 'Feature 2', 'Feature 3'];

const generateRandomTitle = () => {
  const adjectives = ['Quick', 'Lazy', 'Sleepy', 'Noisy', 'Hungry'];
  const nouns = ['Fox', 'Dog', 'Cat', 'Mouse', 'Bird'];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adj} ${noun}`;
};

const lightTheme = createTheme({ palette: { mode: 'light' } });
const darkTheme = createTheme({ palette: { mode: 'dark' } });

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(features[0]);
  const isMobile = useMediaQuery('(max-width:600px)');

  const cardData = useMemo(() => {
    return features.reduce((acc, feature) => {
      acc[feature] = Array.from({ length: 6 }, () => generateRandomTitle());
      return acc;
    }, {});
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">App Logo</Typography>
      </Box>
      <List sx={{ flexGrow: 1 }}>
        {features.map((text) => (
          <ListItem
            button
            key={text}
            selected={selectedFeature === text}
            onClick={() => setSelectedFeature(text)}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ mr: 1 }}>U</Avatar>
          <Typography>User Name</Typography>
        </Box>
        <List>
          <ListItem button>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  const currentCards = cardData[selectedFeature] || [];

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
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            </IconButton>
          )}
          {isMobile && <Typography variant="h6">App Logo</Typography>}
          <Box sx={{ flexGrow: 1 }} />
          <Switch checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} />
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex' }}>
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': { width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 8,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Grid container spacing={2}>
            {currentCards.map((title, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">{title}</Typography>
                    <Typography>Some info here</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  )};

export default App;
