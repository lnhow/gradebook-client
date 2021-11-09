import { Button, CircularProgress } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

import { GoogleLogin } from 'react-google-login';
import { handleGoogleAuthFailure, handleGoogleAuthSuccess } from '../../../helpers/auth/google';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { signIn } from '../../../redux/slices/user';

export default function GoogleSignInButton({redirect = '/'}) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSigninGoogleAuth = (res) => {
    setIsLoading(true);
    handleGoogleAuthSuccess(res, (userData) => {
      setIsLoading(false);
      dispatch(signIn(userData));
      history.push(redirect);
    }, () => {
      setIsLoading(false);
    });
  }

  console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID)

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      render={(renderProps) => (
        <Button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled || isLoading}
          variant='contained'
          fullWidth
          startIcon={<GoogleIcon/>}
        >
          {
            isLoading ? 
            <CircularProgress color='inherit'/>
            :'Đăng nhập bằng Google' 
          }
        </Button>
      )}
      onSuccess={handleSigninGoogleAuth}
      onFailure={handleGoogleAuthFailure}
      cookiePolicy={'single_host_origin'}
    />
  )
}
