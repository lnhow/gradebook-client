import { useState } from 'react';
import {
  ListItemButton, Tooltip,
} from '@mui/material';

import {
  GridFilterMenuItem,
  GridColumnMenuContainer,
} from '@mui/x-data-grid';

export default function CustomColumnMenu(props) {
  const { hideMenu, currentColumn, toggleGrade, importGrade, assignmentMap } = props;
  const currentField = currentColumn.field;
  const [isLoading, setIsLoading] = useState(false);
  let customMenuItems = [];

  const handleToggleGrade = () => {
    setIsLoading(true);
    toggleGrade(currentField, () => {
      setIsLoading(false);
    });
  };
  const handleImportGrade = () => importGrade(currentField)

  if (
    currentField !== 'student_id' 
    && currentField !== 'fullname' 
    && currentField !== 'summary')
  {
    const currentAssignment = assignmentMap[currentField];
    const isFinalized = currentAssignment.finalized;
    let toggleDisplayTooltip;
    if (isFinalized) {
      toggleDisplayTooltip = 'Ẩn không cho sinh viên xem cột điểm này';
    }
    else {
      toggleDisplayTooltip = 'Hiển thị cột điểm này cho sinh viên';
    }

    customMenuItems.push(
      <ListItemButton key={1} onClick={handleImportGrade}>
        Import điểm
      </ListItemButton>
    )
    customMenuItems.push(
      <Tooltip key={0} 
        title={toggleDisplayTooltip}
      >
        <ListItemButton disabled={isLoading} onClick={handleToggleGrade}>
          {isFinalized ? 'Hủy publish' : 'Publish điểm'}  
        </ListItemButton>
      </Tooltip>
    );
  }

  return (
    <GridColumnMenuContainer>
      <GridFilterMenuItem onClick={hideMenu} column={currentColumn}/>
      {customMenuItems}
      
    </GridColumnMenuContainer>
  )
}
