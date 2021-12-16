import { 
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import ImportGradeForm from './importForm';

export default function ImportGradeDialog({
  open = false, 
  handleClose = () => {},
  assignment = null,
  onSuccess = () => {},
}) {
  let assignmentName = '';
  let assignmentId = '';
  if (assignment) {
    assignmentId = assignment.assignmentId;
    assignmentName = assignment.headerName;
  } 

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Import {assignmentName}</DialogTitle>
      <DialogContent>
        <ImportGradeForm 
          assignment_id={assignmentId}
          onSuccess={onSuccess}
          handleClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  )
}
