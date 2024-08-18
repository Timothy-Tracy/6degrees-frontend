import { useState, useCallback } from 'react';

function useAppDataState(initialState = {}) {
  const [state, setState] = useState(initialState);

  const updateStateData = useCallback((key, data, error = null) => {
    setState(prevState => ({
      ...prevState,
      [key]: { 
        ...prevState[key],
        data: error ? null : data, 
        isLoading: false, 
        error: error ? error.message : null 
      },
    }));
  }, []);

  const updateStateIsLoading = useCallback((key, isLoadingValue) => {
    setState(prevState => ({
      ...prevState,
      [key]: { 
        ...prevState[key],
        isLoading: isLoadingValue != null ? isLoadingValue : !prevState[key].isLoading
      },
    }));
  }, []);

  const setStateFetchFunction = useCallback((key, fn) => {
    console.log(`${key} is getting a new fetch function ${fn.toString()}`)
    setState(prevState => ({
      ...prevState,
      [key]: { 
        ...prevState[key],
        fetch: fn
      },
    }));
  }, []);

  const getIsLoading = useCallback(() => {
    return Object.values(state).some(item => item.isLoading);
  }, [state]);

  const getError = useCallback(() => {
    const errors = Object.values(state)
      .map(item => item.error)
      .filter(error => error !== null);
    return errors.length > 0 ? errors[0] : null;
  }, [state]);




  return {
    state,
    updateStateData,
    updateStateIsLoading,
    setStateFetchFunction,
    getIsLoading,
    getError
  };
}

export default useAppDataState;