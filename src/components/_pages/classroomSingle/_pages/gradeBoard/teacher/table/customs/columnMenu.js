import {
  ListItemButton,
} from '@mui/material';

import {
  GridFilterMenuItem,
  GridColumnMenuContainer,
} from '@mui/x-data-grid';

export default function CustomColumnMenu(props) {
  const { hideMenu, currentColumn, toggleGrade, importGrade } = props;
  let customMenuItems = [];

  if (currentColumn.field !== 'student_id' && currentColumn.field !== 'fullname') {
    customMenuItems.push(
      {title: 'Hiện điểm', onClick: () => toggleGrade(currentColumn.field)}
    );
  }

  if (currentColumn.field !== 'summary') {
    customMenuItems.push(
      {title: 'Import điểm', onClick: () => importGrade(currentColumn.field)},
    );
  }

  return (
    <GridColumnMenuContainer>
      <GridFilterMenuItem onClick={hideMenu} column={currentColumn}/>
      {customMenuItems.map((menuItem, index) => (
        <ListItemButton key={index} onClick={menuItem.onClick}>
          {menuItem.title}
        </ListItemButton>
      ))}
      
    </GridColumnMenuContainer>
  )
}
