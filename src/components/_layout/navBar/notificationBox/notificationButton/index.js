import {
  IconButton,
  Badge,
} from '@mui/material';

import NotificationsIcon from '@mui/icons-material/Notifications';

export default function NotificationButton({
  handleClick = () => {},
  numNotifications = 0,
}) {
  return (
    <IconButton
      onClick={handleClick}
    >
      <Badge color='error' badgeContent={numNotifications}>
        <NotificationsIcon/>
      </Badge>
    </IconButton>
  );
}
