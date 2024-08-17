// Notification.js
import React, { useEffect, useState } from 'react';
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
const Notification = ({ sender, title, message, type, duration, icon, embed, width, dismissable, children, useDefaultStyle, containerClassName }) => {
  const [show, setShow] = useState(true);
  if (!message) {
    message = children
  }
  if (!useDefaultStyle) {
    useDefaultStyle = false
  }
  if (!dismissable) {
    dismissable = false
  }
  const onDismiss = () => {
    setShow(false)
  }
  useEffect(() => {
    if (duration > 0) {
      console.log(duration)
      const timer = setTimeout(() => {
        onDismiss();
      }, duration);

      return () => clearTimeout(timer);
    }

  }, [duration]);

  const toastStyle = {
    minWidth: width || '250px',
    marginBottom: '10px',
  };
  const sty = useDefaultStyle ? toastStyle : { minWidth: '100%' }
  console.log(useDefaultStyle)
  const toggleBool = () => {
    if (dismissable) {
      return { 'toggle': () => onDismiss() }
    } else {
      return null
    }
  }

  const NotificationBody = ({ message, embed, children }) => {
    if (message || embed || children) {
      return (
        <Container className='px-3'>
            <ToastBody style={{padding: '10px'}} className='py-3'>
         <p>{message || null}</p>
          {children}
          {embed}
        </ToastBody>
        </Container>
        

      )
    }
  }

  return (
    <Container className='py-2'>
      <Toast style={sty} isOpen={show}>
        <Container className={`bg-${type}`}>
          <ToastHeader icon={icon || null} {...toggleBool}>{sender? `${sender}: `:''}{title}</ToastHeader>
          
        </Container>
        
        <NotificationBody message={message} embed={embed} children={children}></NotificationBody>

        
      </Toast>
    </Container>

  );
};

export default Notification;