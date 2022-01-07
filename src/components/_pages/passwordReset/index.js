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

import UserAPI from '../../../helpers/api/client/user';

export default function PasswordResetPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const reset_id = urlParams.get('reset_id');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    UserAPI.verifyOneTimeCode(reset_id)
    .then(() => {
    })
    .catch((err) => {
      setError(err);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }, [reset_id])

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
          <Paper sx={{ maxWidth: 360 }}>
            <Box sx={{padding: 2}}>
              <FormPasswordReset resetId={reset_id}/>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
