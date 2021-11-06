import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

import { GoogleLogin } from 'react-google-login';
import { handleGoogleAuthFailure, handleGoogleAuthSuccess } from '../../../helpers/auth/google';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { signIn } from '../../../redux/slices/user';

export default function GoogleSignInButton() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSigninGoogleAuth = (res) => {
    handleGoogleAuthSuccess(res, (userData) => {
      dispatch(signIn(userData));
      history.push('/');
    });
  }

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      render={(renderProps) => (
        <Button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          variant='contained'
          fullWidth
          startIcon={<GoogleIcon/>}
        >
          Đăng nhập bằng Google
        </Button>
      )}
      onSuccess={handleSigninGoogleAuth}
      onFailure={handleGoogleAuthFailure}
      cookiePolicy={'single_host_origin'}
    />
  )
}
