import useCalendar from "hooks/useCalendar";
import styled from "@emotion/styled";
import { CalendarGridWrap } from "components/calendar/CalendarStyle";

interface FormDateAreaProps {
  sec: number;
}

const FormDateArea = ({ sec }: FormDateAreaProps) => {
  const { checkExtraDay } = useCalendar();
  const extraDay = checkExtraDay(sec);
  const date = new Date(sec * 1000).getDate();

  return <DateItem extraDay={extraDay}>{date}</DateItem>;
};

const dateDiffMontly = (year, month, monthly_period) => {
  const now = new Date(year, month, 1);
  let diff = new Date(now.setMonth(now.getMonth() + monthly_period)); // 특정 month만큼 더하거나 뺌
  return diff;
};

const CalendarForm = () => {
  const { currYM, secondsFromEpoch, daysKr } = useCalendar();
  const oneMonthAgo = dateDiffMontly(currYM[0], currYM[1] - 1, -1);
  const oneMonthLater = dateDiffMontly(currYM[0], currYM[1] - 1, 1);
  console.log("oneMonthAgo: ", oneMonthAgo);
  console.log("oneMonthLater: ", oneMonthLater);

  return (
    <CalendarFormWrap>
      <CalendarFormLayer>
        <CurrDate>
          <h3>
            {currYM[0]}
            <span className="text">년 </span>
            {currYM[1]}
            <span className="text">월</span>
          </h3>
        </CurrDate>
        <CalendarGridWrap>
          {daysKr.map((dayStr) => (
            <DaysItem key={dayStr}>{dayStr}</DaysItem>
          ))}
        </CalendarGridWrap>
        <CalendarGridWrap>
          {secondsFromEpoch.map((sec) => (
            <FormDateArea key={sec} sec={sec} />
          ))}
        </CalendarGridWrap>
      </CalendarFormLayer>
    </CalendarFormWrap>
  );
};

const CalendarFormWrap = styled.div`
  position: absolute;
  width: 100%;
  z-index: 1;
  left: 0;
  top: 12rem;
  background: #fff;
  box-shadow: 0 0 4rem -2rem rgba(70, 78, 108, 0.5);
  border-radius: 2rem;
  overflow: hidden;
  padding: 1rem;
`;

const CalendarFormLayer = styled.article`
  max-width: 35rem;
  margin: auto;
  padding-bottom: 0.5rem;
`;

const DateItem = styled.div<{ extraDay: boolean }>`
  text-align: center;
  line-height: 5rem;
  height: 5rem;
  font-size: 1.65rem;
  ${({ extraDay }) => extraDay && `color: #bbb`}
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

const CurrDate = styled.div`
  padding: 1.5rem 0 1rem;
  text-align: center;
  font-size: 1.8rem;

  h3 {
    display: inline-block;
    padding-bottom: 2px;
    border-bottom: 2px solid #238cee;
  }
  .text {
    font-size: 0.9em;
  }
`;

export default CalendarForm;
