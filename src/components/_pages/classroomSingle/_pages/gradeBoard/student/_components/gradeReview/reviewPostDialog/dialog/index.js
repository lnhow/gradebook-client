import { 
  Dialog, DialogTitle, DialogContent,
  Button
} from '@mui/material';
import ReviewPostForm from '../form';

function RequestReviewDialog(
  {open, toggleClose}
) {

  const handleClose = () => {
    toggleClose();
  }

  return (
    <Dialog 
      open={open} onClose={handleClose}
      fullWidth maxWidth='sm'
    >
      <DialogTitle>Đăng yêu cầu phúc khảo</DialogTitle>
      <DialogContent>
        <ReviewPostForm/>
        <Button 
          sx={{marginTop: 1}} color='defaultColor' variant='outlined' fullWidth 
          onClick={handleClose}
        >
          Hủy
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default RequestReviewDialog;
