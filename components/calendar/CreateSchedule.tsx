import { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/css";
import useForm from "hooks/useForm";
import { IUserCalendar } from "interface";
import TimeController from "./TimeController";
import { getDateObjFromTimestamp } from "core/firestore/timestamp";
import { Timestamp } from "@firebase/firestore";
import { useSession } from "next-auth/react";
import { setDocData } from "core/firestore";
import { toast } from "@toast-controller";
const COL_NAME = "user_calendar";

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
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [top, right, bottom, left] = pos;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  let layerPosStyle = {};
  let tickPosStyle = {};
  // 우측 정렬
  if (windowWidth - left > windowWidth / 2) {
    layerPosStyle = {
      left: right,
    };
    tickPosStyle = {
      left: "-3rem",
      transform: "rotate(-90deg)",
    };
  }
  // 좌측 정렬
  else {
    layerPosStyle = {
      right: windowWidth - left,
    };
    tickPosStyle = {
      right: "-3rem",
      transform: "rotate(90deg)",
    };
  }
  // 상단 정렬
  if (windowHeight - top > windowHeight / 2) {
    layerPosStyle = {
      ...layerPosStyle,
      top: top,
    };
    tickPosStyle = {
      ...tickPosStyle,
      top: "5rem",
    };
  }
  // 하단 정렬
  else {
    layerPosStyle = {
      ...layerPosStyle,
      bottom: windowHeight - bottom,
    };
    tickPosStyle = {
      ...tickPosStyle,
      bottom: "5rem",
    };
  }

  const [showPHolder, setShowPHolder] = useState(true);
  const { form, updateForm, handleChange, handleChangeCheckbox, initForm } = useForm<IUserCalendar>({
    initialForm,
  });
  const { _y, _m, _d } = getDateObjFromTimestamp(form.date);

  const onFocusTitle = () => {
    setShowPHolder(false);
  };

  const onBlurTitle = () => {
    setShowPHolder(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    if (!session?.user?.email) return;
    setSubmitting(true);
    const newForm: IUserCalendar = { ...form, user_email: session.user.email };
    const unique_key = form.title + form.date + form.time;
    setDocData<IUserCalendar>(COL_NAME, unique_key, newForm)
      .then(() => {
        toast.show({ message: "등록되었습니다.", type: "success" });
        initForm();
        deactivateCreate();
      })
      .catch(() => {
        toast.show({ message: "등록 실패. 다시 시도해주세요.", type: "fail" });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const selectTimeCb = (time: Timestamp) => {
    updateForm({ time });
  };

  return (
    <>
      <CreateScheduleLayer role="dialog" style={layerPosStyle}>
        <CreateScheduleContainer>
          <Ticks style={tickPosStyle} />
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
              <input id="date" name="date" type="text" hidden value={form.date.seconds} readOnly />
              <input id="user_email" name="user_email" type="text" hidden value={session?.user?.email ?? ""} readOnly />
            </label>
            <label htmlFor="time" className={label_inline}>
              <ClockIcon className={label_icon} />
              <TimeController selectedDate={form.date} onChangeCallback={selectTimeCb} />
              <input id="time" name="time" type="text" value={form?.time?.seconds} hidden />
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
            <SubmitBtn>저장</SubmitBtn>
          </form>
        </CreateScheduleContainer>
      </CreateScheduleLayer>
      <Background onClick={deactivateCreate} />
    </>
  );
};

const SubmitBtn = styled.button`
  display: block;
  margin: 1rem 0;
  width: 12rem;
  height: 3.8rem;
  line-height: 3.8rem;
  font-size: 1.6rem;
  float: right;
  background: #2d96f6;
  color: #fff;

  &::after {
    display: block;
    width: 0;
    height: 100%;
    content: "";
    clear: both;
  }

  &:hover {
    background: #238cee;
  }
`;

const CreateScheduleContainer = styled.div`
  position: relative;
  padding: 3.5rem 2rem 2rem 2rem;
`;

const Ticks = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-right: 2.5rem solid transparent;
  border-left: 2.5rem solid transparent;
  border-bottom: 4rem solid #fff;
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 0;
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
  color: ${({ isChecked }) => (isChecked ? "#2D96F6" : "#c1c5d8")};
  transition: all 0.3s;
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

const CreateScheduleLayer = styled.div`
  position: fixed;
  margin: -3.5rem 4px;
  z-index: 100;
  width: 100%;
  max-width: 46rem;
  background: #fff;
  box-shadow: 0 0 60px -10px rgba(66, 74, 106, 0.6);
  border-radius: 1rem;
`;

export default CreateSchedule;
