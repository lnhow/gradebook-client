import { 
  Paper, Typography, Grid
  , Box, Button
} from '@mui/material';
import { Link } from 'react-router-dom';
import SignUpForm from './signUpForm';

export default function SignUpPage() {
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
        <SignUpForm/>
        <Box mt={2}>
          <Button fullWidth size='small' component={Link} to='/signin'>
            Đã có tài khoản? Đăng nhập
          </Button>
        </Box>
      </Paper>
      </Grid>   
      
    </Grid> 
  )
}
