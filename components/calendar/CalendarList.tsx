import { useMemo } from "react";
import useCalendar from "hooks/useCalendar";
import * as CalendarStyle from "components/calendar/CalendarStyle";
import { IUserCalendar, TCalendarMap } from "interface";
import { getDateObjFromTimestamp, formatDate } from "core/firestore/timestamp";
const { MonthlyItem, MonthlyItemDate, MonthlyItemDay, Daily, Time, AlrtBtn } = CalendarStyle;

const DailyListItem = ({ title, d_time, alert }: IUserCalendar) => {
  const timeStr = useMemo(() => formatDate(d_time.toDate(), "%H:%M"), [d_time]);

  return (
    <li key={d_time.seconds}>
      <Time>{timeStr}</Time>
      {title}
      <AlrtBtn type="button" isAlrtOn={alert}>
        알람 {alert ? "켜짐" : "꺼짐"}
      </AlrtBtn>
    </li>
  );
};

interface CalendarListItemProps {
  dateList: IUserCalendar[]; // Timestamp의 seconds 데이터
}

const CalendarListItem = ({ dateList }: CalendarListItemProps) => {
  const { currYM, daysKr } = useCalendar();
  const firstDTime = dateList[0].d_time;
  const { _y, _m, _d, _day } = getDateObjFromTimestamp(firstDTime);

  if (currYM[0] !== _y || currYM[1] !== _m) return <></>; // 이번달 스케줄만 보여줌

  return (
    <MonthlyItem>
      <MonthlyItemDate>
        {_d} <MonthlyItemDay>{daysKr[_day]}</MonthlyItemDay>
      </MonthlyItemDate>
      <Daily>
        {dateList.map((data) => (
          <DailyListItem key={data.d_time.seconds} {...data} />
        ))}
      </Daily>
    </MonthlyItem>
  );
};

interface CalendarListProps {
  listMap: TCalendarMap;
}

const CalendarList = ({ listMap }: CalendarListProps) => {
  const date_list = listMap.keys();
  let keys = Array.from(date_list);

  return (
    <ul>
      {keys.map((key) => (
        <CalendarListItem key={key} dateList={listMap.get(key) ?? []} />
      ))}
    </ul>
  );
};

export default CalendarList;
