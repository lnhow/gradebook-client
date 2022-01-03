import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

import Loader from '../../_common/loader';
import ErrorPage from '../../_common/error';

import { getErrorMessage } from '../../../helpers/error';

export default function AccountActivationPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const activation_token = urlParams.get('activation');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    console.log(activation_token);
    setError(null);
    setIsLoading(false);
  }, [activation_token])

  if (isLoading) {
    return <Loader label='Kích hoạt tài khoản...'/>;
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
          <Box sx={{width: '300px'}}>
            <Typography>Kích hoạt tài khoản thành công</Typography>
            <Button 
              variant='contained'
              component={Link}
              to='/signin'
            >
              Đăng nhập
            </Button>
            <Typography component='div' variant='caption'>
              activation: {activation_token}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
