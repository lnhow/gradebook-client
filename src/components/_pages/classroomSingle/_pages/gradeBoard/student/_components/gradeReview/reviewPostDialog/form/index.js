import {
  LoadingButton
} from '@mui/lab';
import { 
  MenuItem,
  Stack,
  TextField 
} from '@mui/material';

import {
  useContext, useState
} from 'react';

import * as yup from 'yup';
import { useFormik } from 'formik';

import {
  MyGradeContext
} from '../../../../_context/myGradeContext';
import { isGradeFinalized } from '../../../../../_helpers';
import GradeReviewAPI from '../../../../../../../../../../helpers/api/client/gradeReview';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../../../../../../../../helpers/error';

const validationSchema = yup.object({
  message: yup
    .string('Nhập lý do')
    .min(5, 'Tối thiểu 5 ký tự')
    .max(255, 'Tối đa 255 ký tự')
    .required('bặt buộc'),
  assignment_id: yup
    .string('Chọn cột điểm')
    .required('Bắt buộc'),
  expected_grade: yup
    .number('Nhập cột điểm')
    .min(0, 'Lớn hơn 0')
    .max(10, 'Bé hơn 10')
    .required('Bắt buộc')
})

export default function ReviewPostForm({
  onPostSuccess = () => {}
}) {
  const { grade } = useContext(MyGradeContext);
  const listGrade = grade.listGrade || [];
  const [currentSelectedGrade, setSelectedGrade] = useState('0');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (values) => {
    setIsSubmitting(true);
    GradeReviewAPI.studentPostReviewRequest('', values)
    .then(() => {
      toast.success('Đăng thành công');
      onPostSuccess();
    })
    .catch((err) => {
      toast.error(`Lỗi - ${getErrorMessage(err)}`)
    })
    .finally(() => {
      setIsSubmitting(false);
    })
  }

  const formik = useFormik({
    initialValues: {
      message: '',
      assignment_id: '',
      expected_grade: 0,
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const handleAssignmentChange = (e) => {
    const assignmentId = e.target.value;
    const grade = listGrade.find(x => x.id === assignmentId)
    setSelectedGrade(grade.grade);
    formik.handleChange(e);
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id='message'
        fullWidth
        multiline
        margin='normal'
        rows={2}
        label='Lý do phúc khảo'
        name='message'
        value={formik.values.message}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.message)}
        helperText={formik.errors.message || ' '}
      />
      <TextField
        id='assignmentId'
        label='Cột điểm'
        name='assignment_id'
        margin='normal'
        fullWidth
        select
        value={formik.values.assignment_id}
        onChange={handleAssignmentChange}
        error={Boolean(formik.errors.assignment_id)}
        helperText={formik.errors.assignment_id || ' '}
      >
        <MenuItem value={''}>(Chọn)</MenuItem>
        {listGrade.map((col) => {
          if (isGradeFinalized(col.finalized)) {
            return (
              <MenuItem key={col.id} value={col.id}>{col.title}</MenuItem>
            );
          }
          return null;
        })}
      </TextField>
      <Stack direction='row' spacing={1}>
        <TextField
          label='Điểm hiện tại'
          size='medium'
          value={currentSelectedGrade}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id='expected_grade'
          label='Điểm mong muốn'
          name='expected_grade'
          type='number'
          value={formik.values.expected_grade}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.expected_grade)}
          helperText={formik.errors.expected_grade || ' '}
        />
      </Stack>
      
      <LoadingButton 
        loading={isSubmitting}
        variant='contained'
        fullWidth
        type='submit'
      >
        Đăng yêu cầu
      </LoadingButton>
    </form>
  )
}
