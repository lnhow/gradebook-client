import { Box, Typography, Paper } from '@mui/material';
import { AlignCenter } from '../../../../../../_common/utilBoxes';

export default function AssigmentListItem({assignment}) {
  const title = assignment.title;
  const weight = assignment.weight;
  return (
    <Paper>
      <Box display='flex' padding={2}>
        <AlignCenter mx={2} sx={{ flexGrow: 1}}>
          <Typography variant='body1' sx={{ flexGrow: 1}}>
            {title} {weight}
          </Typography>
        </AlignCenter>
      </Box>
    </Paper>
  )
}
