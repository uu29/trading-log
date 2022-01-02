import styled from "@emotion/styled";
import useCalendar from "hooks/useCalendar";

const Calendar = () => {
  const { prevYM, currYM, nextYM, prevLastDate, lastDate, firstDay } = useCalendar();

  return (
    <section>
      <CalLayer>
        <TitleArea>
          <ControlBtn type="button">{prevYM[1]}월</ControlBtn>
          <Title>
            {currYM[0]}
            <span>년</span> {currYM[1]}
            <span>월</span>
          </Title>
          <ControlBtn type="button" isNext>
            {nextYM[1]}월
          </ControlBtn>
          <AddBtn type="button">일정 추가</AddBtn>
        </TitleArea>
        <Grid className="days__area">
          <div>일</div>
          <div>월</div>
          <div>화</div>
          <div>수</div>
          <div>목</div>
          <div>금</div>
          <div>토</div>
        </Grid>
        <Grid>
          {Array.from({ length: firstDay }, (v, i) => prevLastDate - firstDay + i + 1).map((d) => (
            <div className="prev-month-dates" key={d}>
              {d}
            </div>
          ))}
          {Array.from({ length: lastDate }, (v, i) => i + 1).map((d) => (
            <div className="dates" key={d}>
              {d}
            </div>
          ))}
        </Grid>
      </CalLayer>
      <Monthly>
        <li>
          <strong>
            16 <span>화</span>
          </strong>
          <Daily>
            <li>
              <Time>12:00</Time>
              테슬라 실적 발표
              <AlrtBtn type="button" isAlrtOn>
                알람 켜짐
              </AlrtBtn>
            </li>
            <li>
              <Time>16:00</Time>
              닌텐도 신작 공개
              <AlrtBtn type="button">알람 꺼짐</AlrtBtn>
            </li>
          </Daily>
        </li>
        <li>
          <strong>
            25 <span>목</span>
          </strong>
          <Daily>
            <li>
              엔비디아 실적 발표
              <AlrtBtn type="button" isAlrtOn>
                알람 꺼짐
              </AlrtBtn>
            </li>
          </Daily>
        </li>
      </Monthly>
    </section>
  );
};

const AlrtBtn = styled.button<{ isAlrtOn?: boolean }>`
  margin-top: -0.4rem;
  float: right;
  text-indent: -9999px;
  ${({ isAlrtOn }) =>
    isAlrtOn
      ? `background: url(/images/ico__alrt_on.svg) no-repeat center`
      : `background: url(/images/ico__alrt_off.svg) no-repeat center`};
  width: 3.2rem;
  height: 3.2rem;
`;

const Daily = styled.ul`
  flex: 1;
  > li {
    padding-bottom: 0.8rem;
    margin-top: 1.6rem;
    border-bottom: 2px solid #e9eaef;
    &:first-of-type {
      margin-top: 0;
    }
  }
`;

const Time = styled.em`
  font-style: normal;
  color: #8f9093;
  margin-right: 0.8rem;
`;

const Monthly = styled.ul`
  > li {
    display: flex;
    margin: 1rem 0;
    padding: 1.6rem 3.2rem;
    background: #fff;
    font-size: 2rem;
    > strong {
      line-height: 1;
      font-size: 2.4rem;
      margin-right: 2rem;
      color: #48a1f3;

      > span {
        font-size: 2.2rem;
        font-weight: 400;
      }
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 0 3.2rem;
  > div {
    padding: 0.3rem 0 1rem;
    font-size: 1.8rem;
    text-align: center;
  }
  .dates {
    height: 5.6rem;
    font-size: 2rem;
  }
  .prev-month-dates {
    color: #bbb;
  }
`;

const CalLayer = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.6);
  margin: 2.4rem 3.2rem;
  border-radius: 2rem;
  > .days__area {
    margin-bottom: 1rem;
    border-bottom: 1px solid #dee0e9;
  }
`;

const TitleArea = styled.div`
  padding: 1.8rem 2.4rem 0.8rem;
  margin-bottom: 1.6rem;
  text-align: center;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  line-height: 1;
  &::after {
    content: "";
    display: block;
    clear: both;
  }
`;

const Title = styled.h2`
  display: inline-block;
  font-size: 2.4rem;
  font-weight: 600;

  > span {
    font-weight: 500;
    font-size: 2rem;
  }
`;

const AddBtn = styled.button`
  position: absolute;
  top: 1.8rem;
  right: 1.8rem;
  color: #fff;
  font-size: 1.6rem;
  height: 2.8rem;
  width: 2.8rem;
  text-indent: -9999px;
  background: url(/images/ico__plus.svg) no-repeat center;
  background-size: contain;
`;

const ControlBtn = styled.button<{ isNext?: boolean }>`
  padding-top: 2px;
  margin: 0 1.6rem;
  font-size: 1.6rem;
  color: #8f9093;
  transform: translateY(1px);

  ${({ isNext }) =>
    isNext
      ? `
  background: url(/images/ico__next.svg) no-repeat right;
  padding-right: 2.4rem;
  `
      : `
  background: url(/images/ico__prev.svg) no-repeat left;
  padding-left: 2.4rem;
  `};
`;

export default Calendar;
