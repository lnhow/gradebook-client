import { Button, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';

import CustomTextField from '../../../../../../../_common/customTextField';

import useUpdateReview from '../../../_hooks/useUpdateReview';

const validationSchema = yup.object({
  final_grade: yup
    .number('Nhập cột điểm')
    .min(0, 'Lớn hơn 0')
    .max(10, 'Bé hơn 10')
    .required('Bắt buộc')
});

const REVIEW_FINALIZED_STATUS = 'Y';

export default function ReviewEditForm({ 
  review = {},
  handleClose = () => {}
}) {
  const updateReview = useUpdateReview();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const displayGrade = review.final_grade ? review.final_grade : review.expected_grade;

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    const reviewId = review.id;
    const submitValues = {
      status: REVIEW_FINALIZED_STATUS,  // Grade review finalized
      ...values,
    }
    updateReview(reviewId, submitValues, () => {
      setIsSubmitting(false);
      handleClose();
    });
  }

  const onClose = () => {
    formik.resetForm();
    handleClose();
  }

  const formik = useFormik({
    initialValues: {
      final_grade: displayGrade,
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  });

  return (
    <Box mt={2}>
      <form onSubmit={formik.handleSubmit}>
        <CustomTextField
          fullWidth
          autoFocus
          size='small'
          id='final_grade'
          name='final_grade'
          margin='dense'
          label='Điểm cuối cùng'
          value={formik.values.final_grade}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.final_grade)}
          helperText={formik.errors.final_grade}
        />
        <LoadingButton 
          loading={isSubmitting}
          variant='contained'
          fullWidth
          size='small'
          type='submit'
        >
          Lưu thay đổi
        </LoadingButton>
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
