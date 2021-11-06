import { toast } from 'react-toastify';
import { handleGoogleSignIn } from '../../api/auth';

export const handleGoogleAuthSuccess = (res, callback) => {
  const token = res?.tokenId; // Exist else undefined

  handleGoogleSignIn({token})
  .then((res) => {
    toast.success('Đăng nhập thành công');
    callback(res.data.user);
  })
  .catch((err) => {
    const message = err.response.data.message || err.message;
    toast.error(message);
  });
}

export const handleGoogleAuthFailure = (err) => {
  if (err.error !== null && err.error !== 'popup_closed_by_user') {
    toast.error('Đăng nhập không thành công. Vui lòng thử lại');
  }
}
