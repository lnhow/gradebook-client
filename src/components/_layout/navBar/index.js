import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import HideOnScroll from '../../_common/hideOnScroll';
import RightDrawer from './rightDrawer';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const NavTitle = styled(Typography)(() => ({
  textDecoration: 'none',
  color: 'inherit'
}))

function NavBar() {
  return (
    <>
    <HideOnScroll>
      <AppBar
        color='background'
      >
        <Toolbar>
          <NavTitle component={Link} to='/'>
            Gradebook
          </NavTitle>
          <Box sx={{flexGrow: 1}}/>
          <RightDrawer/>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
    <Offset/>
    </>
  );
}

export default NavBar;
