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
import { formatSignInResponse, handleFailure, handleSignInSuccess } from '../../../helpers/auth/selfmake';

const validationSchema = yup.object({
  username: yup
    .string('Nhập username / email')
    .required('Bắt buộc'),
  password: yup
    .string('Nhập mật khẩu')
    .min(8, 'Tối thiểu 8 ký tự')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Ít nhất một ký tự viết hoa, một ký tự viết thường, một chữ số và một ký tự đặc biệt(@#$%^&*)"
    )
    .required('Bắt buộc')
});

export default function SignInForm({redirect = '/'}) {
  const [formStates, setFormStates] = useState({
    isSubmitting: false,
    showPassword: false
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const onSignInSuccess = (res) => {
    const resData = formatSignInResponse(res);
    setFormStates({...formStates, isSubmitting: false});
    
    dispatch(signIn(resData));
    handleSignInSuccess();
    history.push(redirect);
  }

  const onSignInFailure = (err) => {
    setFormStates({...formStates, isSubmitting: false});
    handleFailure(err);
  }

  const handleSubmit = async (formValues) => {
    setFormStates({...formStates, isSubmitting: true});
    const values = {
      ...formValues,
      username: formValues.username,
    }
    selfMakeSignIn(values)
    .then(onSignInSuccess)
    .catch(onSignInFailure)
  }
  const handleToggleShowPassword = () => {
    setFormStates({...formStates, showPassword: !formStates.showPassword})
  }
  
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <CustomTextField
        fullWidth
        autoFocus
        id='username'
        name='username'
        label='Email / Username'
        value={formik.values.username}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.username)}
        helperText={formik.errors.username}
      />
      <CustomTextField
        fullWidth
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
      <Button 
        disabled={formStates.isSubmitting}
        variant='contained'
        fullWidth 
        type='submit'
      >
        {formStates.isSubmitting ? <CircularProgress color='inherit'/>:'Đăng nhập' }
      </Button>
    </form>
  );
}
