import { useEffect, useState } from "react";
import { keyframes } from "@emotion/css";

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

const useFade = (initial: boolean, delay?: string) => {
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

  const style = { animation: `${show ? fadeIn : fadeOut} ${delay ? delay : ".3s"}` };

  // These props go on the fading DOM element
  const fadeProps = {
    style,
    onAnimationEnd,
  };

  return { isVisible, setShow, fadeProps };
};

export default useFade;
