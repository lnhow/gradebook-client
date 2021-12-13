import { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

const studentImportTemplateURL = 'https://file-examples-com.github.io/uploads/2017/02/file_example_XLS_50.xls';
const gradeImportTemplateURL = 'https://file-examples-com.github.io/uploads/2017/02/file_example_XLS_50.xls';

export default function TemplateMenu() {
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
      <Button
        variant='contained'
        onClick={handleClick}
      >
        Mẫu nhập
      </Button>
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
        <MenuItem component={Link} to={studentImportTemplateURL} download target='_blank'>
          Mẫu nhập thông tin sinh viên
        </MenuItem>
        <MenuItem component={Link} to={gradeImportTemplateURL} download target='_blank'>
          Mẫu nhập điểm
        </MenuItem>
      </Menu>
    </>
  );
}