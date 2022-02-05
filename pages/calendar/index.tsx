import { useState, useEffect, useMemo } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { cx } from "@emotion/css";
import useCalendar from "hooks/useCalendar";
import { ISessionUser, IUserCalendar, TCalendarMap } from "interface";
import { where, Timestamp } from "@firebase/firestore";
import { fetchQueryData } from "core/firestore";
import CalendarDateArea from "components/calendar/CalendarDateArea";
import CalendarList from "components/calendar/CalendarList";
import * as CalendarStyle from "components/calendar/CalendarStyle";
import { toast } from "@toast-controller";
import CreateSchedule from "components/calendar/CreateSchedule";
const { CalLayer, CalendarGridWrap, TitleArea, Title, ControlBtn, top__day, top__weekend } = CalendarStyle;
const calendar_collection = "user_calendar";

interface ICalendarProps {
  session_user: ISessionUser;
}

const Calendar = ({ session_user }: ICalendarProps) => {
  const user_email = session_user?.email ?? "";
  const { currYM, startDateSec, endDateSec, setPrevMonth, setNextMonth, secondsFromEpoch, checkExtraDay, daysKr } = useCalendar();
  const [error, setError] = useState(null);
  const [calendarMap, setCalendarMap] = useState<TCalendarMap>(new Map<number, IUserCalendar[]>());
  const getCalDate = useMemo(() => (sec: number) => calendarMap.has(sec) ? calendarMap.get(sec) : [], [calendarMap]);

  useEffect(() => {
    const startTime = Timestamp.fromDate(new Date(startDateSec * 1000));
    const lastTime = Timestamp.fromDate(new Date(endDateSec * 1000));
    fetchQueryData<IUserCalendar>(calendar_collection, [
      where("date", ">=", startTime),
      where("date", "<=", lastTime),
      where("user_email", "==", user_email),
    ])
      .then((res) => {
        const map = new Map<number, IUserCalendar[]>();
        res.forEach((curr) => {
          const timestampSec = curr.date.seconds;
          if (map.has(timestampSec)) {
            map.set(timestampSec, [...(map.get(timestampSec) ?? []), curr]);
          } else map.set(timestampSec, [curr]);
        });
        setCalendarMap(map);
      })
      .catch((err) => setError(err));
  }, [currYM, startDateSec, endDateSec, user_email]);

  useEffect(() => {
    if (error) toast.show({ message: "데이터를 불러올 수 없습니다.", type: "fail" });
    console.log(error);
    () => {
      setError(null);
    };
  }, [error]);

  return (
    <section>
      <CalLayer>
        <CreateSchedule />
        <TitleArea>
          <ControlBtn type="button" onClick={setPrevMonth} />
          <Title>
            {currYM[0]}
            <span className="text">년 </span>
            {currYM[1]}
            <span className="text">월</span>
          </Title>
          <ControlBtn type="button" onClick={setNextMonth} isNext />
          {/* <Link href="/calendar/create" passHref>
            <CreateLink type="button">일정 추가</CreateLink>
          </Link> */}
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
            <CalendarDateArea key={sec} sec={sec} calData={getCalDate(sec) ?? []} extraDay={checkExtraDay(sec)} />
          ))}
        </CalendarGridWrap>
      </CalLayer>
      <CalendarList listMap={calendarMap} />
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const session_user = session?.user ?? null;
  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return { props: { session_user } };
};

export default Calendar;
