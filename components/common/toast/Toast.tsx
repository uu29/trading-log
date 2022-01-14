import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useFade from "hooks/useFade";
import { keyframes } from "@emotion/css";

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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!duration) return;

    setTimeout(() => {
      setIsOpen(true);
    }, 10);

    const unsetOpenTimer = setTimeout(() => {
      setIsOpen(false);
    }, duration);

    return () => clearTimeout(unsetOpenTimer);
  }, [destroy, duration]);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) return;
    const closeTimer = setTimeout(() => {
      destroy();
    }, 100);
    return () => clearTimeout(closeTimer);
  }, [isOpen, destroy]);

  const { isVisible, setShow, fadeProps } = useFade(false);

  const handleMouseEnter = () => {
    setShow(true);
  };

  const handleMouseLeave = () => {
    setShow(false);
  };

  return (
    <>
      {isOpen && (
        <ToastLayer data-id={id} isOpen={isOpen}>
          <ToastCont barColor={typesOption[type].color} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <TypeIcon iconSrc={typesOption[type].src} />
            {message}
            {isVisible && <CloseBtn type="button" onClick={handleClose} {...fadeProps} />}
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
  background: url(/images/ico__toast_close.svg) no-repeat center;
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

const slideIn = keyframes`
  0% { opacity: 0; transform: translateX(50%) translateZ(-20px); }
  100% { opacity: 1; transform: translateX(0) translateZ(20px); }
`;

const slideOut = keyframes`
  0% { opacity: 1; transform: translateX(0) translateZ(20px); }
  100% { opacity: 0; transform: translateX(50%) translateZ(-20px); }
`;

const ToastLayer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 11rem;
  right: 3rem;
  min-width: 28rem;
  overflow: hidden;
  border-radius: 3px;
  background: rgba(59, 62, 74, 0.9);
  animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.3s;
`;

export default Toast;
