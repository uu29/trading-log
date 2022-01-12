import { useMemo } from "react";
import { IUserCalendar } from "interface";
import { getDateObjFromSeconds, todaySec } from "core/firestore/timestamp";
import { colors, Label, item__number, DateArea } from "./CalendarStyle";

interface CalendarDateAreaProps {
  sec: number; // ecpoch seconds 데이터
  calData: IUserCalendar[]; // 해당 일자의 알람 데이터
  extraDay?: boolean; // 이전달, 다음달 데이터인지 여부
}

const CalendarDateArea = ({ sec, calData, extraDay }: CalendarDateAreaProps) => {
  const isToday = useMemo(() => todaySec() === sec, [sec]);
  const { _m, _d, _day } = getDateObjFromSeconds(sec);

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
