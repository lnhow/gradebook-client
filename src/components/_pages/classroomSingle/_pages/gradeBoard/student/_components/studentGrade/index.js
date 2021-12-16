import Loader from '../../../../../../../_common/loader';
import ErrorPage from '../../../../../../../_common/error';

import { Paper } from '@mui/material';

import { useState, useEffect } from 'react';
import useLoadStudentGrade from '../../_hooks/useLoadStudentGrade';
import StudentGradeTable from './gradeTable';
import { getErrorMessage } from '../../../../../../../../helpers/error';

export default function StudentGradeBoard() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [grade, setGrade] = useState({});
  const [isLoadedOnce, setIsLoadedOnce] = useState(false);
  const loadStudentGrade = useLoadStudentGrade();

  useEffect(() => {
    if (!isLoadedOnce) {
      setIsLoadedOnce(true);
      loadGrade(loadStudentGrade);
    }
  }, [loadStudentGrade, isLoadedOnce]);

  const loadGrade = (loadStudentGrade) => {
    setIsLoading(true);
    loadStudentGrade()
    .then((resultData) => {
      setGrade(resultData);
    })
    .catch((err) => {
      const error = {message: getErrorMessage(err)}
      setError(error);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  if (error) {
    return <ErrorPage 
      code = {error.status}
      title = {error.title}
      details = {error.details}
      message = {error.message}
      backToHome = {false}
      minHeight = '100%'
      />
  } else if (isLoading) {
    return <Loader/>;
  } else {
    return (
      <Paper>
        <StudentGradeTable studentGrade={grade}/>
      </Paper>
    )
  }
}
