import {
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

export default function NotificationItem({
  notification = {},
  onClick = () => { },
}) {

  return (
    <ListItem disablePadding>
      <ListItemButton
        disabled={Boolean(notification.is_read === 'Y')}
        sx={{ paddingX: 2, paddingY: 0}}
      >
        <ListItemText
          onClick={onClick}
          primary={
            <Typography
              variant='subtitle1'
            >
              <b>{notification.title}</b>
            </Typography> 
          }
          secondary={
            <Typography
              variant='caption'
              color='text.primary'
            >
              {notification.content}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  )
}