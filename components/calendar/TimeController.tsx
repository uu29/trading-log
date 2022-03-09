import {
  formatDate,
  getTimeRageByMilliSeconds,
  secondsSinceEpoch,
  oneDayMilliSeconds,
  getTimestampFromSec,
} from "core/firestore/timestamp";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { Timestamp } from "@firebase/firestore";

interface ITimeController {
  selectedDate: Timestamp;
  onChangeCallback: (time: Timestamp) => void;
}

const getInputTime = (sec: number) => {
  const newTime = new Date(sec * 1000);
  return formatDate(newTime, "%H:%M");
};

const TimeController = ({ selectedDate, onChangeCallback }: ITimeController) => {
  const [inputTime, setInputTime] = useState<string>("");
  const [timeOptions, setTimeOptions] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickActivate = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    // 현재보다 +1시간 미래 시간으로
    const now = new Date();
    if (secondsSinceEpoch(now) >= selectedDate.seconds) {
      const now_hours = now.getHours();
      const now_minutes = now.getMinutes();
      const next_hours = now_minutes > 0 ? now_hours + 1 : now_hours;
      now.setHours(next_hours);
    } else {
      // 선택된 날짜가 미래면 00시부터 선택 가능하도록
      now.setHours(0);
    }
    now.setMinutes(0);
    now.setSeconds(0);
    const timeText = formatDate(now, "%H:%M");
    setInputTime(timeText);
    // 30분 간격으로 시간 배열 리턴
    const nowMs = secondsSinceEpoch(now);
    const halfHourMs = 1800;
    const time_options = getTimeRageByMilliSeconds(nowMs, nowMs + oneDayMilliSeconds - 1, halfHourMs);
    setTimeOptions(time_options);
    setIsOpen(true);
  };

  const handleClickItem = (e: React.MouseEvent<HTMLLIElement>, sec: number) => {
    e.preventDefault();
    onChangeCallback(getTimestampFromSec(sec));
    setInputTime(getInputTime(sec));
    setIsOpen(false);
  };

  const handleClickInput = (e: React.MouseEvent<HTMLInputElement>) => {
    setIsOpen(true);
  };

  const getTimeFormat = (sec: number) => formatDate(new Date(sec * 1000), "%H:%M");

  const checkIsActive = (sec: number) => {
    return getTimeFormat(sec) === inputTime;
  };

  return (
    <TimeControllerWrap isActive={Boolean(inputTime)}>
      {inputTime ? (
        <>
          <TimeInput id="time" type="text" value={inputTime} onClick={handleClickInput} />
          {isOpen && (
            <TimeSelect>
              <ul>
                {timeOptions.map((sec) => (
                  <TimeSelectItem key={sec} isActive={checkIsActive(sec)} onClick={(e) => handleClickItem(e, sec)}>
                    {getTimeFormat(sec)}
                  </TimeSelectItem>
                ))}
              </ul>
            </TimeSelect>
          )}
        </>
      ) : (
        <FullText onClick={handleClickActivate}>시간 추가</FullText>
      )}
    </TimeControllerWrap>
  );
};

const TimeControllerWrap = styled.div<{ isActive: boolean }>`
  position: relative;
  width: 9.4rem;
  height: 3.6rem;
  line-height: 1;
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

const FullText = styled.div`
  padding: 0.9rem;
  width: 100%;
  height: 100%;
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

const TimeSelectItem = styled.li<{ isActive: boolean }>`
  padding: 0.9rem 1.4rem;
  cursor: pointer;
  &:hover {
    background: #ebedf3;
  }
  ${({ isActive }) => isActive && `background: #ebedf3`}
`;

const TimeInput = styled.input`
  padding: 0.9rem;
  display: inline-block;
  width: 100%;
  background: transparent;
  border: 0 none;
  outline: 0 none;
  font-size: 1.7rem;
`;

export default TimeController;
