import { Drawer, List, ListItem, ListItemText, Box, Typography, Avatar } from '@mui/material';

interface SidebarProps {
  features: string[];
  selectedFeature: string;
  onFeatureSelect: (feature: string) => void;
  mobileOpen: boolean;
  onDrawerToggle: () => void;
  isMobile: boolean;
  drawerWidth: number;
}

export function Sidebar({ features, selectedFeature, onFeatureSelect, mobileOpen, onDrawerToggle, isMobile, drawerWidth }: SidebarProps) {
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
            onClick={() => onFeatureSelect(text)}
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

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isMobile ? mobileOpen : true}
      onClose={onDrawerToggle}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: drawerWidth },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}