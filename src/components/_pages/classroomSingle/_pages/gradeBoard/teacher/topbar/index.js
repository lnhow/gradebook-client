import {
  Typography,
  Box
} from '@mui/material';
import TemplateMenu from './templateMenu';

export default function Topbar() {
  return (
    <Box display='flex' justifyContent='space-between'>
      <Typography variant='h6'>Điểm của lớp</Typography>
      <Box>
        <TemplateMenu/>
      </Box>
    </Box>
  )
}
