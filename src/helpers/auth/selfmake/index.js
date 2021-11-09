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

export const handleSignUpSuccess = () => {
  toast.success('Tạo tài khoản thành công');
}

export const handleFailure = (err) => {
  let message = err.message; //Incase cannot request to server
  if (err.response && err.response.data) {
    message = err.response.data.message;
  }
  toast.error(message);
}
