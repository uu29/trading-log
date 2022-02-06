import { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/css";
import { Timestamp } from "@firebase/firestore";
import useForm from "hooks/useForm";
import { IUserCalendar } from "interface";

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

export const initCreateScheduleForm: IUserCalendar = {
  title: "",
  alert: false,
  date: Timestamp.now(),
  content: "",
  user_email: "",
};

interface ICreateScheduleProps {
  deactivateCreate: () => void;
}

const CreateSchedule = ({ deactivateCreate }: ICreateScheduleProps) => {
  const [showPHolder, setShowPHolder] = useState(true);
  const { form, updateForm, handleChange, handleChangeCheckbox, initForm } = useForm<IUserCalendar>({
    initialForm: initCreateScheduleForm,
  });

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
      <CreateScheduleOverlay role="dialog">
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
              2022<span>년</span> 2<span>월</span> 14<span>일</span>
            </DateValue>
            <input id="date" type="text" hidden value={form.date.seconds} />
          </label>
          <TimeLabel htmlFor="time" className={label_inline}>
            <ClockIcon className={label_icon} />
            <TimeLabelText className={placeholder_color}>시간 추가</TimeLabelText>
            {/* <input id="time" type="time" value={form?.time?.seconds ?? undefined} /> */}
          </TimeLabel>
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
      </CreateScheduleOverlay>
      <Background onClick={deactivateCreate} />
    </>
  );
};

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

const TimeLabel = styled.label`
  height: 3.6rem;
`;

const TimeLabelText = styled.span`
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
  z-index: 100;
  left: 10px;
  top: 10px;
  width: 100%;
  padding: 2rem;
  max-width: 46rem;
  trasnform: traslate(-50%, -50%);
  background: #fff;
  box-shadow: 5px 5px 60px -10px rgba(66, 74, 106, 0.4);
  border-radius: 1rem;
`;

export default CreateSchedule;
