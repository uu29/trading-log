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
  const [currYM, setCurrYM] = useState([0, 0]);
  const [startDateSec, setStartDateSec] = useState(0); // 달력 시작 날짜의 seconds date
  const [endDateSec, setEndDateSec] = useState(0); // 달력 마지막 날짜의 seconds date
  const [firstDateSec, setFirstDateSec] = useState(0); // 이번달 첫째 날의 seconds date
  const [lastDateSec, setLastDateSec] = useState(0); // 이번달 마지막 날의 seconds date
  const [secondsFromEpoch, setSecondsFromEpoch] = useState<number[]>([]);

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

  useEffect(() => {
    const _currYM = getYM(currYear, currMonth);
    setCurrYM(_currYM);
    const firstDate = new Date(currYear, currMonth, 1); // 이번달의 첫째 날
    const lastDate = new Date(currYear, currMonth + 1, 0); // 이번달의 마지막 날
    setFirstDateSec(secondsSinceEpoch(firstDate));
    const firstDay = firstDate.getDay(); // 첫째 날의 요일
    let startDate = secondsSinceEpoch(firstDate);
    setLastDateSec(secondsSinceEpoch(lastDate));
    const lastDay = lastDate.getDay(); // 마지막 날의 요일
    let endDate = secondsSinceEpoch(lastDate);

    if (firstDay !== 0) startDate = firstDate.setDate(firstDate.getDate() - firstDay) / 1000; // seconds을 구하기 위해 1000으로 나눔
    if (lastDay !== 6) endDate = lastDate.setDate(lastDate.getDate() + (6 - lastDay)) / 1000;
    // 1일 단위로 배열로 만들기
    const secondsFromStartToEndDate = getDatesStartToLast(startDate, endDate);
    setStartDateSec(startDate);
    setEndDateSec(endDate);
    setSecondsFromEpoch(secondsFromStartToEndDate);
  }, [currMonth, currYear]);

  return {
    currYM,
    firstDateSec,
    lastDateSec,
    startDateSec,
    endDateSec,
    setPrevMonth,
    setNextMonth,
    secondsFromEpoch,
  };
};
export default useCalendar;
