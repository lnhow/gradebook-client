import { 
  Card, CardContent, Typography,
  Box, Paper, Link
} from '@mui/material';

import {
  Link as RouterLink
} from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { useState } from 'react';

const Div = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  transition: '0.2s linear',
    '&:hover': {
      paddingLeft: theme.spacing(3),
    },
}));

const ClippedTypography = styled(Typography)(() => ({
  wordWrap: 'break-word',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,  //max num of lines to show
  WebkitBoxOrient: 'vertical'
}));

export default function ClassroomListItem({classroom}) {
  const [ isRaised, setIsRaised ] = useState(false);

  const toggleRaised = (raised) => () => {
    setIsRaised(raised);
  }

  return (
    <Card
      raised={isRaised}
      onMouseOver={toggleRaised(true)}
      onMouseOut={toggleRaised(false)}
      sx={{ height: '100%', display:'flex', flexDirection: 'column' }}
    >
      <CardContent>
        <Link component={RouterLink} to={`/class/${classroom.id}`}
          underline='hover' color="inherit"
        >
          <ClippedTypography gutterBottom variant='h6' component='div' >
            <b>{classroom.class_name}</b>
          </ClippedTypography>
          <ClippedTypography variant='subtitle2' color='text.secondary'>
            <b>{classroom.subject}</b>
          </ClippedTypography>
        </Link>
      </CardContent>
    </Card>
  )
}

export function OldClassroomListItem({classroom}) {
  return (
    <Paper elevation={2} sx={{height: '100%'}}>
      <Div>
        <Box>
          <Typography variant="subtitle1" sx={{wordWrap: 'break-word'}}>
            <b>Class</b>
          </Typography>
          <Typography variant="h6" sx={{wordWrap: 'break-word'}}>
            {classroom.className}
          </Typography>
          <Typography variant="body2" sx={{wordWrap: 'break-word'}}>
            <b>{classroom.subject}</b>
          </Typography>
        </Box>
      </Div>
    </Paper>
  );
}
