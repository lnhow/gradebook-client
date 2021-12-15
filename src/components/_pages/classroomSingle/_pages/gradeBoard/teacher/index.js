import {
  Container,
  Box
} from '@mui/material';
import GradeTable from './table';
import Topbar from './topbar';
import ErrorPage from '../../../../../_common/error';
import Loader from '../../../../../_common/loader';

import { useState, useContext, useEffect } from 'react';
import { CurrentClassContext } from '../../../context/currentClassContext';
import useLoadClassGrade from './hooks/useLoadClassGrade';

export default function TeacherGradeBoard() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadedOnce, setIsLoadedOnce] = useState(false);
  const [error, setError] = useState(null);
  const { isClassGradeLoaded } = useContext(CurrentClassContext);
  const loadClassGrades = useLoadClassGrade();

  useEffect(() => {
    if (!isLoadedOnce || !isClassGradeLoaded) {
      setIsLoadedOnce(true);
      loadGrade(loadClassGrades)
    }
  }, [isLoadedOnce, isClassGradeLoaded, loadClassGrades]);

  const loadGrade = (loadClassGrades) => {
    setIsLoading(true);
    loadClassGrades()
    .catch((err) => {
      // console.log(err)
      const error = {message: 'Lỗi tải điểm'}
      setError(error)
    })
    .finally(() => {
      setIsLoading(false)
    })
  }

  const refresh = () => {
    loadGrade(loadClassGrades);
  }

  if (error) {
    return <ErrorPage 
      code = {error.status}
      title = {error.title}
      details = {error.details}
      message = {error.message}
      backToHome = {false}
      />
  } else if (isLoading) {
    return <Loader/>;
  } else {
    return (
      <Container maxWidth='xl'>
        <Box marginY={2}>
          <Topbar/>
        </Box>
        <GradeTable refreshData={refresh}/>
      </Container>
    )
  }
}