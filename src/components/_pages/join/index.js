import { Typography, Container, Box, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

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
      <Box
        display='flex'
        direction='column'
        alignItems='center'
        justifyContent='center'
        style={{ minHeight: '90vh' /* Layout height */}}
      >
        <Box>
          <Typography variant='h5'>
            Bạn được mời tham gia lớp
          </Typography>
          <Typography variant='h4'>
            <b>[Tên lớp]</b>
          </Typography>
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
      </Box>
    </Container>
  )
}
