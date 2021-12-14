import * as yup from 'yup'

const gradeSchema = yup.number().min(0).max(10);

const validateGrade = (value) => {
  const condition = gradeSchema.isValidSync(value);
  return condition;
}

export default validateGrade;
