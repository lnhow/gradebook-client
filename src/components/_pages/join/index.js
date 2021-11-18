import { Typography, Container, Box, Button, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

import { styled } from '@mui/material/styles';

const ClippedTypography = styled(Typography)(() => ({
  wordWrap: 'break-word',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 4,  //max num of lines to show
  WebkitBoxOrient: 'vertical'
}));

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function JoinPage() {
  const queryString = useQuery();
  const invitation = queryString.get('invitation');
  const classId = queryString.get('class_id');
  return(
    <Container maxWidth='md'>
      <Grid
        container
        display='flex'
        direction='column'
        alignItems='center'
        justifyContent='center'
        style={{ minHeight: '90vh' /* Layout height */}}
      >
        <Grid item xs={12}>
          <Box maxWidth='300px'>
            <Typography variant='body1'>
              Bạn được mời tham gia lớp
            </Typography>
            <ClippedTypography variant='h6'>
              <b>[Tên lớp]</b>
            </ClippedTypography>
            <Typography variant='subtitle1'>
              <b>[Giáo viên/ Học sinh]</b>
            </Typography>
            <Button 
              variant='contained'
            >
              Tham gia
            </Button>
            <Typography variant='subtitle2'>
              invitation: {invitation} | class_id: {classId}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
