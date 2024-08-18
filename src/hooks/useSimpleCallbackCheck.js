import { useRef, useEffect } from 'react';

const useSimpleCallbackCheck = (callback) => {
  const callbackRef = useRef();
  const stableSignatureRef = useRef(Math.floor(Math.random() * 100));

  useEffect(() => {
    if (callbackRef.current !== callback) {
      callbackRef.current = callback;
      stableSignatureRef.current =Math.floor(Math.random() * 100);
      console.log(`123Callback changed. New signature: ${stableSignatureRef.current}`);
    }
  }, [callback]);

  return stableSignatureRef.current;
}

export default useSimpleCallbackCheck

