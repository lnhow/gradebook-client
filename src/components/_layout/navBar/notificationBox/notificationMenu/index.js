import {
  Menu, 
  Typography,
  Box,
  List,
  Divider,
} from '@mui/material';
import NotificationItem from './notificationItem';

const ITEM_HEIGHT = 64;
const LIST_WIDTH = '360px';

export default function NotificationMenu({
  anchorEl,
  handleClose = () => {},
  notifications = [],
}) {
  const open = Boolean(anchorEl);

  return (
    <Menu
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          maxHeight: ITEM_HEIGHT * 4.5,
          width: LIST_WIDTH,
        },
      }}
    >
      <Box px={2} pb={1}>
        <Typography><b>Thông báo</b></Typography>
      </Box>
      <Divider/>
      <List>
        {notifications.map((notification) => (
          <NotificationItem 
            key={notification.id} 
            notification={notification}
          />
        ))}
      </List>
    </Menu>
  )
}
