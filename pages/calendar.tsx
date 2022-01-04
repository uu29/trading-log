import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { cx, css } from "@emotion/css";
import useCalendar from "hooks/useCalendar";
import { UserCalendar } from "interface";
import { where, Timestamp } from "@firebase/firestore";
import { fetchQueryData } from "core/firestore";
const calendar_collection = "user_calendar";

const Calendar = () => {
  const { prevYM, currYM, nextYM, prevLastDate, lastDate, firstDay, lastDay, setPrevMonth, setNextMonth, getDay } = useCalendar();

  const [error, setError] = useState();
  const [data, setData] = useState<UserCalendar[]>([]);

  useEffect(() => {
    const startTime = Timestamp.fromDate(new Date(currYM[0], currYM[1] - 1, 1));
    const lastTime = Timestamp.fromDate(new Date(currYM[0], currYM[1] - 1, lastDate));
    fetchQueryData<UserCalendar>(calendar_collection, [where("d_time", ">=", startTime), where("d_time", "<=", lastTime)])
      .then((res) => setData(res))
      .catch((err) => setError(err));
  }, [currYM, lastDate]);

  return (
    <section>
      <CalLayer>
        <TitleArea>
          <ControlBtn type="button" onClick={setPrevMonth} />
          <Title>
            {currYM[0]}
            <span className="text">년 </span>
            {currYM[1]}
            <span className="text">월</span>
          </Title>
          <ControlBtn type="button" onClick={setNextMonth} isNext />
          <AddBtn type="button">일정 추가</AddBtn>
        </TitleArea>
        <Grid>
          <DateArea className={cx(top__weekend, top__day)}>일</DateArea>
          <DateArea className={top__day}>월</DateArea>
          <DateArea className={top__day}>화</DateArea>
          <DateArea className={top__day}>수</DateArea>
          <DateArea className={top__day}>목</DateArea>
          <DateArea className={top__day}>금</DateArea>
          <DateArea className={cx(top__weekend, top__day)}>토</DateArea>
        </Grid>
        <Grid>
          {Array.from({ length: firstDay }, (v, i) => prevLastDate - firstDay + i + 1).map((d, idx) => (
            <DateArea
              className={extra__day}
              key={d}
              data-set-date={d}
              data-set-year={prevYM[0]}
              data-set-month={prevYM[1]}
              day={getDay(prevYM[0], prevYM[1], d)}
            >
              {d}
            </DateArea>
          ))}
          {Array.from({ length: lastDate }, (v, i) => i + 1).map((d, idx) => (
            <DateArea key={d} data-set-date={d} data-set-year={currYM[0]} data-set-month={currYM[1]} day={getDay(currYM[0], currYM[1], d)}>
              {d === 1 && `${currYM[1]}/`}
              {d}
            </DateArea>
          ))}
          {Array.from({ length: 6 - lastDay }, (v, i) => i + 1).map((d) => (
            <DateArea
              className={extra__day}
              key={d}
              data-set-date={d}
              data-set-year={nextYM[0]}
              data-set-month={nextYM[1]}
              day={getDay(nextYM[0], nextYM[1], d)}
            >
              {d === 1 && `${nextYM[1]}/`}
              {d}
            </DateArea>
          ))}
        </Grid>
      </CalLayer>
      <Monthly>
        <li>
          <strong>
            16 <span>화</span>
          </strong>
          <Daily>
            <li>
              <Time>12:00</Time>
              테슬라 실적 발표
              <AlrtBtn type="button" isAlrtOn>
                알람 켜짐
              </AlrtBtn>
            </li>
            <li>
              <Time>16:00</Time>
              닌텐도 신작 공개
              <AlrtBtn type="button">알람 꺼짐</AlrtBtn>
            </li>
          </Daily>
        </li>
        <li>
          <strong>
            25 <span>목</span>
          </strong>
          <Daily>
            <li>
              엔비디아 실적 발표
              <AlrtBtn type="button" isAlrtOn>
                알람 꺼짐
              </AlrtBtn>
            </li>
          </Daily>
        </li>
      </Monthly>
    </section>
  );
};

const AlrtBtn = styled.button<{ isAlrtOn?: boolean }>`
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

const Daily = styled.ul`
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

const Time = styled.em`
  font-style: normal;
  color: #8f9093;
  margin-right: 0.8rem;
`;

const Monthly = styled.ul`
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

const top__day = css`
  height: auto;
  padding-bottom: 0.5rem;
  font-size: 1.8rem;
  background: rgba(255, 255, 255, 0.8);
  border-top: 0 none;
  border-bottom: 2px solid #dee0e9;
`;

const top__weekend = css`
  color: #888da1;
`;

const extra__day = css`
  color: #bbb;
`;

const DateArea = styled.div<{ day?: number }>`
  margin-top: -1px;
  padding: 0.8rem 1.2rem 1rem;
  height: 7rem;
  font-size: 2rem;
  border-top: 1px solid #dee0e9;
  ${({ day }) => day !== undefined && day !== 0 && day !== 6 && `background: #fff;`};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: right;
`;

const CalLayer = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.6);
  margin: 2.4rem 3.2rem;
  overflow: hidden;
  border-radius: 2rem;
`;

const TitleArea = styled.div`
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

const Title = styled.h2`
  width: 18rem;
  display: inline-block;
  font-size: 2.4rem;
  font-weight: 600;

  .text {
    font-weight: 500;
    font-size: 2rem;
  }
`;

const AddBtn = styled.button`
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

const ControlBtn = styled.button<{ isNext?: boolean }>`
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

export default Calendar;
