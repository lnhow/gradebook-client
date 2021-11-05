import { 
  Card, CardActionArea, CardContent, Typography,
  Box, Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const Div = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  transition: '0.2s linear',
    '&:hover': {
      paddingLeft: theme.spacing(3),
    },
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
      <CardActionArea sx={{flexGrow: 1}}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" sx={{wordWrap: 'break-word'}}>
            {classroom.className}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{wordWrap: 'break-word'}}>
            <b>{classroom.subject}</b>
          </Typography>
        </CardContent>
      </CardActionArea>
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
