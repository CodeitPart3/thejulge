import { RefObject, useEffect } from "react";

interface UseOutsideClickParams {
  refs: RefObject<Element | null>[];
  callback: () => void;
}

const useOutsideClick = ({ refs, callback }: UseOutsideClickParams) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (refs.every((ref) => !ref.current?.contains(target))) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, callback]);
};

export default useOutsideClick;
