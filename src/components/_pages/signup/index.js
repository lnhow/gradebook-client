import { 
  Paper, Typography, Grid
  , Box, Button
} from '@mui/material';
import { Link, withRouter } from 'react-router-dom';
import SignUpForm from './signUpForm';

function SignUpPage({ location }) {
  const locationState = location?.state;
  const redirect = locationState ? locationState.from : '/';
  
  return (
    <Grid
      container
      spacing={0}
      // Center horizontal & vertical inner element
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '90vh' }} //Parent content area min height
    >

      <Grid item xs={3}>
      <Paper sx={{ width: 360, padding: 2 }}>
        <Typography variant='h4' align='center'>Đăng ký</Typography>
        <SignUpForm redirect={redirect}/>
        <Box mt={2}>
          <Button 
            fullWidth size='small' 
            component={Link} 
            to={{ pathname: '/signin', state: { from: redirect }}}
          >
            Đã có tài khoản? Đăng nhập
          </Button>
        </Box>
      </Paper>
      </Grid>   
      
    </Grid> 
  )
}

export default withRouter(SignUpPage);
