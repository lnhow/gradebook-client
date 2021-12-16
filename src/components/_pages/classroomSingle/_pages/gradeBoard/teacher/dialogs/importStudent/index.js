import { 
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import ImportStudentForm from './importForm';

export default function ImportStudentDialog({
  open = false, 
  handleClose = () => {},
  onSuccess = () => {},
}) {
  

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Import danh sách lớp</DialogTitle>
      <DialogContent>
        <ImportStudentForm
          onSuccess={onSuccess}
          handleClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  )
}