import { useState } from 'react';
import { 
  Menu, 
  MenuItem,
  IconButton,
  Divider,
  Typography
} from '@mui/material';
import { Link } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';

const studentImportTemplateURL = 'https://file-examples-com.github.io/uploads/2017/02/file_example_XLS_50.xls';
const gradeImportTemplateURL = 'https://file-examples-com.github.io/uploads/2017/02/file_example_XLS_50.xls';

export default function GradeboardMenu({
  handleRefresh,
  toggleImportStudent
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        variant='contained'
        onClick={handleClick}
      >
        <MenuIcon/>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem onClick={handleRefresh}>
          Tải lại
        </MenuItem>
        <Divider textAlign='left'>
          <Typography variant='caption'><b>Mẫu import</b></Typography>
        </Divider>
        <MenuItem component={Link} to={studentImportTemplateURL} download target='_blank'>
          Mẫu danh sách lớp
        </MenuItem>
        <MenuItem component={Link} to={gradeImportTemplateURL} download target='_blank'>
          Mẫu cột điểm
        </MenuItem>
        <Divider textAlign='left'>
          <Typography variant='caption'><b>Import</b></Typography>
        </Divider>
        <MenuItem onClick={() => {toggleImportStudent()}}>
          Import danh sách lớp
        </MenuItem>
        <Divider textAlign='left'>
        <Typography variant='caption'><b>Export</b></Typography>
        </Divider>
        <MenuItem onClick={() => {}}>
          Export bảng điểm
        </MenuItem>
      </Menu>
    </>
  );
}