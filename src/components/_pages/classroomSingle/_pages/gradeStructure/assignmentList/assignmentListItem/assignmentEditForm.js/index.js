import { Button, Box } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useContext } from 'react';
import { CurrentClassContext } from '../../../../../context/currentClassContext';
import CustomTextField from '../../../../../../../_common/customTextField';

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

export default function AssignmentEditForm({
  assignment, 
  handleClose = () => {}
}) {
  const { currentClass, updateClassAssignment } = useContext(CurrentClassContext);

  const handleSubmit = async (values) => {
    const class_id = currentClass.class_id;
    const submitValues = {
      ...assignment,
      ...values,
      class_id
    }
    updateClassAssignment(submitValues);
    handleClose();
  }

  const onClose = () => {
    formik.resetForm();
    handleClose();
  }

  const formik = useFormik({
    initialValues: {
      title: assignment.title,
      weight: assignment.weight,
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  });

  return (
    <Box>
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
          Lưu thay đổi
        </Button>
        <Button 
          variant='outlined'
          fullWidth
          size='small'
          sx={{marginTop: 1}}
          color='defaultColor'
          onClick={onClose}
        >
          Hủy
        </Button>
      </form>
    </Box>
  )
}
