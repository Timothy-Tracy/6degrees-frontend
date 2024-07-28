// Notification.js
import React, { useEffect } from 'react';
import { Container, Toast, ToastBody, ToastHeader } from 'reactstrap';

const Notification = ({ id, sender, title, message, type, duration, onDismiss,icon, embed }) => {
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

  return (
    
    <Toast style={toastStyle}>
        <Container className={`bg-${type}`}>
      <ToastHeader icon={icon||null} toggle={() => onDismiss(id)}>{sender||'6 Degrees'}: {title}</ToastHeader>
      </Container>
      <ToastBody >
        <p>{message || null}</p>
        {embed}
      </ToastBody>
      
    </Toast>

  );
};

export default Notification;