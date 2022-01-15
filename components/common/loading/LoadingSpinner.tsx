import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  delay?: number;
}

export default function LoadingSpinner({ size = 0.5, color, delay }: LoadingSpinnerProps) {
  return (
    <PositionWrap>
      <Spinner size={size} color={color} delay={delay}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Spinner>
    </PositionWrap>
  );
}

const PositionWrap = styled.div`
  z-index: 2;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
`;

const ldsRing = keyframes`
  0% {
  opacity: 1;
    }
  100% {
    opacity: 0;
  }
`;

const Spinner = styled.div<{ size: number; color?: string; delay?: number }>`
  display: inline-block;
  position: relative;
  width: inherit;
  height: inherit;
  ${({ size }) => `transform: scale(${size});`}
  transform-origin: top left;

  div {
    transform-origin: 30px 30px;
    animation: ${ldsRing} ${({ delay }) => (delay ? `${delay}s` : "1.2s")} linear infinite;
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 3px;
      left: 37px;
      width: 8px;
      height: 8px;
      border-radius: 8px;
      background: ${({ color }) => (color ? color : "#707070")};
    }
    &:nth-of-type(1) {
      transform: rotate(0deg);
      animation-delay: ${({ delay }) => (delay ? `${1 / 4 - delay}s` : "-1.1s")};
    }
    &:nth-of-type(2) {
      transform: rotate(45deg);
      animation-delay: ${({ delay }) => (delay ? `${2 / 4 - delay}s` : "-1s")};
    }
    &:nth-of-type(3) {
      transform: rotate(90deg);
      animation-delay: ${({ delay }) => (delay ? `${3 / 4 - delay}s` : "-0.9s")};
    }

    &:nth-of-type(4) {
      transform: rotate(135deg);
      animation-delay: ${({ delay }) => (delay ? `${4 / 4 - delay}s` : "-0.8s")};
    }

    &:nth-of-type(5) {
      transform: rotate(180deg);
      animation-delay: ${({ delay }) => (delay ? `${5 / 4 - delay}s` : "-0.7s")};
    }
    &:nth-of-type(6) {
      transform: rotate(225deg);
      animation-delay: ${({ delay }) => (delay ? `${6 / 4 - delay}s` : "-0.6s")};
    }
    &:nth-of-type(7) {
      transform: rotate(270deg);
      animation-delay: ${({ delay }) => (delay ? `${7 / 4 - delay}s` : "-0.5s")};
    }
    &:nth-of-type(8) {
      transform: rotate(315deg);
      animation-delay: ${({ delay }) => (delay ? `${8 / 4 - delay}s` : "-0.4s")};
    }
  }
`;
