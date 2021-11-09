import { toast } from 'react-toastify';
import { handleGoogleSignIn } from '../../api/auth';

const formatSignInResponse = (res) => {
  const data = res.data.data;
  return {
    ...data.user_info,
    token: data.token,
  }
}

export const handleGoogleAuthSuccess = (res, callback, failureCallback) => {
  const token = res?.tokenId; // Exist else undefined

  handleGoogleSignIn({token})
  .then(formatSignInResponse)
  .then((data) => {
    toast.success('Đăng nhập thành công');
    callback(data);
  })
  .catch((err) => {
    let message = err.message; //Incase cannot request to server
    if (err.response && err.response.data) {
      message = err.response.data.message;
    }
    toast.error(message);
    failureCallback();
  });
}

export const handleGoogleAuthFailure = (err) => {
  if (err.error !== null && err.error !== 'popup_closed_by_user') {
    if (err.error === 'idpiframe_initialization_failed') {
      toast.error('Khởi tạo đăng nhập Google không thành công');
    } else {
      toast.error('Đăng nhập không thành công. Vui lòng thử lại');
    }
  }
}
