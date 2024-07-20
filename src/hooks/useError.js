import { useState, useCallback } from 'react';
import { logError } from '../errors/errorLogger';
import { Alert } from 'react-bootstrap';
import{InputValidationError} from '../errors/customErrors'
function useError() {
  const [error, setError] = useState(null);

  const handleError = useCallback((errorInstance, errorInfo = {}) => {
    setError(errorInstance);
    logError('Error Hook Catch', errorInstance, errorInfo);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

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