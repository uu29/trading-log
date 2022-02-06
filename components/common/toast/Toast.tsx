import { useEffect } from "react";
import styled from "@emotion/styled";
import useFade from "hooks/useFade";
import useSlide from "hooks/useSlide";

export const ToastTypes = {
  fail: "fail",
  success: "success",
  warning: "warning",
} as const;

export type ToastType = typeof ToastTypes[keyof typeof ToastTypes];

export interface ToastProps {
  id: string;
  message: string;
  destroy: () => void;
  type: ToastType;
  duration?: number;
}

const typesOption = {
  fail: { color: "#EE5555", src: "/images/ico__toast_fail.svg" },
  success: { color: "#4BA9FE", src: "/images/ico__toast_success.svg" },
  warning: { color: "#F59A2F", src: "/images/ico__toast_warning.svg" },
};

const Toast = ({ id, message, destroy, type, duration = 3000 }: ToastProps) => {
  const { isVisible, setShow: setShowToast, slideProps } = useSlide(true);

  // slideOut 효과 (duration 동안)
  useEffect(() => {
    if (!duration || !isVisible) return;

    const timer = setTimeout(() => {
      setShowToast(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [setShowToast, duration, isVisible]);

  // slideOut 효과 이후 destroy
  useEffect(() => {
    if (isVisible) return;
    const timer = setTimeout(() => {
      destroy();
    }, 100);

    return () => clearTimeout(timer);
  }, [destroy, isVisible]);

  const handleClose = () => {
    setShowToast(false);
  };

  const { isVisible: isCloseBtnVisible, setShow: setShowCloseBtn, fadeProps } = useFade(false);

  const handleMouseEnter = () => {
    setShowCloseBtn(true);
  };

  const handleMouseLeave = () => {
    setShowCloseBtn(false);
  };

  return (
    <>
      {isVisible && (
        <ToastLayer data-id={id} {...slideProps}>
          <ToastCont barColor={typesOption[type].color} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <TypeIcon iconSrc={typesOption[type].src} />
            {message}
            {isCloseBtnVisible && <CloseBtn type="button" onClick={handleClose} {...fadeProps} />}
          </ToastCont>
        </ToastLayer>
      )}
    </>
  );
};

const CloseBtn = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  display: block;
  width: 2rem;
  height: 2rem;
  background: url(/images/ico__close.svg) no-repeat center;
`;

const TypeIcon = styled.div<{ iconSrc: string }>`
  float: left;
  margin-right: 1rem;
  width: 2.4rem;
  height: 2.4rem;
  background: ${({ iconSrc }) => `url(${iconSrc}) no-repeat center`};
`;

const ToastCont = styled.div<{ barColor: string }>`
  position: relative;
  min-height: 4.4rem;
  padding: 1rem 1rem 1rem 1.3rem;
  color: #f3f4f5;
  line-height: 2.4rem;
  font-size: 1.5rem;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: ${({ barColor }) => barColor};
  }
`;

const ToastLayer = styled.div`
  margin-bottom: 5px;
  min-width: 28rem;
  overflow: hidden;
  border-radius: 3px;
  background: rgba(59, 62, 74, 0.9);
  transition: all 0.3s;
`;

export default Toast;
