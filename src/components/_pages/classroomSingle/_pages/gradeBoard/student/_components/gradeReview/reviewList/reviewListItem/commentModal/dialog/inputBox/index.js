import {
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material';

import * as yup from 'yup';
import { useFormik } from 'formik';

import SendIcon from '@mui/icons-material/Send';

import { useState } from 'react';
import { GradeReviewCommentAPI } from '../../../../../../../../../../../../../helpers/api/client/gradeReview';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../../../../../../../../../../../helpers/error';

const validationSchema = yup.object({
  content: yup
    .string('Nhập bình luận')
    .max(128, 'Tối đa 128 ký tự')
    .required('Bắt buộc'),
});

export default function CommentForm({
  reviewId = '',
  onSubmitSuccess = () => {},
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (submitValues) => {
    setIsSubmitting(true);
    GradeReviewCommentAPI.postComment(reviewId, submitValues)
    .then(() => {
      onSubmitSuccess();
      formik.resetForm();
    })
    .catch((err) => {
      toast.error(`Lỗi - ${getErrorMessage(err)}`);
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  }

  const formik = useFormik({
    initialValues: {
      content: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  })

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id='content'
          name='content'
          disabled={isSubmitting}
          placeholder='Bình luận...'
          variant='outlined'
          size='medium'
          fullWidth
          value={formik.values.content}
          error={Boolean(formik.errors.content)}
          helperText={formik.errors.content || ' '}
          onChange={formik.handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton 
                  color='primary' size='small' type='submit'
                  disabled={isSubmitting}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </div>
  )
}
