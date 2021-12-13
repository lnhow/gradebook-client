import { 
  // Table, 
  // TableContainer,
  // TableHead,
  // TableBody,
  // TableRow,
  // TableCell,
  Paper,
 } from '@mui/material';
import { 
  DataGrid,
  GridToolbar,
} from '@mui/x-data-grid';

import { useContext } from 'react';
import { CurrentClassContext } from '../../../../context/currentClassContext';

import CustomColumnMenu from './customs/columnMenu';
import CustomNoRowsOverlay from './customs/noRowsOverlay';


export default function GradeTable() {
  const { classAssignments } = useContext(CurrentClassContext);
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
  const data = [
    genTestData('18120001', 'ABBBBBBBB'),
    genTestData('18120002', 'ABBBBBBBB'),
    genTestData('18120003', 'ABBBBBBBB'),
  ];

  const colsDef = [
    {field: 'student_id', headerName: 'MSSV', minWidth: 110},
    {field: 'fullname', headerName: 'Họ tên', minWidth: 200},
    {field: 'summary', headerName: 'Tổng điểm', minWidth: 150}
  ].concat(classAssignments.map(assignment => {
    return {
      field: assignment.id,
      headerName: assignment.title,
      minWidth: 150,
      assignment_id: assignment.id,
    }
  }))

  const toggleGradeDisplay = (assignment_id) => {
    console.log(assignment_id);
  }

  const importGrade = (assignment_id) => {
    console.log(assignment_id);
  }

  return (
    <Paper style={{ display: 'flex', minHeight: 400 }}>
      <DataGrid
        autoHeight
        columns={colsDef}
        rows={data}
        components={{
          ColumnMenu: CustomColumnMenu,
          Toolbar: GridToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        componentsProps={{
          columnMenu: {
            toggleGrade: toggleGradeDisplay,
            importGrade
          }
        }}
      />
    </Paper>
  )
  // return (
  //   <Paper>
  //     <TableContainer>
  //       <Table>
  //         <TableHead>
  //           <TableRow>
  //             <TableCell>MSSV</TableCell>
  //             <TableCell>Tên</TableCell>
  //             <TableCell><b>Điểm tổng kết</b></TableCell>
  //             {classAssignments.map((column) => (
  //               <TableCell
  //                 key={column.id}
  //               >
  //                 {column.title}
  //               </TableCell>
  //             ))}
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //           {data.map((row, index) => {
  //               return (
  //                 <TableRow hover role="checkbox" tabIndex={-1} key={index}>
  //                   <TableCell>{row.student_id}</TableCell>
  //                   <TableCell>{row.fullname}</TableCell>
  //                   <TableCell>{row.summary}</TableCell>
  //                   {row.cols.map((column, index) => {
  //                     return (
  //                       <TableCell key={index}>
  //                         {column}
  //                       </TableCell>
  //                     );
  //                   })}
  //                 </TableRow>
  //               );
  //             })}
  //         </TableBody>
  //       </Table>
  //     </TableContainer>
  //   </Paper>
  // )
}
