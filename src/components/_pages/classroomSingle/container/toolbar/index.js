import {
  Toolbar, Container, Typography, Divider, 
  Grid, Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ToolbarLinkTabs from './tabs';

const AlignCenter = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1)
}));

function ClassroomSingleToolbar({title}) {
  return (
    <Container 
      maxWidth='xl' 
      component='div'
      disableGutters
    >
      <Toolbar>
        <Grid container>
          <Grid
            item lg={3} md={4} sm={12} xs={12}
          > 
            <AlignCenter>
              <Typography variant='subtitle1' component='div'>
                <b>{title}</b>
              </Typography>
            </AlignCenter>
          </Grid>
          <Grid
            item lg={9} md={8} sm={12} xs={12}
          >
            <ToolbarLinkTabs/>
          </Grid>
        </Grid>
      </Toolbar>
      <Divider/>
    </Container>
  )
}

export default ClassroomSingleToolbar;
