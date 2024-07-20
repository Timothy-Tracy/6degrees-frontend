import React from 'react';
import useError from '../hooks/useError';

function withAsyncErrorHandler(WrappedComponent) {
  return function WithAsyncErrorHandler(props) {
    const { handleError } = useError();

    const handleAsyncError = async (asyncFunction) => {
      try {
        return await asyncFunction();
      } catch (error) {
        handleError(error);
      }
    };

    return <WrappedComponent {...props} handleAsyncError={handleAsyncError} />;
  };
}

export default withAsyncErrorHandler;