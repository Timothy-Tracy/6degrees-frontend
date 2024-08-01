// Notification.js
import React, { useEffect } from 'react';
import { Container, Toast, ToastBody, ToastHeader } from 'reactstrap';
/**
 * @typedef {Object} Notification
 * @property {string} title - What will display as the header of the notification
 * @property {string} sender - What will display as tohe predecessor of the title. Ex. Sender: Title. Default value is 6 Degrees
 * @property {'info'|'success'|'warning'|'error' | React.JSX} icon - The Icon
 * @property {string} message - The content of the notification
 * @property {React.JSX} embed - Embed custom JSX to be displayed in the body
 * @property {('info'|'success'|'warning'|'error')} [type='info'] - The type of notification
 * @property {number} [duration=5000] - Duration in milliseconds before the notification is automatically removed
 */
const GlobalNotification = ({ id, sender, title, message, type, duration, onDismiss,icon, embed }) => {
  

  useEffect(() => {
    if(duration > 0){
        console.log(duration)
        const timer = setTimeout(() => {
            onDismiss(id);
          }, duration);
      
          return () => clearTimeout(timer);
    }
    
  }, [id, duration, onDismiss]);

  const toastStyle = {
    minWidth: '250px',
    marginBottom: '10px',
  };

  const toastBody = ({ message, embed }) => {
    if (message || embed) {
      return (
        <ToastBody >
          <p>{message || null}</p>
          {embed}
        </ToastBody>

      )
    }
  }

  return (
    
    <Toast style={toastStyle}>
        <Container className={`bg-${type}`}>
      <ToastHeader icon={icon||null} toggle={() => onDismiss(id)}>{sender? `${sender}:`:''}{title}</ToastHeader>
      </Container>
      <toastBody message={message} embed={embed}></toastBody>
      
    </Toast>

  );
};

export default GlobalNotification;