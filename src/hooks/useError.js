// useError.js
import { useState, useCallback, useEffect } from 'react';
import { logError } from '../errors/errorLogger';
import { Alert } from 'react-bootstrap';
import { AppError, InputValidationError } from '../errors/customErrors'
import { useNotification } from '../components/context/NotificationContext';
import { Button } from 'reactstrap';
import { useDebug } from '../components/context/DebugContext';
function useError() {
  const [error, setError] = useState(null);
  const { addNotification } = useNotification();
  const { debug } = useDebug()

  const handleError = useCallback((errorInstance, errorInfo = {}) => {
    console.log('Handling error:', errorInstance.message);
    setError(errorInstance);
    logError('Error Hook Catch', errorInstance, errorInfo);
  }, []);

  const withErrorHandling = (fn) => {
    return async (...args) => {
      try {
        return await fn(...args);
      } catch (error) {
        handleError(error);
      }
    };
  }

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    if (error) {
      let processedError = processError(error);
      notifyError(processedError);
    }
  }, [error]);

  const processError = (error) => {
    if (error.name === 'AxiosError' && error.response?.data) {
      debug('Axios Error Detected');
      let serverError = error.response.data.error;
      return {
        name: serverError.name,
        message: serverError.message,
        statusCode: serverError.statusCode,
        details: Array.isArray(serverError.error)
          ? serverError.error.map(e => e.message)
          : serverError.error
      };
    }
    return error;
  };


  const notifyError = (err) => {
    addNotification({
      sender: err.name === 'AxiosError' ? '6 Degrees Server Message' : 'App Error',
      title: `${err.name}${err.statusCode ? ` - ${err.statusCode}` : ''}`,
      message: `${err.message}${err.details ? `\nDetails: ${JSON.stringify(err.details, null, 2)}` : ''}`,
      type: 'danger',

    });
  };

  const createSafeHandler = (handlerName, handler) => {
    return withErrorHandling((...args) => {
      if (typeof handler !== 'function') {
        throw new AppError({
          name: 'PostCard Error',
          message: `No '${handlerName}' function provided`
        });
      }
      return handler(...args);
    });
  };

    


const ErrorMessageComponent = () => {

  if (!error) {
    return (<></>)
  }
  let err = {};
  if (error.name == 'AxiosError') {
    console.log('Axios Error')
    if (error.response.data) {
      console.log("Prioritizing Server Error")
      let srverr = error.response.data.error;
      err.name = srverr.name;
      err.message = srverr.message
      let localErrs = srverr.error;

      localErrs = localErrs.map((element) => {
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

return { error, handleError, withErrorHandling, clearError, ErrorMessageComponent, createSafeHandler };
}

export default useError;