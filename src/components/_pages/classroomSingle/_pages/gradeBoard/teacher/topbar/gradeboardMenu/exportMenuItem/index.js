import { MenuItem, CircularProgress } from '@mui/material';
import { useState } from 'react';

export default function ExportMenuItem() {
  const [isLoading, setIsLoading] = useState(false);
  const handleExport = () => {
    setIsLoading(true);
    console.log('Export')
    setIsLoading(false);
  }

  return (
    <MenuItem 
      disabled={isLoading}
      onClick={handleExport}
    >
      {isLoading ? 
        <span style={{display: 'flex'}}>
          <CircularProgress size={21} sx={{marginRight: 1}}/>
          Đang export
        </span> 
        : 'Export bảng điểm'
      }
    </MenuItem>
  )
}
