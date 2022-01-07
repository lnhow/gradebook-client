import {
  LoadingButton
} from '@mui/lab';
import { 
  MenuItem,
  TextField,
  Grid,
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
  explanation: yup
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
    GradeReviewAPI.postReviewRequest(values)
    .then((res) => {
      if (!res.data.success) {
        throw new Error(res.data.message);
      }
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
      explanation: '',
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
        id='explanation'
        fullWidth
        multiline
        margin='normal'
        rows={2}
        label='Lý do phúc khảo'
        name='explanation'
        value={formik.values.explanation}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.explanation)}
        helperText={formik.errors.explanation || ' '}
      />
      <Grid container maxWidth='xl' spacing={1}>
        <Grid item sm={8} xs={12}>
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
        </Grid>
        <Grid item sm={4} xs={12}>
          <TextField
            fullWidth
            label='Điểm hiện tại'
            size='medium'
            margin='normal'
            value={currentSelectedGrade}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
      </Grid>
      <TextField
        fullWidth
        id='expected_grade'
        label='Điểm mong muốn'
        name='expected_grade'
        type='number'
        value={formik.values.expected_grade}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.expected_grade)}
        helperText={formik.errors.expected_grade || ' '}
      />
      
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
