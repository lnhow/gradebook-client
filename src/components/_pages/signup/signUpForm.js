/**
 * This file contains a STUB form for in-house sign in
 * WHICH WAS NOT USED
 */

import { 
  Button, CircularProgress,
  InputAdornment, IconButton
} from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { selfMakeSignIn } from '../../../helpers/api/auth';
import { signIn } from '../../../redux/slices/user';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import CustomTextField from '../../_common/customTextField';
import { 
  formatSignInResponse, 
  handleFailure, handleSignInSuccess, handleSignUpSuccess 
} from '../../../helpers/auth/selfmake';
import { handleSignUp } from '../../../helpers/api/user';

const validationSchema = yup.object({
  username: yup
    .string('Nhập username')
    .required('Bắt buộc'),
  full_name: yup
    .string('Nhập họ và tên')
    .required('Bắt buộc'),
  password: yup
    .string('Nhập mật khẩu')
    .min(8, 'Tối thiểu 8 ký tự')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Ít nhất một ký tự viết hoa, một ký tự viết thường, một chữ số và một ký tự đặc biệt(@#$%^&*)"
    )
    .required('Bắt buộc'),
  passwordConfirm: yup
    .string('Xác nhận mật khẫu')
    .required('Bắt buộc')
    .oneOf([yup.ref('password')], 'Không khớp với mật khẩu'),
});

export default function SignUpForm() {
  const [formStates, setFormStates] = useState({
    isSubmitting: false,
    showPassword: false,
    showPasswordConfirm: false,
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignIn = () => {
    selfMakeSignIn({
      username: formik.values.username,
      password: formik.values.password
    })
    .then((res) => {
      const resData = formatSignInResponse(res);
      setFormStates({...formStates, isSubmitting: false});
      
      dispatch(signIn(resData));
      handleSignInSuccess();
      history.push('/');
    })
    .catch((err) => {
      setFormStates({...formStates, isSubmitting: false});
      handleFailure(err);
    })
  }

  const handleSubmit = async (values) => {
    setFormStates({...formStates, isSubmitting: true});
    handleSignUp(values)
    .then(() => {
      handleSignUpSuccess();
      handleSignIn();   // If sign up success then sign in right now
    })
    .catch((err) => {
      setFormStates({...formStates, isSubmitting: false});
      handleFailure(err);
    })
  }
  const handleToggleShowPassword = () => {
    setFormStates({...formStates, showPassword: !formStates.showPassword})
  }

  const handleToggleShowConfirmPassword = () => {
    setFormStates({...formStates, showPasswordConfirm: !formStates.showPasswordConfirm})
  }
  
  const formik = useFormik({
    initialValues: {
      username: '',
      full_name: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <CustomTextField
        fullWidth
        disabled={formStates.isSubmitting}
        autoFocus
        id='username'
        name='username'
        label='Username'
        value={formik.values.username}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.username)}
        helperText={formik.errors.username}
      />
      <CustomTextField
        fullWidth
        disabled={formStates.isSubmitting}
        id='full_name'
        name='full_name'
        label='Họ và tên'
        value={formik.values.full_name}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.full_name)}
        helperText={formik.errors.full_name}
      />
      <CustomTextField
        fullWidth
        disabled={formStates.isSubmitting}
        type={formStates.showPassword ? 'text' : 'password'}
        id='password'
        name='password'
        label='Mật khẩu'
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              onClick={handleToggleShowPassword}
              edge='end'
            >
              {formStates.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        value={formik.values.password}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.password)}
        helperText={formik.errors.password}
      />
      <CustomTextField
        fullWidth
        disabled={formStates.isSubmitting}
        type={formStates.showPasswordConfirm ? 'text' : 'password'}
        id='passwordConfirm'
        name='passwordConfirm'
        label='Xác nhận mật khẩu'
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              onClick={handleToggleShowConfirmPassword}
              edge='end'
            >
              {formStates.showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        value={formik.values.passwordConfirm}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.passwordConfirm)}
        helperText={formik.errors.passwordConfirm}
      />
      <Button 
        disabled={formStates.isSubmitting}
        variant='contained'
        fullWidth 
        type='submit'
      >
        {formStates.isSubmitting ? <CircularProgress color='inherit'/>:'Đăng ký' }
      </Button>
    </form>
  );
}
