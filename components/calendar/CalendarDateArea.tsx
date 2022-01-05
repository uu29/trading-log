import { IUserCalendar } from "interface";
import { colors, Label, item__number, DateArea } from "./CalendarStyle";
import { Timestamp } from "firebase/firestore";

interface CalendarDateAreaProps {
  year: number; // 연도
  month: number; // 월
  date: number; // 일
  day: number; // 요일
  calData: IUserCalendar[]; // 해당 일자의 알람 데이터
  extraDay?: boolean; // 이전달, 다음달 데이터인지 여부
}

const CalendarDateArea = ({ year, month, date, day, calData, extraDay }: CalendarDateAreaProps) => {
  return (
    <DateArea data-set-date={date} data-set-year={year} data-set-month={month} day={day} extraDay={extraDay}>
      <div className={item__number}>
        {date === 1 && `${month}/`}
        {date}
      </div>
      {calData.map((d, i) => (
        <Label key={d.d_time.toString()} bgColor={colors[i]} extraDay={extraDay}>
          {d.title}
        </Label>
      ))}
    </DateArea>
  );
};

export default CalendarDateArea;
