import { Button, Paper, Box, Typography } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useContext } from 'react';
import { CurrentClassContext } from '../../../context/currentClassContext';

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
  const { currentClass, addClassAssignment } = useContext(CurrentClassContext);

  const handleSubmit = async (values) => {
    const class_id = currentClass.class_id;
    const submitValues = {
      ...values,
      class_id
    }
    console.log(submitValues)
    addClassAssignment(submitValues);
    formik.resetForm();
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
          <Button 
            variant='contained'
            fullWidth
            size='small'
            type='submit'
          >
            Thêm
          </Button>
        </form>
      </Box>
    </Paper>
  )
}
