import { Paper, Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';

import useAddClassAssignment from '../hooks/addAssignment';

import CustomTextField from '../../../../../_common/customTextField';

const validationSchema = yup.object({
  title: yup
    .string('Nhập tên loại điểm')
    .required('Bắt buộc'),
  weight: yup
    .number('Nhập trọng số')
    .integer('Phải là số nguyên')
    .positive('Lớn hơn 0')
    .required('Bắt buộc'),
});


export default function CreateGradeForm() {
  const addClassAssignment = useAddClassAssignment();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    const submitValues = {
      ...values,
    }
    addClassAssignment(submitValues, () => {
      setIsSubmitting(false);
      formik.resetForm();
    });
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      weight: 1
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  });

  return (
    <Paper>
      <Box padding={2}>
        <Typography>Thêm</Typography>
        <form onSubmit={formik.handleSubmit}>
          <CustomTextField
            fullWidth
            autoFocus
            size='small'
            id='title'
            name='title'
            margin='dense'
            label='Tên loại điểm'
            value={formik.values.title}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.title)}
            helperText={formik.errors.title}
          />
          <CustomTextField
            size='small'
            id='weight'
            name='weight'
            margin='dense'
            type='number'
            label='Trọng số'
            value={formik.values.weight}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.weight)}
            helperText={formik.errors.weight}
          />
          <LoadingButton 
            loading={isSubmitting}
            variant='contained'
            fullWidth
            size='small'
            type='submit'
          >
            Thêm
          </LoadingButton>
        </form>
      </Box>
    </Paper>
  )
}
