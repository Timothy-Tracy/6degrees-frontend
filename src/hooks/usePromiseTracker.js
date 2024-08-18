import { useState, useCallback, useEffect, useRef } from 'react';
import { useDebug } from '../components/context/DebugContext';
import useSimpleCallbackCheck from './useSimpleCallbackCheck';

//THIS IS CURRENTLY OPTIMIZED AND THE USECALLBACK WORKS AS INTENDED, DO NOT CHANGE

/**
 * @typedef {'idle' | 'pending' | 'resolved' | 'rejected'} PromiseStatus
 */

/**
 * Custom hook for tracking the status of a single promise.
 *
 * @param {string} operationName - The name of the operation being tracked
 * @returns {Object} An object containing tracking function and current status
 */
function usePromiseTracker(operationName) {
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { debug } = useDebug();
  const signatureRef = useRef(Math.floor(Math.random() * 100));

  const updateStatus = useCallback((newStatus) => {
    setStatus(newStatus);
  }, []);

  const trackPromise = useCallback(async (promiseFunc) => {
    updateStatus('pending');
    setResult(null);
    setError(null);
   

    try {
      const res = await promiseFunc();
      setResult(res);
      updateStatus('resolved');
      console.log(`Promise ${operationName} ${signatureRef.current} resolved: `, res);
    
      return res;
    } catch (err) {
      setError(err);
      updateStatus('rejected');
      console.log(`Promise ${operationName} ${signatureRef.current} rejected: `, err);
     
      throw err;
    }
    

  }, []);

  useEffect(() => {
    console.log(`Promise ${operationName} ${signatureRef.current} ${status}:`, { status, result, error });
  }, [operationName, status, result, error]);

  return {
    trackPromise,
    status,
    result,
    error,
    isLoading: status === 'pending',
    signature: signatureRef.current  // Expose the signature for testing
  };
}

export default usePromiseTracker;