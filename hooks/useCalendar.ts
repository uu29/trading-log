import { useState, useEffect, useMemo } from "react";
import { initDateSec, getDateObjFromSeconds, getDateRangeByDay, secondsSinceEpoch } from "core/firestore/timestamp";

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

const useCalendar = (start_date_sec?: number, end_date_sec?: number) => {
  const [currMonth, setCurrMonth] = useState(new Date().getMonth());
  const [currYear, setCurrYear] = useState(new Date().getFullYear());
  const [currYM, setCurrYM] = useState([0, 0]);
  const [firstDateSec, setFirstDateSec] = useState(initDateSec());
  const [lastDateSec, setLastDateSec] = useState(initDateSec(0));
  const [startDateSec, setStartDateSec] = useState(start_date_sec ?? 0); // 달력 시작 날짜의 seconds date
  const [endDateSec, setEndDateSec] = useState(end_date_sec ?? 0); // 달력 마지막 날짜의 seconds date
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
    const first_date_sec = initDateSec(1, new Date(currYear, currMonth));
    const last_date_sec = initDateSec(0, new Date(currYear, currMonth));
    setFirstDateSec(first_date_sec);
    setLastDateSec(last_date_sec);
  }, [currMonth, currYear]);

  useEffect(() => {
    let start_date = firstDateSec;
    let end_date = lastDateSec;

    const { _t: first_d, _d: first_d_date, _day: first_d_day } = getDateObjFromSeconds(firstDateSec);
    const { _t: last_d, _d: last_d_date, _day: last_d_day } = getDateObjFromSeconds(lastDateSec);

    // 일요일로 시작하거나 토요일로 끝나지 않는 경우
    if (first_d_day !== 0) start_date = secondsSinceEpoch(first_d.setDate(first_d_date - first_d_day));
    if (last_d_day !== 6) end_date = secondsSinceEpoch(last_d.setDate(last_d_date + (6 - last_d_day)));

    // startDate, endDate가 주어진 경우
    if (start_date_sec) start_date = start_date_sec;
    if (end_date_sec) end_date = end_date_sec;

    // 1일 단위로 배열로 만들기
    const seconds = getDateRangeByDay(start_date, end_date);
    setStartDateSec(start_date);
    setEndDateSec(end_date);
    setSecondsFromEpoch(seconds);
  }, [start_date_sec, end_date_sec, firstDateSec, lastDateSec]);

  const checkExtraDay = useMemo(() => (sec: number) => sec < firstDateSec || sec > lastDateSec, [firstDateSec, lastDateSec]);

  return {
    currYM,
    startDateSec,
    endDateSec,
    setPrevMonth,
    setNextMonth,
    secondsFromEpoch,
    checkExtraDay,
    daysKr,
  };
};
export default useCalendar;
