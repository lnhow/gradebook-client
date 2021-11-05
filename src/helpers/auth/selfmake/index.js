import { toast } from 'react-toastify';

export const formatSignInResponse = (res) => {
  const data = res.data.data;
  return {
    ...data.user_info,
    token: data.token,
  }
}

export const handleSignInSuccess = () => {
  toast.success('Đăng nhập thành công');
}

export const handleSignInFailure = (err) => {
  const message = err.response.data.message || err;
  toast.error(message);
}
