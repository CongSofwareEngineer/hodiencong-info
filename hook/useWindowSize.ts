import { IS_BROWSER } from "@/constant/app";
import { useEffect, useState } from "react";

const useWindowSize = (initialWidth = Infinity, initialHeight = Infinity) => {
  const [state, setState] = useState<{ width: number; height: number }>({
    width: IS_BROWSER ? window.innerWidth : initialWidth,
    height: IS_BROWSER ? window.innerHeight : initialHeight,
  });

  const [isHorizontal, setIsHorizontal] = useState(false)

  useEffect((): (() => void) | void => {
    if (IS_BROWSER) {
      const handler = () => {
        setState({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
      window.addEventListener('resize', handler)

      return () => {
        window.removeEventListener('resize', handler)
      };
    }
  }, []);

  useEffect(() => {
    if (state.height >= state.width && isHorizontal) {
      setIsHorizontal(false)
    }
    if (state.height < state.width && !isHorizontal) {
      setIsHorizontal(true)
    }
  }, [isHorizontal, state])


  return {
    heightScree: state.height,
    widthScree: state.width,
    isHorizontal
  };
};

export default useWindowSize;