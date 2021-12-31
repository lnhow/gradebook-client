import Loader from '../../../../../../../_common/loader';
import ErrorPage from '../../../../../../../_common/error';

import { Paper, Box } from '@mui/material';

import { MyGradeContext } from '../../_context/myGradeContext';

import { useState, useEffect, useContext } from 'react';
import useLoadStudentGrade from '../../_hooks/useLoadStudentGrade';
import StudentGradeTable from './gradeTable';
import { getErrorMessage } from '../../../../../../../../helpers/error';

export default function StudentGradeBoard() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {grade, setGrade} = useContext(MyGradeContext);
  const [isLoadedOnce, setIsLoadedOnce] = useState(false);
  const loadStudentGrade = useLoadStudentGrade();

  useEffect(() => {
    if (!isLoadedOnce) {
      setIsLoadedOnce(true);
      loadGrade(loadStudentGrade, setGrade);
    }
  }, [loadStudentGrade, isLoadedOnce, setGrade]);

  const loadGrade = (loadStudentGrade, setGrade) => {
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
    return (
      <Paper>
        <Box padding={2}>
          <ErrorPage 
            code = {error.status}
            title = {error.title}
            details = {error.details}
            message = {error.message}
            backToHome = {false}
            minHeight = '100%'
            />
        </Box>
      </Paper>)
  } else if (isLoading) {
    return (
      <Paper>
        <Box padding={2}>
          <Loader/>
        </Box>
      </Paper>
    )
  } else {
    return (
      <Paper>
        <StudentGradeTable studentGrade={grade}/>
      </Paper>
    )
  }
}
