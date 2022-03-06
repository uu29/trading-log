import { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/css";
import useForm from "hooks/useForm";
import { IUserCalendar } from "interface";
import {
  formatDate,
  getDateObjFromTimestamp,
  getTimeRageByMilliSeconds,
  secondsSinceEpoch,
  oneDayMilliSeconds,
} from "core/firestore/timestamp";

const label_block = css`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  height: 3.6rem;
`;

const label_inline = css`
  display: inline-flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const label_icon = css`
  display: inline-block;
  margin-right: 1.4rem;
  width: 2rem;
  height: 2rem;
  text-indent: -9999px;
  background-size: auto 1.8rem;
`;

const placeholder_color = css`
  color: #c1c5d8;
`;

interface ICreateScheduleProps {
  deactivateCreate: () => void;
  pos: number[];
  initialForm: IUserCalendar;
}

const CreateSchedule = ({ deactivateCreate, pos, initialForm }: ICreateScheduleProps) => {
  const [top, right, bottom, left] = pos;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  let posStyle = {};
  // 우측 정렬
  if (windowWidth - left > windowWidth / 2)
    posStyle = {
      left: right,
    };
  // 좌측 정렬
  else
    posStyle = {
      right: windowWidth - left,
    };
  // 상단 정렬
  if (windowHeight - top > windowHeight / 2)
    posStyle = {
      ...posStyle,
      top: top,
    };
  // 하단 정렬
  else
    posStyle = {
      ...posStyle,
      bottom: windowHeight - bottom,
    };

  const [showPHolder, setShowPHolder] = useState(true);
  const [inputTime, setInputTime] = useState<string | null>(null);
  const [timeOptions, setTimeOptions] = useState<number[]>([]);
  const { form, updateForm, handleChange, handleChangeCheckbox, initForm } = useForm<IUserCalendar>({
    initialForm,
  });
  const { _y, _m, _d } = getDateObjFromTimestamp(form.date);

  const handleClickActivateTime = () => {
    // 현재보다 +1시간 미래 시간으로
    const now = new Date();
    const now_hours = now.getHours();
    const now_minutes = now.getMinutes();
    const next_hours = now_minutes > 0 ? now_hours + 1 : now_hours;
    now.setHours(next_hours);
    now.setMinutes(0);
    now.setSeconds(0);
    const timeText = formatDate(now, "%H:%M");
    setInputTime(timeText);
    // 30분 간격으로 시간 배열 리턴
    const nowMs = secondsSinceEpoch(now);
    const halfHourMs = 1800;
    const time_options = getTimeRageByMilliSeconds(nowMs, nowMs + oneDayMilliSeconds - 1, halfHourMs);
    setTimeOptions(time_options);
  };

  const onFocusTitle = () => {
    setShowPHolder(false);
  };

  const onBlurTitle = () => {
    setShowPHolder(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <CreateScheduleOverlay role="dialog" style={posStyle}>
        <CreateScheduleContainer>
          <Ticks />
          <CloseBtn type="button" onClick={deactivateCreate}>
            닫기
          </CloseBtn>
          <form method="post" onSubmit={handleSubmit}>
            <TitleLabel htmlFor="title">
              {!form.title && showPHolder && <TitleLabelText className={placeholder_color}>일정 제목 추가</TitleLabelText>}
              <TitleInput
                onFocus={onFocusTitle}
                onBlur={onBlurTitle}
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
              />
            </TitleLabel>
            <label htmlFor="date" className={label_block}>
              <CalIcon className={label_icon}>날짜 선택</CalIcon>
              <DateValue type="button">
                {_y}
                <span>년&nbsp;</span>
                {_m + 1}
                <span>월&nbsp;</span>
                {_d}
                <span>일</span>
              </DateValue>
              <input id="date" type="text" hidden value={form.date.seconds} />
            </label>
            <label htmlFor="time" className={label_inline}>
              <ClockIcon className={label_icon} />
              <TimeController onClick={handleClickActivateTime} isActive={Boolean(inputTime)}>
                {inputTime ? (
                  <>
                    <TimeInput id="time" type="text" value={inputTime} />
                    <TimeSelect>
                      <ul>
                        {timeOptions.map((sec) => (
                          <TimeSelectItem key={sec}>{formatDate(new Date(sec * 1000), "%H:%M")}</TimeSelectItem>
                        ))}
                      </ul>
                    </TimeSelect>
                  </>
                ) : (
                  "시간 추가"
                )}
              </TimeController>
              <input id="time" type="text" value={form?.time?.seconds} hidden />
            </label>
            <div className={label_inline}>
              <BellIcon />
              <label htmlFor="alert">
                <SwitchBox>
                  <input id="alert" name="alert" type="checkbox" checked={form.alert} onChange={handleChangeCheckbox} hidden />
                  <AlrtController isChecked={form.alert} />
                </SwitchBox>
              </label>
              <AlrtText isChecked={form.alert}>{form.alert ? "알람 켜짐" : "알람 꺼짐"}</AlrtText>
            </div>
            <ContentArea>
              <EditIcon>설명 추가</EditIcon>
              <ContentText id="content" name="content" value={form.content} rows={4} cols={42} onChange={handleChange} />
            </ContentArea>
          </form>
        </CreateScheduleContainer>
      </CreateScheduleOverlay>
      <Background onClick={deactivateCreate} />
    </>
  );
};

const CreateScheduleContainer = styled.div`
  position: relative;
  padding: 3.5rem 2rem 2rem 2rem;
`;

const Ticks = styled.div`
  position: absolute;
  top: 3rem;
  left: -3rem;
  width: 0;
  height: 0;
  border-right: 2.5rem solid transparent;
  border-left: 2.5rem solid transparent;
  border-bottom: 4rem solid #fff;
  transform: rotate(-90deg);
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  display: block;
  margin: 8px 13px;
  text-indent: -9999px;
  height: 2.6rem;
  width: 2.6rem;
  background: url(/images/ico__close.svg) no-repeat center;
  background-size: 2.4rem;
  border-radius: 2rem;
  &:hover {
    background-color: #f1f2f3;
  }
`;

const Background = styled.div`
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ContentArea = styled.div`
  display: flex;
  align-items: flex-start;
`;

const ContentText = styled.textarea`
  padding: 0.6rem 0.8rem;
  border: 0 none;
  outline: 0 none;
  resize: none;
  font-size: 1.6rem;
  line-height: 1.4;
  background: #f6f7f9;
`;

const SwitchBox = styled.span`
  display: block;
  position: relative;
  width: 4.4rem;
  height: 2.4rem;
  border-radius: 1.2rem;
  border: 2px solid #8c91a5;
  cursor: pointer;
`;

const AlrtController = styled.div<{ isChecked: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  margin: 2px;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 8rem;
  ${({ isChecked }) => (isChecked ? "background: #2D96F6; transform: translateX(2rem);" : "background: #B3B6C3;")};
  transition: all 0.3s;
`;

const AlrtText = styled.span<{ isChecked: boolean }>`
  margin-left: 1rem;
  color: ${({ isChecked }) => (isChecked ? "#54555c" : "#c1c5d8")};
  transition: all 0.3s;
`;

const TimeController = styled.div<{ isActive: boolean }>`
  position: relative;
  width: 9.4rem;
  height: 3.6rem;
  line-height: 1;
  padding: 0.9rem;
  transition: all 0.3s;
  border-radius: 2px;
  color: #c1c5d8;

  ${({ isActive }) =>
    isActive
      ? `
    background: #f1f3f4;
    color: #3b3e4a;
  `
      : `
    cursor: pointer;
    &:hover {
      background: #f6f7f9;
    }
  `}
`;

const TimeSelect = styled.div`
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  max-height: 22rem;
  margin-top: 4px;
  background: #fff;
  box-shadow: 0 4px 8px 0 rgba(66, 74, 106, 0.35);
  overflow: auto;
  padding: 4px 0;

  ::-webkit-scrollbar {
    width: 0.9rem;
  } /* 스크롤 바 */

  ::-webkit-scrollbar-track {
    background-color: #f3f2f2;
  } /* 스크롤 바 밑의 배경 */

  ::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 10px;
    cursor: pointer;
  } /* 실질적 스크롤 바 */

  ::-webkit-scrollbar-thumb:hover {
    background: #afafaf;
  } /* 실질적 스크롤 바 위에 마우스를 올려다 둘 때 */

  ::-webkit-scrollbar-thumb:active {
    background: #818185;
  } /* 실질적 스크롤 바를 클릭할 때 */

  ::-webkit-scrollbar-button {
    display: none;
  } /* 스크롤 바 상 하단 버튼 */
`;

const TimeSelectItem = styled.li`
  padding: 0.9rem 1.4rem;
  cursor: pointer;
  &:hover {
    background: #ebedf3;
  }
`;

const TimeInput = styled.input`
  display: inline-block;
  width: 100%;
  background: transparent;
  border: 0 none;
  outline: 0 none;
  font-size: 1.7rem;
`;

const DateValue = styled.button`
  display: inline-block;
  padding: 0.9rem 1.4rem;
  height: 3.6rem;
  color: #2d96f6;
  font-size: 1.7rem;
  background: #f5f9fd;
  line-height: 1;
  border-radius: 0.8rem;

  > span {
    font-size: 1.6rem;
  }
`;

const EditIcon = styled.span`
  display: block;
  width: 2.3rem;
  height: 2.5rem;
  margin-right: 1rem;
  margin-left: 3px;
  text-indent: -9999px;
  background: url(/images/ico__edit.svg) no-repeat center;
  background-size: contain;
`;

const CalIcon = styled.span`
  background: url(/images/ico__cal.svg) no-repeat center;
`;

const ClockIcon = styled.span`
  background: url(/images/ico__clock.svg) no-repeat center;
`;

const BellIcon = styled.span`
  display: inline-block;
  margin: 0 1rem 0 2rem;
  width: 2rem;
  height: 2rem;
  text-indent: -9999px;
  background: url(/images/ico__bell.svg) no-repeat center;
  background-size: contain;
`;

const TitleLabel = styled.label`
  position: relative;
  display: block;
  margin-left: 3.4rem;
  margin-bottom: 1.6rem;
  padding-bottom: 6px;
  border-bottom: 2px solid #2d96f6;
`;

const TitleLabelText = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  font-size: 1.8rem;
`;

const TitleInput = styled.input`
  font-size: 1.8rem;
  outline: 0 none;
  border: 0 none;
`;

const CreateScheduleOverlay = styled.div`
  position: fixed;
  margin: -3.5rem 2rem;
  z-index: 100;
  width: 100%;
  max-width: 46rem;
  background: #fff;
  box-shadow: 0 0 60px -10px rgba(66, 74, 106, 0.6);
  border-radius: 1rem;
`;

export default CreateSchedule;
