import { useState, useCallback, useEffect } from 'react';
import { logError } from '../errors/errorLogger';
import { Alert } from 'react-bootstrap';
import{InputValidationError} from '../errors/customErrors'
import { useNotification } from '../components/context/NotificationContext';
function useError() {
  const [error, setError] = useState(null);
  const {addNotification} = useNotification();
  const handleError = useCallback((errorInstance, errorInfo = {}) => {
    setError(errorInstance);
    logError('Error Hook Catch', errorInstance, errorInfo);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(()=>{
    if(error){
      let err={}
      if (error.name == 'AxiosError'){
        console.log('Axios Error')
        if(error.response.data){
          let err = error.response.data.error
          
            console.log("Prioritizing Server Error")
            let srverr = error.response.data.error;
            err.name = srverr.name;
            err.message = srverr.message
            let localErrs = srverr.error;
            if(typeof localErrs == 'array'){
              localErrs = localErrs.map((element)=>{
                return element.message
            })
            }
            
            err.details = localErrs;
            addNotification({
              sender: '6 Degrees Server Message',
              title:`${err.name} - ${err.statusCode}`,
              message : `${err.message} ${JSON.stringify(err.details,null,2)}`,
              type:'danger'
            })
        }
    } else {
        err = error
    }

      addNotification({
        title:`${error.name} `,
        message: `${error.code}: ${error.message}`,
        type:'danger'
      })
    }
  }, [error])
  const ErrorMessageComponent = () =>{
    
    if(!error){
        return (<></>)
    }
    let err = {};
    if (error.name == 'AxiosError'){
        console.log('Axios Error')
        if(error.response.data){
            console.log("Prioritizing Server Error")
            let srverr = error.response.data.error;
            err.name = srverr.name;
            err.message = srverr.message
            let localErrs = srverr.error;
            
            localErrs = localErrs.map((element)=>{
                return element.message
            })
            err.details = localErrs;
            
        }
    } else {
        err = error
    }
    return (
        <>

          <Alert variant="danger">
            <p>
            {err.message}
            </p>  
          </Alert>
        </>
      );
  }

  return { error, handleError, clearError, ErrorMessageComponent };
}

export default useError;