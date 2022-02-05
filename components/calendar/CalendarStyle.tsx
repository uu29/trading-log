import styled from "@emotion/styled";
import { css } from "@emotion/css";
import { ellipsis } from "styles/StyleLib";

export const colors = ["#314BDB", "#F59A2F", "#FCF208", "#14BF58", "#4CB8F5"];

export const Label = styled.div<{ bgColor: string; isFirst: boolean; extraDay?: boolean }>`
  float: right;
  margin-bottom: 2px;
  padding: 2px 4px;
  border-radius: 2px;
  line-height: 1.3;
  font-size: 1.1rem;
  background-color: ${({ bgColor }) => bgColor};
  color: #fff;
  -webkit-line-clamp: 1;
  ${ellipsis};
  ${({ extraDay }) => extraDay && "background-color: rgba(163, 166, 181, .45);"}
  ${({ isFirst }) => isFirst && "max-width: 80%;"}
`;

export const item__number = css`
  margin: 0 4px 2px 2px;
  float: left;
  font-size: inherit;
  line-height: 1;
  color: inherit;
`;

const todayCell = `
  position: relative;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    // border: 2px solid #656772;
    box-shadow: inset 0 0 0 2px #656772;
  }
`;

export const DateArea = styled.div<{ mouseOver: boolean; day?: number; extraDay?: boolean; hasSchedule?: boolean; isToday?: boolean }>`
  position: relative;
  height: 7rem;
  font-size: 2rem;
  border-bottom: 1px solid #dee0e9;
  padding: 4px;
  ${({ isToday }) => isToday && todayCell};
  ${({ day }) => day !== undefined && day !== 0 && day !== 6 && `background: #fff;`};
  ${({ extraDay }) => extraDay && "color: #bbb;"}
  ${({ hasSchedule, extraDay }) => !extraDay && hasSchedule && "color: #1780e1;"};
  ${({ mouseOver }) => mouseOver && "color: #818CBA"};
`;

export const DateCreateBtn = styled.button`
  position: absolute;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  text-indent: -9999px;
  background: url(/images/ico__plus.svg) no-repeat center;
  background-color: rgba(110, 138, 164, 0.05);
  background-size: 2.8rem;
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
    &:last-of-type {
      border-bottom: 0 none;
      padding-bottom: 0;
    }
  }
`;

export const Time = styled.em`
  font-style: normal;
  color: #8f9093;
  margin-right: 0.8rem;
`;

export const MonthlyItem = styled.li`
  display: flex;
  margin: 1rem 0;
  padding: 1.6rem 3.2rem;
  background: #fff;
  font-size: 2rem;
`;

export const MonthlyItemDate = styled.h3`
  line-height: 1;
  font-size: 2.4rem;
  margin-right: 2rem;
  color: #48a1f3;
  font-weight: 500;
`;

export const MonthlyItemDay = styled.span`
  font-size: 2.2rem;
  font-weight: 400;
`;

export const top__day = css`
  height: auto;
  padding-left: 1rem;
  padding-bottom: 0.5rem;
  font-size: 1.8rem;
  background: rgba(255, 255, 255, 0.8);
  border-bottom: 2px solid #dee0e9;
`;

export const top__weekend = css`
  color: #888da1;
`;

export const extra__day = css`
  color: #bbb;
`;

export const CalendarGridWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-radius: 2rem;
`;

export const CalLayer = styled.div`
  position: relative;
  margin: 2.4rem 3.2rem;
  padding-bottom: 2rem;
  overflow: hidden;
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.6);
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2rem;
    background: #fff;
  }
`;

export const TitleArea = styled.div`
  padding: 1.8rem 2.4rem 2rem;
  text-align: center;
  display: flex;
  align-items: center;
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

export const CreateLink = styled.a`
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
  width: 3rem;
  height: 3rem;
  font-size: 1.6rem;
  color: #8f9093;
  transform: translateY(1px);
  text-indent: -9999px;
  border-radius: 50%;

  ${({ isNext }) =>
    isNext
      ? `
  background: url(/images/ico__next.svg) no-repeat center;
  `
      : `
  background: url(/images/ico__prev.svg) no-repeat center;
  `};

  &:hover {
    background-color: #f1f1f1;
  }
  transition: background-color 0.3s;
`;
