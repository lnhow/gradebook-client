import { MenuItem } from '@mui/material';
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
      {isLoading ? 'Đang export...' : 'Export bảng điểm'}
    </MenuItem>
  )
}
