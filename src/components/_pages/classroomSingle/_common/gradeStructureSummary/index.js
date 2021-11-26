import { VictoryPie, VictoryContainer } from 'victory';
import { Box, Paper, Typography, useTheme } from '@mui/material';

import { AlignCenter } from '../../../../_common/utilBoxes';

import { useContext } from 'react';
import { CurrentClassContext } from '../../context/currentClassContext';

export default function GradeStructureSummary({title='Cấu trúc điểm'}) {
  const theme = useTheme();
  const { classAssignments } = useContext(CurrentClassContext);

  const getLabelPosition = ({innerRadius, radius}) => {
    return (innerRadius + radius) / 2;
  }

  return (
    <Paper>
      <Box padding={2}>
        <Typography variant='h6'>{title}</Typography>
        <AlignCenter flexDirection='column'>
          <Box maxWidth={300} maxHeight={300} overflow='visible'>
            <VictoryPie
              data={classAssignments}
              colorScale='cool'
              innerRadius={50}
              labelRadius={getLabelPosition}
              labels={({ datum }) => `${datum.title}: ${datum.weight}`}
              style={{ labels: { fill: theme.palette.text.primary}}}
              containerComponent={<VictoryContainer responsive={true}/>}
              x='title'
              y='weight'
            />
          </Box>
        </AlignCenter>
      </Box>
    </Paper>
  )
}
