import useCalendar from "hooks/useCalendar";
import styled from "@emotion/styled";
import { CalendarGridWrap } from "components/calendar/CalendarStyle";

interface FormDateAreaProps {
  sec: number;
}

const FormDateArea = ({ sec }: FormDateAreaProps) => {
  const date = new Date(sec * 1000).getDate();
  return <DateItem>{date}</DateItem>;
};

const CalendarForm = () => {
  const { secondsFromEpoch } = useCalendar();

  return (
    <CalendarFormLayer>
      <CalendarGridWrap>
        {secondsFromEpoch.map((sec) => (
          <FormDateArea key={sec} sec={sec} />
        ))}
      </CalendarGridWrap>
    </CalendarFormLayer>
  );
};

const CalendarFormLayer = styled.article`
  position: absolute;
  z-index: 1;
  left: 0;
  top: 12rem;
  background: #fff;
  border-radius: 1rem;
  overflow: hidden;
`;

const DateItem = styled.div`
  text-align: center;
  line-height: 4rem;
  width: 4rem;
  height: 4rem;
`;

export default CalendarForm;
