import {
  Box
} from '@mui/material';
import {
  GridOverlay
} from '@mui/x-data-grid';

export default function CustomNoRowsOverlay() {
  return (
    <GridOverlay>
      <Box mx='auto'>
        Không có dữ liệu
      </Box>
    </GridOverlay>
  )
}
