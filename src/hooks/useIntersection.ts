import { DependencyList, useEffect, useRef } from "react";

interface UseIntersectionParams {
  callback: IntersectionObserverCallback;
  deps?: DependencyList;
}

const useIntersection = <T extends HTMLElement>({
  callback,
  deps,
}: UseIntersectionParams) => {
  const dependencies = deps ?? [];
  const targetRef = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(callback);
    const current = targetRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.disconnect();
      }
    };
  }, [callback, ...dependencies]);

  return targetRef;
};

export default useIntersection;
