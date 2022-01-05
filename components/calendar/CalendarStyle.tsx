import styled from "@emotion/styled";
import { css } from "@emotion/css";
import { ellipsis } from "styles/StyleLib";

export const colors = ["#314BDB", "#F59A2F", "#FCF208", "#14BF58", "#4CB8F5"];

export const Label = styled.div<{ bgColor }>`
  display: inline-block;
  margin-top: 0.9rem;
  padding: 2px 3px;
  border-radius: 2px;
  line-height: 1.3;
  font-size: 1.1rem;
  background-color: ${({ bgColor }) => bgColor};
  color: #fff;
  -webkit-line-clamp: 1;
  ${ellipsis}
`;

export const item__number = css`
  margin: 0.5rem 0.8rem 0.5rem 1rem;
  float: left;
  font-size: inherit;
  line-height: 1.3;
`;

export const DateArea = styled.div<{ day?: number }>`
  margin-top: -1px;
  height: 7rem;
  font-size: 2rem;
  border-top: 1px solid #dee0e9;
  ${({ day }) => day !== undefined && day !== 0 && day !== 6 && `background: #fff;`};
`;

export const AlrtBtn = styled.button<{ isAlrtOn?: boolean }>`
  margin-top: -0.4rem;
  float: right;
  text-indent: -9999px;
  ${({ isAlrtOn }) =>
    isAlrtOn
      ? `background: url(/images/ico__alrt_on.svg) no-repeat center`
      : `background: url(/images/ico__alrt_off.svg) no-repeat center`};
  width: 3.2rem;
  height: 3.2rem;
`;

export const Daily = styled.ul`
  flex: 1;
  > li {
    padding-bottom: 0.8rem;
    margin-top: 1.6rem;
    border-bottom: 2px solid #e9eaef;
    &:first-of-type {
      margin-top: 0;
    }
  }
`;

export const Time = styled.em`
  font-style: normal;
  color: #8f9093;
  margin-right: 0.8rem;
`;

export const Monthly = styled.ul`
  > li {
    display: flex;
    margin: 1rem 0;
    padding: 1.6rem 3.2rem;
    background: #fff;
    font-size: 2rem;
    > strong {
      line-height: 1;
      font-size: 2.4rem;
      margin-right: 2rem;
      color: #48a1f3;

      > span {
        font-size: 2.2rem;
        font-weight: 400;
      }
    }
  }
`;

export const top__day = css`
  height: auto;
  padding-left: 1rem;
  padding-bottom: 0.5rem;
  font-size: 1.8rem;
  background: rgba(255, 255, 255, 0.8);
  border-top: 0 none;
  border-bottom: 2px solid #dee0e9;
`;

export const top__weekend = css`
  color: #888da1;
`;

export const extra__day = css`
  color: #bbb;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const CalLayer = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.6);
  margin: 2.4rem 3.2rem;
  overflow: hidden;
  border-radius: 2rem;
`;

export const TitleArea = styled.div`
  padding: 1.8rem 2.4rem 2rem;
  text-align: center;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  line-height: 1;
  background: rgba(255, 255, 255, 0.9);
  &::after {
    content: "";
    display: block;
    clear: both;
  }
`;

export const Title = styled.h2`
  width: 18rem;
  display: inline-block;
  font-size: 2.4rem;
  font-weight: 600;

  .text {
    font-weight: 500;
    font-size: 2rem;
  }
`;

export const AddBtn = styled.button`
  position: absolute;
  top: 1.8rem;
  right: 1.8rem;
  color: #fff;
  font-size: 1.6rem;
  height: 2.8rem;
  width: 2.8rem;
  text-indent: -9999px;
  background: url(/images/ico__plus.svg) no-repeat center;
  background-size: contain;
`;

export const ControlBtn = styled.button<{ isNext?: boolean }>`
  width: 2rem;
  height: 2.4rem;
  padding-top: 2px;
  font-size: 1.6rem;
  color: #8f9093;
  transform: translateY(1px);

  ${({ isNext }) =>
    isNext
      ? `
  background: url(/images/ico__next.svg) no-repeat right;
  padding-right: 2.4rem;
  `
      : `
  background: url(/images/ico__prev.svg) no-repeat left;
  padding-left: 2.4rem;
  `};
`;
