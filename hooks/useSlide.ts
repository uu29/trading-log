import { useEffect, useState } from "react";
import { keyframes } from "@emotion/css";

const slideIn = keyframes`
  0% { opacity: 0; transform: translateX(80%) translateZ(-20px); }
  100% { opacity: 1; transform: translateX(0) translateZ(20px); }
`;

const slideOut = keyframes`
  0% { opacity: 1; transform: translateX(0) translateZ(20px); }
  100% { opacity: 0; transform: translateX(80%) translateZ(-20px); }
`;

const useSlide = (initial: boolean, delay?: string) => {
  const [show, setShow] = useState(initial);
  const [isVisible, setVisible] = useState(show);

  // Update visibility when show changes
  useEffect(() => {
    if (show) setVisible(true);
  }, [show]);

  // When the animation finishes, set visibility to false
  const onAnimationEnd = () => {
    if (!show) setVisible(false);
  };

  const style = { animation: `${show ? slideIn : slideOut} ${delay ? delay : ".3s"}` };

  // These props go on the fading DOM element
  const slideProps = {
    style,
    onAnimationEnd,
  };

  return { isVisible, setShow, slideProps };
};

export default useSlide;
