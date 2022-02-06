import React, { useMemo, useState, useRef } from "react";
import { IUserCalendar } from "interface";
import { getDateObjFromSeconds, getTimestampFromSec, todaySec } from "core/firestore/timestamp";
import { colors, Label, item__number, DateCell, DateCreateBtn } from "./CalendarStyle";
import CreateSchedule from "./CreateSchedule";
import ModalPortal from "components/portal/ModalPortal";

const CreateBtn = () => {
  return (
    <DateCreateBtn type="button" title="일정 추가하려면 클릭하세요">
      스케줄 추가
    </DateCreateBtn>
  );
};

interface CalendarDateAreaProps {
  sec: number; // ecpoch seconds 데이터
  calData: IUserCalendar[]; // 해당 일자의 알람 데이터
  extraDay?: boolean; // 이전달, 다음달 데이터인지 여부
}

const CalendarDateArea = ({ sec, calData, extraDay }: CalendarDateAreaProps) => {
  const isToday = useMemo(() => todaySec() === sec, [sec]);
  const dateCellRef = useRef<HTMLDivElement>(null);
  const { _m, _d, _day } = getDateObjFromSeconds(sec);
  const [mouseOver, setMouseOver] = useState(false);
  const [activateCreate, setActivateCreate] = useState(false);
  const [pos, setPos] = useState([0, 0, 0, 0]); // top right bottom left

  const handleMouseEnter = () => {
    setMouseOver(true);
  };

  const handleMouseLeave = () => {
    setMouseOver(false);
  };

  const handleClick = () => {
    setActivateCreate(true);
    const dateCellPos = dateCellRef.current?.getBoundingClientRect();
    const top = dateCellPos?.top ?? 0;
    const right = dateCellPos?.right ?? 0;
    const bottom = dateCellPos?.bottom ?? 0;
    const left = dateCellPos?.left ?? 0;
    setPos([top, right, bottom, left]);
    const tDate = getTimestampFromSec(sec);

    const initCreateScheduleForm: IUserCalendar = {
      title: "",
      alert: false,
      date: tDate,
      content: "",
      user_email: "",
    };

    calData.unshift(initCreateScheduleForm);
  };

  const deactivateCreate = () => {
    calData.shift();
    setActivateCreate(false);
  };

  return (
    <>
      <DateCell
        ref={dateCellRef}
        day={_day}
        extraDay={extraDay}
        hasSchedule={calData.length > 0}
        isToday={isToday}
        mouseOver={mouseOver}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {mouseOver && <CreateBtn />}
        <div className={item__number}>
          {_d === 1 && `${_m}/`}
          {_d}
        </div>
        {calData.map((d, i) => (
          <Label key={d.date.toString()} bgColor={colors[i]} isFirst={i === 0} extraDay={extraDay}>
            {d.title || "(새로운 일정)"}
          </Label>
        ))}
      </DateCell>
      {activateCreate && (
        <ModalPortal>
          <CreateSchedule deactivateCreate={deactivateCreate} pos={pos} initialForm={calData[0]} />
        </ModalPortal>
      )}
    </>
  );
};

export default CalendarDateArea;
