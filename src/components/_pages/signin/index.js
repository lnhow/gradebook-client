import { Paper, Box, Typography, Grid } from '@mui/material';
import GoogleSignInButton from './googleSignInButton';

export default function SignInPage() {
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
        <Typography variant='h4' align='center'>Sign in</Typography>
        <Box mt={4}>
          <GoogleSignInButton />
        </Box>
      </Paper>
      </Grid>   
      
    </Grid> 
  )
}
