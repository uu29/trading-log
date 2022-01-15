import styled from "@emotion/styled";
import LoadingSpinner from "./LoadingSpinner";
import useFade from "hooks/useFade";

interface LoadingOverlayProps {
  msg: string;
}

const LoadingOverlay = ({ msg }: LoadingOverlayProps) => {
  const { fadeProps } = useFade(true);

  return (
    <LoadingOverlayWrap {...fadeProps}>
      <LoadingSpinnerWrap>
        <LoadingSpinner delay={2} />
      </LoadingSpinnerWrap>
      <LoadingMsg>{msg}</LoadingMsg>
    </LoadingOverlayWrap>
  );
};

const LoadingMsg = styled.div`
  font-size: 1.4rem;
  color: #757575;
`;

const LoadingSpinnerWrap = styled.div`
  position: relative;
  margin-bottom: 3rem;
`;

const LoadingOverlayWrap = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  left: 0;
  top: -9.4rem;
  width: 100%;
  height: 100vh;
  background: rgba(255, 255, 255, 0.7);
`;

export default LoadingOverlay;
