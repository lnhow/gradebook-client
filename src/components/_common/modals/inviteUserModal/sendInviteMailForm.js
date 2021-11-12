import { Button, TextField, CircularProgress } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';

// import InviteAPI from '../../../../helpers/api/invite'

const validationSchema = yup.object({
  class_name: yup
  .string()
  .email('Email không hợp lệ')
  .required('bắt buộc')
});

export default function SendInviteMailForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (values) => {
    // const submitData = values;
    setIsSubmitting(true);
    // InviteAPI.sendEmailInvite(submitData)
    // .then((res) => {
    //   onSuccess(res.data);
    // })
    // .catch((err) => {
    //   onFailed(err);
    // })
    // .finally(() => {
      setIsSubmitting(false);
    // });
  }

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  });

  useEffect(() => {
    // Reset form on unmount
    return () => {
      formik.resetForm();
    }
  }, [formik])

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        autoFocus
        margin='normal'
        id='email'
        name='email'
        label='Email'
        variant='outlined'
        value={formik.values.email}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.email)}
        helperText={formik.errors.email || ' '}
      />
      <Button 
        disabled={isSubmitting}
        variant='contained'
        fullWidth 
        type='submit'
      >
        {isSubmitting ? <CircularProgress color='inherit'/>:'Add' }
      </Button>
    </form>
  )
}
