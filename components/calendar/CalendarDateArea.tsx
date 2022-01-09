import { useMemo } from "react";
import { IUserCalendar } from "interface";
import { secondsSinceEpoch, getDateObjFromSeconds } from "core/firestore/timestamp";
import { colors, Label, item__number, DateArea } from "./CalendarStyle";

interface CalendarDateAreaProps {
  sec: number; // ecpoch seconds 데이터
  // year: number; // 연도
  // month: number; // 월
  // date: number; // 일
  // day: number; // 요일
  calData: IUserCalendar[]; // 해당 일자의 알람 데이터
  extraDay?: boolean; // 이전달, 다음달 데이터인지 여부
}

// 00시 00분으로 초기화된 오늘 날짜
const today = new Date();
today.setHours(0, 0, 0, 0);
const todaySec = secondsSinceEpoch(today);

const CalendarDateArea = ({ sec, calData, extraDay }: CalendarDateAreaProps) => {
  // console.log('-----');
  // console.log(sec);
  const isToday = useMemo(() => todaySec === sec, [sec]);

  const { _y, _m, _d, _day } = getDateObjFromSeconds(sec);

  return (
    <DateArea day={_day} extraDay={extraDay} hasSchedule={calData.length > 0} isToday={isToday}>
      <div className={item__number}>
        {_d === 1 && `${_m}/`}
        {_d}
      </div>
      {calData.map((d, i) => (
        <Label key={d.d_time.toString()} bgColor={colors[i]} isFirst={i === 0} extraDay={extraDay}>
          {d.title}
        </Label>
      ))}
    </DateArea>
  );
};

export default CalendarDateArea;
