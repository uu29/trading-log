import { css, keyframes } from "@emotion/react";

export const ellipsis = css`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
`;

const fade_in_out = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

export const dim_animation = css`
  animation: ${fade_in_out} 1.5s linear infinite;
`;
