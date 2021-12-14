import { useContext } from 'react';
import { CurrentClassContext } from '../../../../context/currentClassContext';

export default function useLoadClassGrade() {
  const { classAssignments, setClassGrades } = useContext(CurrentClassContext);

  const genTestData = (id, stu_name) => {
    const cols = [];
    let summary = 0;
    let totalWeight = 0;
    classAssignments.forEach((assignment, index) => {
      cols[assignment.id] = 5;
      summary += cols[assignment.id] * assignment.weight;
      totalWeight += assignment.weight;
    });
    
    summary /= totalWeight;

    return {
      id,
      student_id: id,
      fullname: stu_name,
      summary: summary.toFixed(2),
      ...cols
    }
  }

  const _loadClassGrades = async () => {
    const data = [
      genTestData('18120001', 'ABBBBBBBB'),
      genTestData('18120002', 'ABBBBBBBB'),
      genTestData('18120003', 'ABBBBBBBB'),
    ];

    return data;
  }

  const loadClassGrades = async () => {
    _loadClassGrades()
    .then((result) => {
      setClassGrades(result);
    })
  }

  return loadClassGrades;
}
