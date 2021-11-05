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

import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import CustomTextField from '../../_common/customTextField';

const validationSchema = yup.object({
  username: yup
    .string('Enter username')
    .min(6, 'Username must be of minimum 6 characters')
    .required('Username is required'),
  password: yup
    .string('Enter password')
    .min(6, 'Password must be of minimum 6 characters')
    .required('Password is required')
});

export default function SignInForm() {
  const [formStates, setFormStates] = useState({
    isSubmitting: false,
    showPassword: false
  });

  const handleSubmit = async (values) => {
    //const submitData = values;
    setFormStates({...formStates, isSubmitting: true});
    setFormStates({...formStates, isSubmitting: false});
  }
  const handleToggleShowPassword = () => {
    setFormStates({...formStates, showPassword: !formStates.showPassword})
  }
  
  const formik = useFormik({
    initialValues: {
      className: '',
      subject: ''
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <CustomTextField
        fullWidth
        autoFocus
        margin='normal'
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
        margin='normal'
        type={formStates.showPassword ? 'text' : 'password'}
        id='password'
        name='password'
        label='Password'
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
        {formStates.isSubmitting ? <CircularProgress color='inherit'/>:'Sign In' }
      </Button>
    </form>
  );
}
