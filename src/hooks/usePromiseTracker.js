import { useState, useCallback, useEffect } from 'react';
import { useDebug } from '../components/context/DebugContext';

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

  const updateStatus = useCallback((newStatus) => {
    setStatus(newStatus);
    console.log(`Promise Update ${operationName}: ${newStatus}`);
  }, [operationName]);

  const trackPromise = useCallback(async (promiseFunc) => {
    updateStatus('pending');
    setResult(null);
    setError(null);

    try {
      const res = await promiseFunc();
      setResult(res);
      updateStatus('resolved');
      console.log(`Promise Resolved: ${operationName}: `, res);
      return res;
    } catch (err) {
      setError(err);
      updateStatus('rejected');
      console.log(`Promise Rejected: ${operationName}: `, err);
      throw err;
    }
  }, [operationName, updateStatus]);

  useEffect(() => {
    console.log(`Promise Tracker State: ${operationName} tracker state:`, { status, result, error });
  }, [operationName, status, result, error]);

  return {
    trackPromise,
    status,
    result,
    error,
    isLoading: status === 'pending'
  };
}

export default usePromiseTracker;