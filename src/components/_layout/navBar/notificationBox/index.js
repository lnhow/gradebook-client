import { useState, useEffect } from 'react';

import NotificationButton from './notificationButton';
import NotificationMenu from './notificationMenu';
import NotiAPI from '../../../../helpers/api/notifications'

export default function NotificationBox() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    setNotifications([]);
    setIsLoaded(false);
    setError(null);
    NotiAPI.fetchAll()
      .then(
        (result) => {
          setNotifications(result.data.data);
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
          setError(res);
        }
      )
      .finally(() => {
        setIsLoaded(true);
      })
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const markAllAsRead = () => {
    NotiAPI.readAllNoti()
      .then(
        (result) => {
          loadNotifications();
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
          setError(res);
        }
      )
      .finally(() => {
        setIsLoaded(true);
      })
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

  const notReadNotifications = notifications.filter((noti) => noti.is_read === 'N');

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
        disableMarkRead={notReadNotifications.length === 0}
        handleMarkRead={markAllAsRead}
        handleLoadNotification={loadNotifications}
      />
    </div>
  );
}