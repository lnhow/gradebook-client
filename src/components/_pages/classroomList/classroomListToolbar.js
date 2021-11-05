import {Toolbar, Container, Button, IconButton, Typography, Divider, Stack} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';

function ClassroomListToolbar({
  handleOpenNewDialog,
  handleRefresh
}) {
  return (
    <Container 
      maxWidth='xl' 
      component='div'
      disableGutters
    >
      <Container maxWidth='lg' disableGutters>
        <Toolbar>
          <Typography
            variant='h5'
            component='div'
            sx={{ flexGrow: 1}}
          >
          </Typography>
          <Stack direction='row' spacing={1}>
            <IconButton
              color='defaultColor'
              onClick={handleRefresh}
            >
              <RefreshIcon/>
            </IconButton>
            <Button
              variant='outlined'
              startIcon={<AddIcon/>}
              onClick={handleOpenNewDialog}
            >
              Tạo
            </Button>
          </Stack>
        </Toolbar>
      </Container>
      <Divider/>
    </Container>
  )
}

export default ClassroomListToolbar;