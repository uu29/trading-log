import useCalendar from "hooks/useCalendar";
import styled from "@emotion/styled";
import { CalendarGridWrap } from "components/calendar/CalendarStyle";

const CalendarForm = () => {
  const { secondsFromEpoch } = useCalendar();

  return (
    <CalendarFormLayer>
      <CalendarGridWrap>
        {secondsFromEpoch.map((sec) => (
          <div key={sec}>{new Date(sec).getDate()}</div>
        ))}
      </CalendarGridWrap>
    </CalendarFormLayer>
  );
};

const CalendarFormLayer = styled.article`
  position: absolute;
  z-index: 1;
  left: 0;
  bottom: -100%;
  background: #fff;
  border-radius: 1rem;
  overflow: hidden;
`;

export default CalendarForm;
