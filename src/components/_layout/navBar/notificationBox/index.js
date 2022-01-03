import { useState } from 'react';

import NotificationButton from './notificationButton';
import NotificationMenu from './notificationMenu';

const options = [
  {
    id: 1,
    title: 'Đã có điểm mới',
    content: 'Giáo viên đã publish một cột điểm ở lớp [Tên lớp]',
    read: false,
  },
  {
    id: 2,
    title: 'Có yêu cầu phúc khảo mới',
    content: '[Sinh viên] yêu cầu phúc khảo ở lớp [Tên lớp]',
    read: false,
  },
  {
    id: 3,
    title: 'Có cập nhật về phúc khảo',
    content: 'Yêu cầu phúc khảo ở lớp [Tên lớp] đã có cập nhật',
    read: false,
  },
  {
    id: 4,
    title: 'Yêu cầu phúc khảo đã có quyết định cuối cùng',
    content: 'Yêu cầu phúc khảo ở lớp [Tên lớp] đã có quyết định cuối cùng',
    read: true,
  },
];

export default function NotificationBox() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState(options);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const markAllAsRead = () => {
    const updatedNotifications = notifications;
    updatedNotifications.forEach((noti) => noti.read = true);
    setNotifications(updatedNotifications);
  }
  const handleClose = () => {
    setAnchorEl(null);
    markAllAsRead();
  };

  const notReadNotifications = notifications.filter((noti) => noti.read === false);

  return (
    <div>
      <NotificationButton 
        handleClick={handleClick}
        numNotifications={notReadNotifications.length}
      />
      <NotificationMenu
        anchorEl={anchorEl}
        notifications={notifications}
        handleClose={handleClose}
      />
    </div>
  );
}