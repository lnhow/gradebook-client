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
import NotiAPI from '../../../../../helpers/api/notifications'

const ITEM_HEIGHT = 64;
const LIST_WIDTH = '360px';

export default function NotificationMenu({
  anchorEl,
  disableMarkRead = false,
  handleMarkRead = () => { },
  handleClose = () => { },
  handleLoadNotification = () => { },
  notifications = [],
}) {
  const open = Boolean(anchorEl);
  const readNotification = (notiId, redirect_link) => {

    NotiAPI.readNoti(notiId)
      .then(
        (result) => {
          console.log(redirect_link);
          window.open(redirect_link);
          handleLoadNotification();
        },
      )
      .catch(
        (error) => {
          let res = {};
          if (error.response && error.response.data) {
            if (error.response.data) {
              res = { ...error.response.data };
            }
            //Incase cannot request to server
            res.data = error.response.data;
            res.status = error.response.status;
          }
          else {
            res.message = error.message;
          }
        }
      )
      .finally(() => {
      })
  }
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
              <DoneAllIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
      <Divider />
      <List>
        {notifications.length ?
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onClick={() => readNotification(notification.id, notification.redirect_link)}
            />
          )) : <span style={{ marginLeft: "30px", fontStyle: "italic", color: "gray" }}>Không có thông báo mới</span>}
      </List>
    </Menu>
  )
}
