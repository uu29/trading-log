import { useState, useEffect, useMemo } from "react";
import { cx } from "@emotion/css";
import useCalendar from "hooks/useCalendar";
import { IUserCalendar, TCalendarMap } from "interface";
import { where, Timestamp } from "@firebase/firestore";
import { fetchQueryData } from "core/firestore";
import { daysKr } from "core/firestore/timestamp";
import CalendarDateArea from "components/calendar/CalendarDateArea";
import CalendarList from "components/calendar/CalendarList";
import * as CalendarStyle from "components/calendar/CalendarStyle";
import Link from "next/link";
const { CalLayer, CalendarGridWrap, TitleArea, Title, ControlBtn, CreateLink, top__day, top__weekend } = CalendarStyle;
const calendar_collection = "user_calendar";

const Calendar = () => {
  const { currYM, firstDateSec, lastDateSec, startDateSec, endDateSec, setPrevMonth, setNextMonth, secondsFromEpoch } = useCalendar();

  const [error, setError] = useState(null);
  const [calendarMap, setCalendarMap] = useState<TCalendarMap>(new Map<number, IUserCalendar[]>());

  const getCalDate = useMemo(() => (sec: number) => calendarMap.has(sec) ? calendarMap.get(sec) : [], [calendarMap]);
  const checkExtraDay = useMemo(() => (sec: number) => sec < firstDateSec || sec > lastDateSec, [firstDateSec, lastDateSec]);

  useEffect(() => {
    const startTime = Timestamp.fromDate(new Date(startDateSec * 1000));
    const lastTime = Timestamp.fromDate(new Date(endDateSec * 1000));
    fetchQueryData<IUserCalendar>(calendar_collection, [where("d_time", ">=", startTime), where("d_time", "<=", lastTime)])
      .then((res) => {
        const map = new Map<number, IUserCalendar[]>();
        res.forEach((curr) => {
          const timestampSec = curr.date.seconds;
          if (map.has(timestampSec)) {
            map.set(timestampSec, [...map.get(timestampSec), curr]);
          } else map.set(timestampSec, [curr]);
        });
        setCalendarMap(map);
      })
      .catch((err) => setError(err));
  }, [currYM, startDateSec, endDateSec]);

  if (error) return <>데이터를 불러올 수 없습니다.</>; // error 처리 해주기

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
          <Link href="/calendar/create" passHref>
            <CreateLink type="button">일정 추가</CreateLink>
          </Link>
        </TitleArea>
        <CalendarGridWrap>
          {daysKr.map((dayStr, dayNum) =>
            dayNum === 0 || dayNum === 6 ? (
              <div key={dayStr} className={cx(top__weekend, top__day)}>
                {dayStr}
              </div>
            ) : (
              <div key={dayStr} className={top__day}>
                {dayStr}
              </div>
            )
          )}
        </CalendarGridWrap>
        <CalendarGridWrap>
          {secondsFromEpoch.map((sec) => (
            <CalendarDateArea key={sec} sec={sec} calData={getCalDate(sec)} extraDay={checkExtraDay(sec)} />
          ))}
        </CalendarGridWrap>
      </CalLayer>
      <CalendarList listMap={calendarMap} />
    </section>
  );
};

export default Calendar;
