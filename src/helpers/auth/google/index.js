import { toast } from 'react-toastify';
import { googleSignIn } from '../../api/auth';
import SubmitMessage from '../../../components/_common/submitMessage';

export const handleGoogleAuthSuccess = (res, callback) => {
  const token = res?.tokenId; // Exist else undefined

  googleSignIn({token})
  .then((res) => {
    toast.success('Sign in successfully');
    callback(res.data.user);
  })
  .catch((err) => {
    toast.error(<SubmitMessage {...err}/>);
  });
}

export const handleGoogleAuthFailure = (err) => {
  if (err.error !== null && err.error !== 'popup_closed_by_user') {
    toast.error('Google sign in failed. Please try again');
  }
}
