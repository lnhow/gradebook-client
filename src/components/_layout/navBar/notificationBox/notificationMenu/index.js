import {
  Menu, 
  Typography,
  Box,
  List,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import NotificationItem from './notificationItem';

const ITEM_HEIGHT = 64;
const LIST_WIDTH = '360px';

export default function NotificationMenu({
  anchorEl,
  disableMarkRead = false,
  handleMarkRead = () => {},
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
      <Box px={2} pb={1} 
        display='flex' justifyContent='space-between' alignItems='center'
      >
        <Typography><b>Thông báo</b></Typography>
        <Tooltip title='Đánh dấu tất cả đã đọc'>
          <span>
            <IconButton  
              disabled={disableMarkRead}
              onClick={handleMarkRead}>
                <DoneAllIcon/>
            </IconButton>
          </span>
        </Tooltip>
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
