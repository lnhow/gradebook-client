import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Legend, Tooltip} from 'chart.js';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { cyan } from '@mui/material/colors';

import { AlignCenter } from '../../../../_common/utilBoxes';

import { useContext } from 'react';
import { CurrentClassContext } from '../../context/currentClassContext';

Chart.register(ArcElement);
Chart.register(Legend);
Chart.register(Tooltip);

const colors = [
  900, 800, 700, 600, 500, 400, 300
].map((colorValue) => cyan[colorValue]);

export default function GradeStructureSummary({title='Cấu trúc điểm'}) {
  const theme = useTheme();
  const { classAssignments } = useContext(CurrentClassContext);
  const classAssignmentNames = classAssignments.map((assignment) => assignment.title);
  const classAssignmentWeights = classAssignments.map((assignment) => assignment.weight);

  const chartData = {
    labels: classAssignmentNames,
    datasets:[{
      label: 'Phần trăm điểm',
      data: classAssignmentWeights,
      backgroundColor: colors,
    }]
  }

  const chartOptions = {
    plugins: {
      legend: { 
        labels: {
          color: theme.palette.text.primary
        },
        display: true,
        position: 'top' 
      },
    },
  };

  return (
    <Paper>
      <Box padding={2}>
        <Typography variant='h6'>{title}</Typography>
        <AlignCenter flexDirection='column'>
          <Box overflow='visible'>
            <Pie
              data={chartData}
              options={chartOptions}
            />
          </Box>
        </AlignCenter>
      </Box>
    </Paper>
  )
}
