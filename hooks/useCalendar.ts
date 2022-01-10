import { useState, useEffect, useMemo } from "react";
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

// 첫째날(또는 마지막날) 날짜 구하는 함수
const getInitDateObj = (year: number, month: number, init_day: number) => {
  const init_d = new Date(year, month, init_day); // init_day가 0이면 마지막 날, 1이면 첫째 날
  const init_d_date = init_d.getDate(); // day
  const init_d_day = init_d.getDay(); // 요일
  const init_d_sec = secondsSinceEpoch(init_d); //  epoch seconds
  return { init_d, init_d_date, init_d_day, init_d_sec };
};

const useCalendar = (start_date_sec?: number, end_date_sec?: number) => {
  const [currMonth, setCurrMonth] = useState(new Date().getMonth());
  const [currYear, setCurrYear] = useState(new Date().getFullYear());
  const [currYM, setCurrYM] = useState([0, 0]);
  const [startDateSec, setStartDateSec] = useState(start_date_sec ?? 0); // 달력 시작 날짜의 seconds date
  const [endDateSec, setEndDateSec] = useState(end_date_sec ?? 0); // 달력 마지막 날짜의 seconds date
  const [firstDateSec, setFirstDateSec] = useState(0); // 이번달 첫째 날의 seconds date
  const [lastDateSec, setLastDateSec] = useState(0); // 이번달 마지막 날의 seconds date
  const [secondsFromEpoch, setSecondsFromEpoch] = useState<number[]>([]);
  const daysKr = ["일", "월", "화", "수", "목", "금", "토"];

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
    const {
      init_d: first_d,
      init_d_date: first_d_date,
      init_d_day: first_d_day,
      init_d_sec: first_d_sec,
    } = getInitDateObj(currYear, currMonth, 1);

    const {
      init_d: last_d,
      init_d_date: last_d_date,
      init_d_day: last_d_day,
      init_d_sec: last_d_sec,
    } = getInitDateObj(currYear, currMonth + 1, 0);

    setFirstDateSec(first_d_sec);
    setLastDateSec(last_d_sec);

    let start_date = first_d_sec;
    let end_date = last_d_sec;

    // 일요일로 시작하거나 토요일로 끝나지 않는 경우
    if (first_d_day !== 0) start_date = first_d.setDate(first_d_date - first_d_day) / 1000; // seconds을 구하기 위해 1000으로 나눔
    if (last_d_day !== 6) end_date = last_d.setDate(last_d_date + (6 - last_d_day)) / 1000;

    // startDate, endDate가 주어진 경우
    if (start_date_sec) start_date = start_date_sec;
    if (end_date_sec) end_date = end_date_sec;

    // 1일 단위로 배열로 만들기
    const seconds = getDatesStartToLast(start_date, end_date);
    setStartDateSec(start_date);
    setEndDateSec(end_date);
    setSecondsFromEpoch(seconds);
  }, [currMonth, currYear, start_date_sec, end_date_sec]);

  const checkExtraDay = useMemo(() => (sec: number) => sec < firstDateSec || sec > lastDateSec, [firstDateSec, lastDateSec]);

  return {
    currYM,
    startDateSec,
    endDateSec,
    firstDateSec,
    lastDateSec,
    setPrevMonth,
    setNextMonth,
    secondsFromEpoch,
    checkExtraDay,
    daysKr,
  };
};
export default useCalendar;
