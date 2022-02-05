import { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/css";
import { Timestamp } from "@firebase/firestore";
import useForm from "hooks/useForm";
import { IUserCalendar } from "interface";

const label_block = css`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.6rem;
  height: 3.6rem;
`;

const label_icon = css`
  display: inline-block;
  margin-top: 0.7rem;
  margin-right: 1.4rem;
  width: 2rem;
  height: 2rem;
  text-indent: -9999px;
  background-size: auto 1.8rem;
`;

const placeholder_color = css`
  color: #c1c5d8;
`;

const initialForm: IUserCalendar = {
  title: "",
  alert: false,
  date: Timestamp.now(),
  content: "",
  user_email: "",
};

const CreateSchedule = () => {
  const [showPHolder, setShowPHolder] = useState(true);
  const { form, updateForm, handleChange, handleChangeCheckbox, initForm } = useForm<IUserCalendar>({ initialForm });

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
    <CreateScheduleWrap>
      <form method="post" onSubmit={handleSubmit}>
        <TitleLabel htmlFor="title" className={label_block}>
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
            2022<span>년</span> 2<span>월</span> 14<span>일</span>
          </DateValue>
          <input id="date" type="text" hidden value={form.date.seconds} />
        </label>
        <TimeAlrtArea>
          <TimeLabel htmlFor="time" className={label_block}>
            <ClockIcon className={label_icon} />
            <TimeLabelText className={placeholder_color}>시간 추가</TimeLabelText>
            {/* <input id="time" type="time" value={form?.time?.seconds ?? undefined} /> */}
          </TimeLabel>
          <BellIcon />
          <SwitchBox>
            <label htmlFor="alert">
              <input id="alert" name="alert" type="checkbox" checked={form.alert} onChange={handleChangeCheckbox} hidden />
              <AlrtController checked={form.alert} />
            </label>
          </SwitchBox>
          <AlrtText>알람 꺼짐</AlrtText>
        </TimeAlrtArea>
        <label htmlFor="content" className={label_block}>
          설명 추가
          <textarea id="content" value={form.content} />
        </label>
      </form>
    </CreateScheduleWrap>
  );
};

const SwitchBox = styled.div`
  position: relative;
  width: 5rem;
  height: 2.4rem;
  border-radius: 1.2rem;
  border: 2px solid #8c91a5;
`;

const AlrtController = styled.div<{ checked: boolean }>`
  position: absolute;
  margin: 2px;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 8rem;
  cursor: pointer;
  ${({ checked }) => (checked ? "background: #B3B6C3" : "background: #2D96F6")};
  transition: all 0.3s;
`;

const TimeAlrtArea = styled.div`
  display: flex;
`;

const TimeLabel = styled.label`
  height: 3.6rem;
`;

const TimeLabelText = styled.span`
  margin-top: 0.8rem;
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

const AlrtText = styled.span`
  color: #c1c5d8;
`;

const CalIcon = styled.span`
  background: url(/images/ico__cal.svg) no-repeat center;
`;

const ClockIcon = styled.span`
  background: url(/images/ico__clock.svg) no-repeat center;
`;

const BellIcon = styled.span`
  display: inline-block;
  margin: 0.7rem 1rem 0 1.4rem;
  width: 2rem;
  height: 2rem;
  text-indent: -9999px;
  background: url(/images/ico__bell.svg) no-repeat center;
  background-size: contain;
`;

const TitleLabel = styled.label`
  position: relative;
  margin-left: 3.4rem;
  padding-bottom: 4px;
  border-bottom: 2px solid #2d96f6;
`;

const TitleLabelText = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  font-size: 2rem;
`;

const TitleInput = styled.input`
  font-size: 2rem;
  outline: 0 none;
  border: 0 none;
`;

const CreateScheduleWrap = styled.div`
  position: absolute;
  z-index: 100;
  left: 10px;
  top: 10px;
  width: 100%;
  height: 100%;
  padding: 2rem;
  max-width: 46rem;
  max-height: 30rem;
  trasnform: traslate(-50%, -50%);
  background: #fff;
  box-shadow: 5px 5px 60px -10px rgba(66, 74, 106, 0.4);
  border-radius: 1rem;
`;

export default CreateSchedule;
