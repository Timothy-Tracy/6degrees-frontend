import { useRef, useEffect, useCallback } from 'react';

// Custom hook for deep comparison
function useDeepCompareMemoize(value) {
  const ref = useRef();
  
  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }
  
  return ref.current;
}

// Deep equality check function
function isEqual(a, b) {
  if (a === b) return true;
  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;
    
    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!isEqual(a[i], b[i])) return false;
      return true;
    }
    
    if (a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) return false;
      for (i of a.entries())
        if (!b.has(i[0])) return false;
      for (i of a.entries())
        if (!isEqual(i[1], b.get(i[0]))) return false;
      return true;
    }
    
    if (a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) return false;
      for (i of a.entries())
        if (!b.has(i[0])) return false;
      return true;
    }
    
    if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (a[i] !== b[i]) return false;
      return true;
    }
    
    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
    
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;
    
    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    
    for (i = length; i-- !== 0;) {
      var key = keys[i];
      if (!isEqual(a[key], b[key])) return false;
    }
    
    return true;
  }
  
  // true if both NaN, false otherwise
  return a !== a && b !== b;
}

// Usage example
function MyComponent({ complexDependency }) {
  const memoizedDependency = useDeepCompareMemoize(complexDependency);
  
  useEffect(() => {
    // This effect will only run if complexDependency deeply changes
    console.log('complexDependency changed:', memoizedDependency);
  }, [memoizedDependency]);

  // ... rest of the component
}

export { useDeepCompareMemoize, isEqual };