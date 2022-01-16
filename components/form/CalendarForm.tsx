import { useCallback, useMemo, useEffect } from "react";
import useCalendar from "hooks/useCalendar";
import styled from "@emotion/styled";
import { getDateObjFromSeconds, todaySec } from "core/firestore/timestamp";
import { CalendarGridWrap, ControlBtn } from "components/calendar/CalendarStyle";

interface FormDateAreaProps {
  sec: number;
  extraDay: boolean;
  seletedDateSec: number;
  handleClickDateItem: (sec: number) => void;
}

const FormDateArea = ({ sec, extraDay, seletedDateSec, handleClickDateItem }: FormDateAreaProps) => {
  const isToday = useMemo(() => todaySec() === sec, [sec]);

  const { _day } = getDateObjFromSeconds(sec);
  const date = new Date(sec * 1000).getDate();

  return (
    <DateItem
      extraDay={extraDay}
      isToday={isToday}
      isSelected={sec === seletedDateSec}
      isWeekend={_day === 0 || _day === 6}
      onClick={() => handleClickDateItem(sec)}
    >
      {date}
    </DateItem>
  );
};

interface CalendarFormProps {
  changeDateCb: (sec: number) => void;
}

const CalendarForm = ({ changeDateCb }: CalendarFormProps) => {
  const { currYM, secondsFromEpoch, daysKr, setPrevMonth, setNextMonth, checkExtraDay, seletedDateSec, setSeletedDateSec } = useCalendar();

  const handleClickDateItem = useCallback(
    (sec: number) => {
      setSeletedDateSec(sec);
    },
    [setSeletedDateSec]
  );

  useEffect(() => {
    changeDateCb(seletedDateSec);
  }, [seletedDateSec, changeDateCb]);

  return (
    <CalendarFormWrap>
      <CalendarFormLayer>
        <CurrDateArea>
          <ControlBtn type="button" onClick={setPrevMonth}>
            이전
          </ControlBtn>
          <h3>
            {currYM[0]}
            <span className="text">년 </span>
            {currYM[1]}
            <span className="text">월</span>
          </h3>
          <ControlBtn type="button" isNext onClick={setNextMonth}>
            다음
          </ControlBtn>
        </CurrDateArea>
        <CalendarGridWrap>
          {daysKr.map((dayStr) => (
            <DaysItem key={dayStr}>{dayStr}</DaysItem>
          ))}
        </CalendarGridWrap>
        <CalendarGridWrap>
          {secondsFromEpoch.map((sec) => (
            <FormDateArea
              key={sec}
              sec={sec}
              extraDay={checkExtraDay(sec)}
              seletedDateSec={seletedDateSec}
              handleClickDateItem={handleClickDateItem}
            />
          ))}
        </CalendarGridWrap>
      </CalendarFormLayer>
    </CalendarFormWrap>
  );
};

const CalendarFormWrap = styled.div`
  position: absolute;
  width: 100%;
  z-index: 100;
  left: 0;
  top: 12rem;
  background: #fff;
  box-shadow: 0 0 4rem -2rem rgba(70, 78, 108, 0.5);
  border-radius: 2rem;
  overflow: hidden;
  padding: 1rem;
`;

const CalendarFormLayer = styled.article`
  max-width: 37rem;
  margin: auto;
  padding-bottom: 0.5rem;
`;

const DateItem = styled.div<{ extraDay: boolean; isToday: boolean; isSelected: boolean; isWeekend: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.2rem;
  width: 4.8rem;
  height: 4.8rem;
  overflow: hidden;
  border-radius: 50%;
  font-size: 1.65rem;
  text-align: center;
  ${({ isWeekend }) => isWeekend && "color: #8F9093;"};
  ${({ extraDay }) => extraDay && "color: #ddd;"};
  ${({ isToday }) => isToday && "background: #E9EAEF; color: #000;"};
  ${({ isSelected }) => isSelected && "background: #2D96F6; color: #fff;"};
  cursor: pointer;
  &:hover {
    background: #e9eaef;
    ${({ isSelected }) => isSelected && `background: #238CEE;`}
  }
`;

const DaysItem = styled.div`
  height: 3.6rem;
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
  border-bottom: 1px solid #eaeaea;
  color: #6a6b70;
  text-align: center;
  line-height: 3.6rem;
`;

const CurrDateArea = styled.div`
  padding: 1.5rem 0 1rem;
  text-align: center;
  font-size: 1.8rem;

  h3 {
    margin: 0 2rem;
    display: inline-block;
    padding-bottom: 2px;
    border-bottom: 2px solid #238cee;
  }
  .text {
    font-size: 0.9em;
  }
`;

export default CalendarForm;
