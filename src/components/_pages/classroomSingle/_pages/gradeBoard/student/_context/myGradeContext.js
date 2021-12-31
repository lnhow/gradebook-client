import { createContext, useState } from 'react';

const GRADE_INITIAL_STATE = {};
const FUNCTION_INITIAL_STATE = () => {};

export const MyGradeContext = createContext({
  grade: GRADE_INITIAL_STATE,
  setGrade: FUNCTION_INITIAL_STATE
})

export default function MyGradeProvider({children}) {
  const [grade, _setGrade] = useState(GRADE_INITIAL_STATE);

  const setGrade = (grade = {}) => {
    _setGrade(grade);
  }

  const contextValue = {
    grade,
    setGrade
  }

  return (
    <MyGradeContext.Provider value={contextValue}>
      {children}
    </MyGradeContext.Provider>
  )
}
