import { Dialog, DialogTitle, DialogContent, Button, TextField, CircularProgress } from "@mui/material";
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';

import ClassroomAPI from "../../../../../helpers/api/classrooms";

const validationSchema = yup.object({
  className: yup
    .string('Enter classrooom name')
    .min(6, 'Classroom name must be of minimum 6 characters')
    .required('Classroom name is required'),
  subject: yup
    .string('Enter subject')
    .min(6, 'Subject must be of minimum 6 characters')
    .required('Subject is required')
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
      className: '',
      subject: ''
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
      <DialogTitle>Add new classroom</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            autoFocus
            margin='normal'
            id='className'
            name='className'
            label='Classroom Name'
            variant='outlined'
            value={formik.values.className}
            onChange={formik.handleChange}
            error={formik.touched.className && Boolean(formik.errors.className)}
            helperText={formik.touched.className && formik.errors.className}
          />
          <TextField
            fullWidth
            margin='normal'
            id='subject'
            name='subject'
            label='Subject'
            variant='outlined'
            value={formik.values.subject}
            onChange={formik.handleChange}
            error={formik.touched.subject && Boolean(formik.errors.subject)}
            helperText={formik.touched.subject && formik.errors.subject}
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
