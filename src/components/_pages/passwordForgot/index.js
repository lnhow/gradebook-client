import { 
  Paper, Typography, Grid
  , Box, Button, Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import FormPasswordForgot from './passwordForgotForm';

export default function PasswordForgotPage() {
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
      <Typography variant='h4' align='center'>Quên mật khẩu</Typography>
        <Paper sx={{ width: 360, padding: 2 }}>
          <Box mb={1}>
            <Typography variant='caption'>Email đăng nhập tài khoản của bạn</Typography>
          </Box>
          <FormPasswordForgot/>
          <Box my={2}>
            <Divider>Hoặc</Divider>
          </Box>
          <Button 
            fullWidth size='small' 
            component={Link} 
            to={{ pathname: '/signin'}}
          >
            Đăng nhập
          </Button>
          
        </Paper>
      </Grid>   
    </Grid> 
  );
}
