import { useState, useEffect, useMemo } from "react";
import styled from "@emotion/styled";
import { cx, css } from "@emotion/css";
import useCalendar from "hooks/useCalendar";
import { IUserCalendar, TCalendarMap } from "interface";
import { where, Timestamp } from "@firebase/firestore";
import { fetchQueryData } from "core/firestore";
import CalendarDateArea from "components/calendar/CalendarDateArea";
import * as CalendarStyle from "components/calendar/CalendarStyle";
const {
  CalLayer,
  Grid,
  DateArea,
  TitleArea,
  Title,
  Monthly,
  Daily,
  Time,
  ControlBtn,
  AddBtn,
  AlrtBtn,
  top__day,
  top__weekend,
  item__number,
  extra__day,
} = CalendarStyle;
const calendar_collection = "user_calendar";

const Calendar = () => {
  const { prevYM, currYM, nextYM, prevLastDate, lastDate, firstDay, lastDay, setPrevMonth, setNextMonth, getDay } = useCalendar();

  const [error, setError] = useState();
  const [data, setData] = useState<IUserCalendar[]>([]);
  const [calendarMap, setCalendarMap] = useState<TCalendarMap>(new Map<number, IUserCalendar[]>());
  const getCalDate = useMemo(() => (date: number) => calendarMap.has(date) ? calendarMap.get(date) : [], [calendarMap]);

  useEffect(() => {
    const startTime = Timestamp.fromDate(new Date(prevYM[0], prevYM[1] - 1, prevLastDate - firstDay + 1));
    console.log(startTime);
    const lastTime = Timestamp.fromDate(new Date(currYM[0], currYM[1] - 1, lastDate));
    fetchQueryData<IUserCalendar>(calendar_collection, [where("d_time", ">=", startTime), where("d_time", "<=", lastTime)])
      .then((res) => {
        console.log(res);
        const map = new Map<number, IUserCalendar[]>();
        res.forEach((curr) => {
          const curr_date = curr.d_time.toDate().getDate();
          if (map.has(curr_date)) {
            map.set(curr_date, [...map.get(curr_date), curr]);
          } else map.set(curr_date, [curr]);
        });
        setCalendarMap(map);
        setData(res);
      })
      .catch((err) => setError(err));
  }, [currYM, firstDay, lastDate, prevLastDate, prevYM]);

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
            <DateArea key={d} data-set-date={d} data-set-year={prevYM[0]} data-set-month={prevYM[1]} day={getDay(prevYM[0], prevYM[1], d)}>
              <div className={cx(item__number, extra__day)}>{d}</div>
            </DateArea>
          ))}
          {Array.from({ length: lastDate }, (v, i) => i + 1).map((d) => (
            <CalendarDateArea
              key={d}
              year={currYM[0]}
              month={currYM[1]}
              date={d}
              day={getDay(currYM[0], currYM[1], d)}
              calData={getCalDate(d)}
            />
          ))}
          {Array.from({ length: 6 - lastDay }, (v, i) => i + 1).map((d) => (
            <DateArea key={d} data-set-date={d} data-set-year={nextYM[0]} data-set-month={nextYM[1]} day={getDay(nextYM[0], nextYM[1], d)}>
              <div className={cx(item__number, extra__day)}>
                {d === 1 && `${nextYM[1]}/`}
                {d}
              </div>
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

export default Calendar;
