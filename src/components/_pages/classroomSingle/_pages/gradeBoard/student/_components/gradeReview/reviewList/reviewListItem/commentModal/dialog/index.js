import { 
  Dialog, 
  DialogTitle,
  IconButton,
} from '@mui/material';

import {
  styled,
} from '@mui/material/styles';

import CloseIcon from '@mui/icons-material/Close';

import CommentContainer from './container';

function CommentDialog({
  review = {},
  open, 
  toggleClose = () => {},
  onSuccess = () => {}
}) {
  const handleClose = () => {
    toggleClose();
  }
  const reviewId = review.id;
  return (
    <CustomDialog 
      open={open} onClose={handleClose}
      fullWidth 
      maxWidth='sm'
      style={{padding: '0px 0px'}}
    >
      <DialogTitle sx={{ m: 0, px: 2, py: 1 }}>
        Danh sách bình luận
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
      <CommentContainer reviewId={reviewId}/>
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
