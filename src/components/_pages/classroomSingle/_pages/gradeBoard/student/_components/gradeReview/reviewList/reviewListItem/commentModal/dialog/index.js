import { 
  Dialog, 
  DialogTitle, 
  DialogContent,
  Box,
  IconButton,
  DialogActions,
  Stack,
  Typography,
} from '@mui/material';

import {
  styled,
} from '@mui/material/styles';

import CloseIcon from '@mui/icons-material/Close';

import CommentList from './commentList';
import CommentForm from './inputBox';

function CommentDialog({
  comments=[],
  open, 
  toggleClose = () => {},
  onSuccess = () => {}
}) {
  const handleClose = () => {
    toggleClose();
  }

  return (
    <CustomDialog 
      open={open} onClose={handleClose}
      fullWidth 
      maxWidth='sm'
      style={{padding: '0px 0px'}}
    >
      <DialogTitle sx={{ m: 0, px: 2, py: 1 }}>
        <Typography variant='subtitle1'>Danh sách comment</Typography>
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 2,
            top: 2,
          }}
        >
          <CloseIcon/>
        </IconButton>
      </DialogTitle>
      <DialogContent dividers={true}>
        <Box sx={{height: '400px', overflow: 'auto'}}>
          <CommentList comments={comments}/>
        </Box>
      </DialogContent>
      <DialogActions>
        <Stack width='100%'>
          <CommentForm/>
        </Stack>
      </DialogActions>
    </CustomDialog>
  )
}

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(0, 0, 0, 1),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default CommentDialog;
