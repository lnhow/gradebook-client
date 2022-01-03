import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  Paper,
} from '@mui/material';

import Loader from '../../_common/loader';
import ErrorPage from '../../_common/error';

import { getErrorMessage } from '../../../helpers/error';
import FormPasswordReset from './passwordResetForm';

export default function PasswordResetPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const reset_token = urlParams.get('reset_id');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    console.log(reset_token);
    setError(null);
    setIsLoading(false);
  }, [reset_token])

  if (isLoading) {
    return <Loader/>;
  }

  if (error) {
    return <ErrorPage message={getErrorMessage(error)}/>
  }

  return (
    <Container>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        style={{ minHeight: '80vh' /* Layout height */}}
      >
        <Grid item xs={3}>
          <Box display='flex' justifyContent='center' mb={2}>
            <Typography variant='h5'><b>Reset mật khẩu</b></Typography>
          </Box>
          <Paper sx={{ width: 360 }}>
            <Box sx={{padding: 2}}>
              <FormPasswordReset/>
              <Box mt={1}>
                <Typography component='div' variant='caption'>
                  reset_id: {reset_token}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
