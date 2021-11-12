import { Dialog, DialogTitle, DialogContent } from '@mui/material';

import { USER_CLASS_ROLES } from '../../../../helpers/constants';

import SendInviteMailForm from './sendInviteMailForm';

function InviteUserDialog(
    {open, toggleClose, classInfo, role=USER_CLASS_ROLES.STUDENT}
  ) {
  const handleClose = () => {
    toggleClose();
  }

  const roleName = role === USER_CLASS_ROLES.TEACHER ? 'giáo viên' : 'học sinh';

  return (
    <Dialog 
      open={open} onClose={handleClose}
      fullWidth maxWidth='sm'
    >
      <DialogTitle>Mời {roleName}</DialogTitle>
      <DialogContent>
        { (role === USER_CLASS_ROLES.TEACHER) ?? <SendInviteMailForm/>}
      </DialogContent>
    </Dialog>
  )
}

export default InviteUserDialog;
