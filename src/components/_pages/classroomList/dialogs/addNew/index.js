import { Dialog, DialogTitle, DialogContent, Button, TextField, CircularProgress } from "@mui/material";
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';

import ClassroomAPI from "../../../../../helpers/api/classrooms";

const validationSchema = yup.object({
  class_name: yup
    .string('Nhập tên lớp')
    .min(6, 'Tối thiểu 6 ký tự')
    .max(30, 'Tối đa 30 ký tự')
    .required('Bắt buộc'),
  subject: yup
    .string('Nhập môn học')
    .max(30, 'Tối đa 30 ký tự')
    .required('Bắt buộc'),
  description: yup
    .string('Nhập mô tả')
});

function NewClassroomDialog({open, onClose, onSuccess, onFailed}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (values) => {
    const submitData = values;
    setIsSubmitting(true);
    ClassroomAPI.addNewClassroom(submitData)
    .then((res) => {
      handleClose();
      onSuccess(res.data);
    })
    .catch((err) => {
      onFailed(err);
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  }

  const formik = useFormik({
    initialValues: {
      class_name: '',
      subject: '',
      description: ''
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Tạo lớp mới</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            autoFocus
            margin='normal'
            id='class_name'
            name='class_name'
            label='Tên lớp'
            variant='outlined'
            value={formik.values.class_name}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.class_name)}
            helperText={formik.errors.class_name || ' '}
          />
          <TextField
            fullWidth
            margin='normal'
            id='subject'
            name='subject'
            label='Môn học'
            variant='outlined'
            value={formik.values.subject}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.subject)}
            helperText={formik.errors.subject || ' '}
          />
          <TextField
            fullWidth
            margin='normal'
            id='description'
            name='description'
            label='Mô tả'
            variant='outlined'
            value={formik.values.description}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.description)}
            helperText={formik.errors.description || ' '}
          />
          <Button 
            disabled={isSubmitting}
            variant='contained'
            fullWidth 
            type='submit'
          >
            {isSubmitting ? <CircularProgress color='inherit'/>:'Add' }
          </Button>
          <Button sx={{marginTop: 1}} color='defaultColor' variant='outlined' fullWidth onClick={handleClose}>
            Cancel
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NewClassroomDialog;
