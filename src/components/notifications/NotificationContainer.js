// NotificationContainer.js
import React from 'react';
import Notification from './Notification';
import { useNotification } from './../context/NotificationContext';

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotification();

  const containerStyle = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 9999,
  };

  return (
    <div style={containerStyle}>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          {...notification}
          onDismiss={removeNotification}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;