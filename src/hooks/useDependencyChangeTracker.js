import { useRef, useEffect } from 'react';
import { isEqual } from './useDeepCompareMemoize';

function useDependencyChangeTracker(dependencies, name = 'Unnamed') {
  const prevDependencies = useRef(dependencies);

  useEffect(() => {
    const changedDependencies = Object.keys(dependencies).filter(
      key => !isEqual(dependencies[key], prevDependencies.current[key])
    );

    if (changedDependencies.length > 0) {
      console.group(`${name} Dependencies Changed`);
      changedDependencies.forEach(key => {
        console.warn(`${key} changed:`);
        console.warn('Previous:', prevDependencies.current[key]);
        console.warn('Current:', dependencies[key]);
      });
      console.groupEnd();
    }

    prevDependencies.current = dependencies;
  });

  return dependencies;
}

export { useDependencyChangeTracker };