import { useState, useEffect } from "react";
import { secondsSinceEpoch, getDatesStartToLast } from "core/firestore/timestamp";

// 현재 날짜의 연, 월 구하는 함수
const getYM = (year: number, month: number) => {
  month = month + 1;
  if (month > 12) {
    month = 1;
    year++;
  } else if (month < 1) {
    month = 12;
    year--;
  }
  return [year, month];
};

const useCalendar = () => {
  const [currMonth, setCurrMonth] = useState(new Date().getMonth());
  const [currYear, setCurrYear] = useState(new Date().getFullYear());
  const [prevYM, setPrevYM] = useState([0, 0]);
  const [currYM, setCurrYM] = useState([0, 0]);
  const [nextYM, setNextYM] = useState([0, 0]);
  const [prevLastDate, setPrevLastDate] = useState(0);
  const [lastDate, setLastDate] = useState(0);
  const [firstDay, setFirstDay] = useState(0);
  const [lastDay, setlastDay] = useState(0);
  const [secondsFromEpoch, setSecondsFromEpoch] = useState<number[]>([]);

  // 이번 달의 말일 구하는 함수
  const getLastDate = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // 저번 달의 말일 구하는 함수
  const getPrevLastDate = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const setPrevMonth = () => {
    if (currMonth > 0) setCurrMonth(currMonth - 1);
    else {
      setCurrMonth(11);
      setCurrYear(currYear - 1);
    }
  };

  const setNextMonth = () => {
    if (currMonth < 11) setCurrMonth(currMonth + 1);
    else {
      setCurrMonth(0);
      setCurrYear(currYear + 1);
    }
  };

  const getDay = (year: number, month: number, date: number) => {
    let now = new Date(year, month - 1, date);
    return now.getDay();
  };

  useEffect(() => {
    const first_day = new Date(currYear, currMonth, 1).getDay(); // 이번달의 첫째 날
    const last_day = new Date(currYear, currMonth + 1, 0).getDay(); // 이번달의 마지막 날
    const _prevYM = getYM(currYear, currMonth - 1);
    const _currYM = getYM(currYear, currMonth);
    const _nextYM = getYM(currYear, currMonth + 1);
    setPrevYM(_prevYM);
    setCurrYM(_currYM);
    setNextYM(_nextYM);
    setLastDate(getLastDate(currYear, currMonth));
    setPrevLastDate(getPrevLastDate(currYear, currMonth));
    setFirstDay(first_day);
    setlastDay(last_day);

    const firstDate = new Date(currYear, currMonth, 1); // 이번달의 첫째 날
    const firstDay = firstDate.getDay(); // 첫째 날의 요일
    let startDate = secondsSinceEpoch(firstDate);
    const lastDate = new Date(currYear, currMonth + 1, 0); // 이번달의 마지막 날
    const lastDay = lastDate.getDay(); // 마지막 날의 요일
    let endDate = secondsSinceEpoch(lastDate);

    if (firstDay !== 0) startDate = firstDate.setDate(firstDate.getDate() - firstDay);
    if (lastDay !== 6) endDate = lastDate.setDate(lastDate.getDate() + (6 - lastDay));
    // 1일 단위로 배열로 만들기
    const secondsFromStartToEndDate = getDatesStartToLast(startDate, endDate);
    setSecondsFromEpoch(secondsFromStartToEndDate);
  }, [currMonth, currYear]);

  return { prevYM, currYM, nextYM, prevLastDate, lastDate, firstDay, lastDay, setPrevMonth, setNextMonth, getDay, secondsFromEpoch };
};
export default useCalendar;
