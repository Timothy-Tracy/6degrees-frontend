import { useState } from "react";
import { Toast, ToastBody, ToastHeader } from "reactstrap"

const Notification2 = ({icon, sender, message}) => {
    const [showToast, setShowToast] = useState(true);

  const toggleToast = () => setShowToast(!showToast);

    const toastContainerStyle = {
        position: 'fixed',
        top: '20px',  // Adjust this value to control distance from the top
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
      };
    
      const toastStyle = {
        minWidth: '250px', // Adjust as needed
        textAlign: 'center',
      };
    return (
        <div style={toastContainerStyle}>

        
        <Toast  isOpen={showToast} style={toastStyle}>
            <ToastHeader toggle={toggleToast} icon={icon}>
                {sender}
            </ToastHeader>
            <ToastBody>
                {message}
            </ToastBody>
        </Toast>
        </div>
    )
}

export default Notification2