import { useState } from 'react';
import { 
  Menu, 
  MenuItem,
  IconButton,
  Divider,
  Typography
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

import ExportMenuItem from './export'
import DownloadTemplateStudentMenuItem from './downloadTemplateStudent';
import DownloadTemplateGradeMenuItem from './downloadTemplateGrade';

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
        <DownloadTemplateStudentMenuItem/>
        <DownloadTemplateGradeMenuItem/>

        <Divider textAlign='left'>
          <Typography variant='caption'><b>Import</b></Typography>
        </Divider>
        <MenuItem onClick={() => {toggleImportStudent()}}>
          Import danh sách lớp
        </MenuItem>

        <Divider textAlign='left'>
        <Typography variant='caption'><b>Export</b></Typography>
        </Divider>
        <ExportMenuItem/>
      </Menu>
    </>
  );
}