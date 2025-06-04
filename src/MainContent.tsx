import { Box, Grid, Card, CardContent, Typography } from '@mui/material';

interface CardItem {
  title: string;
  description: string;
}

interface CardData {
  [feature: string]: CardItem[];
}

interface MainContentProps {
  selectedFeature: string;
  cardData: CardData;
  drawerWidth: number;
}

export function MainContent({ selectedFeature, cardData, drawerWidth }: MainContentProps) {
  const cards = cardData[selectedFeature] || [];

  return (
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
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h5">{card.title}</Typography>
                <Typography>{card.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}