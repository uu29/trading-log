import { useState } from "react";
import styled from "@emotion/styled";
import { Timestamp } from "@firebase/firestore";
import useForm from "hooks/useForm";
import { IUserCalendar } from "interface";

const initialForm: IUserCalendar = {
  title: "",
  alert: false,
  date: Timestamp.now(),
  content: "",
  user_email: "",
};

const CreateSchedule = () => {
  const [showPHolder, setShowPHolder] = useState(true);
  const { form, updateForm, handleChange, initForm } = useForm<IUserCalendar>({ initialForm });

  const onFocusTitle = () => {
    setShowPHolder(false);
  };

  const onBlurTitle = () => {
    setShowPHolder(true);
  };

  return (
    <CreateScheduleWrap>
      <form>
        <TitleLabel htmlFor="title">
          {!form.title && showPHolder && <TitleLabelText>일정 제목 추가</TitleLabelText>}
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
        <label htmlFor="date">
          
          <input id="date" type="date" value={form.date.seconds} />
        </label>
        <label htmlFor="time">
          시간 추가
          <input id="time" type="time" value={form?.time?.seconds ?? undefined} />
        </label>
        <label htmlFor="alret">
          알람 여부
          <input id="alret" type="checkbox" checked={form.alert} />
        </label>
        <label htmlFor="content">
          설명 추가
          <textarea id="content" value={form.content} />
        </label>
      </form>
    </CreateScheduleWrap>
  );
};

const TitleLabel = styled.label`
  position: relative;
  display: block;
  height: 3.6rem;
  padding-bottom: 4px;
  border-bottom: 3px solid #818cba;
`;

const TitleLabelText = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  font-size: 2rem;
  color: #c1c5d8;
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
