import { useState, useEffect, useMemo } from "react";
import { cx } from "@emotion/css";
import useCalendar from "hooks/useCalendar";
import { IUserCalendar, TCalendarMap } from "interface";
import { where, Timestamp } from "@firebase/firestore";
import { fetchQueryData } from "core/firestore";
import { daysKr, getTimestampSecFromDate, getTimestampSecFromNumber } from "core/firestore/timestamp";
import CalendarDateArea from "components/calendar/CalendarDateArea";
import CalendarList from "components/calendar/CalendarList";
import * as CalendarStyle from "components/calendar/CalendarStyle";
import Link from "next/link";
const { CalLayer, Grid, TitleArea, Title, ControlBtn, CreateLink, top__day, top__weekend } = CalendarStyle;
const calendar_collection = "user_calendar";

const Calendar = () => {
  const { prevYM, currYM, nextYM, prevLastDate, lastDate, firstDay, lastDay, setPrevMonth, setNextMonth, getDay } = useCalendar();

  const [error, setError] = useState();
  const [calendarMap, setCalendarMap] = useState<TCalendarMap>(new Map<number, IUserCalendar[]>());
  const getCalDate = useMemo(() => (sec: number) => calendarMap.has(sec) ? calendarMap.get(sec) : [], [calendarMap]);

  useEffect(() => {
    const startTime = Timestamp.fromDate(new Date(prevYM[0], prevYM[1] - 1, prevLastDate - firstDay + 1));
    const lastTime = Timestamp.fromDate(new Date(nextYM[0], nextYM[1] - 1, 6 - lastDay));
    fetchQueryData<IUserCalendar>(calendar_collection, [where("d_time", ">=", startTime), where("d_time", "<=", lastTime)])
      .then((res) => {
        const map = new Map<number, IUserCalendar[]>();
        res.forEach((curr) => {
          const timestampSec = getTimestampSecFromDate(curr.d_time);
          if (map.has(timestampSec)) {
            map.set(timestampSec, [...map.get(timestampSec), curr]);
          } else map.set(timestampSec, [curr]);
        });
        setCalendarMap(map);
      })
      .catch((err) => setError(err));
  }, [currYM, firstDay, lastDay, nextYM, prevLastDate, prevYM]);

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
        <Grid>
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
        </Grid>
        <Grid>
          {Array.from({ length: firstDay }, (v, i) => prevLastDate - firstDay + i + 1).map((date) => (
            <CalendarDateArea
              key={date}
              year={prevYM[0]}
              month={prevYM[1]}
              date={date}
              day={getDay(prevYM[0], prevYM[1], date)}
              calData={getCalDate(getTimestampSecFromNumber(prevYM[0], prevYM[1], date))}
              extraDay
            />
          ))}
          {Array.from({ length: lastDate }, (v, i) => i + 1).map((date) => (
            <CalendarDateArea
              key={date}
              year={currYM[0]}
              month={currYM[1]}
              date={date}
              day={getDay(currYM[0], currYM[1], date)}
              calData={getCalDate(getTimestampSecFromNumber(currYM[0], currYM[1], date))}
            />
          ))}
          {Array.from({ length: 6 - lastDay }, (v, i) => i + 1).map((date) => (
            <CalendarDateArea
              key={date}
              year={nextYM[0]}
              month={nextYM[1]}
              date={date}
              day={getDay(nextYM[0], nextYM[1], date)}
              calData={getCalDate(getTimestampSecFromNumber(nextYM[0], nextYM[1], date))}
              extraDay
            />
          ))}
        </Grid>
      </CalLayer>
      <CalendarList listMap={calendarMap} />
    </section>
  );
};

export default Calendar;
