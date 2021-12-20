import { useState } from 'react';
import { 
  Menu, 
  MenuItem,
  Button,
  Divider,
  Typography,
  ListItemIcon,
  ListItemText
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import RefreshIcon from '@mui/icons-material/Refresh';

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
      <Button
        variant='contained'
        onClick={handleClick}
        endIcon={<MenuIcon/>}
      >
        Menu
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
        <MenuItem onClick={handleRefresh}>
          <ListItemIcon><RefreshIcon/></ListItemIcon>
          <ListItemText>Tải lại</ListItemText>
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