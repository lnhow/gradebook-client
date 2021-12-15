import {
  Typography,
  Box
} from '@mui/material';
import GradeboardMenu from './gradeboardMenu';

export default function Topbar({refreshData}) {
  return (
    <Box display='flex' justifyContent='space-between'>
      <Typography variant='h6'>Điểm của lớp</Typography>
      <Box>
        <GradeboardMenu handleRefresh={refreshData}/>
      </Box>
    </Box>
  )
}
