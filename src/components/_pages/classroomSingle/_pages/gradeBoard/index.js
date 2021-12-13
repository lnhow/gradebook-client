import { useContext } from 'react';

import TeacherGradeBoard from './teacher';
import StudentGrade from './student';

import { CurrentClassContext } from '../../context/currentClassContext';

export default function ClassroomGradeBoard() {
  const { isTeacher } = useContext(CurrentClassContext);

  if (isTeacher) {
    return <TeacherGradeBoard/>
  }

  return <StudentGrade/>
}
