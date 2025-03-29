import { useRef, useEffect, useState } from "react";

type Props = {
  isVisible: boolean;
  cssTransitionDelay: number;
};

/**
 * Enter & Exit animation hook for any page/component
 * 1. set shouldRender to isVisible
 * 2. set isAnimating to true when isVisible is false
 * 3. set isAnimating to false when isVisible is true
 * 4. return shouldRender and isAnimating
 * @param {Object} props
 * @param {boolean} props.isVisible - The visibility state of the component/page
 * @param {number} props.cssTransitionDelay - The CSS transition duration in milliseconds
 * @returns {Object} shouldRender & isAnimating
 */
const useAnimation = ({ isVisible, cssTransitionDelay }: Props) => {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (!isVisible) {
      setIsAnimating(true);

      timerRef.current = setTimeout(() => {
        setShouldRender(false);
      }, cssTransitionDelay);

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    } else {
      setIsAnimating(false);
      setShouldRender(true);
    }
  }, [isVisible, cssTransitionDelay]);

  return { shouldRender, isAnimating };
};

export default useAnimation;
