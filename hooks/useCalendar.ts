import { useState, useEffect } from "react";

// 현재 날짜의 연, 월 구하는 함수
const getYM = (year, month) => {
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

// 이번 달의 말일 구하는 함수
const getLastDate = (year, month) => new Date(year, month + 1, 0).getDate();

const useCalendar = () => {
  const [currMonth, setCurrMonth] = useState(new Date().getMonth());
  const [currYear, setCurrYear] = useState(new Date().getFullYear());
  const [prevYM, setPrevYM] = useState([0, 0]);
  const [currYM, setCurrYM] = useState([0, 0]);
  const [nextYM, setNextYM] = useState([0, 0]);
  const [prevLastDate, setPrevLastDate] = useState(0);
  const [lastDate, setLastDate] = useState(0);
  const [firstDay, setFirstDay] = useState(0);

  const setPrevMonth = (prev) => {
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
    const first_day = new Date(currYear, currMonth, 1).getDay();
    const prevYM = getYM(currYear, currMonth - 1);
    const currYM = getYM(currYear, currMonth);
    const nextYM = getYM(currYear, currMonth + 1);
    setPrevYM(prevYM);
    setCurrYM(currYM);
    setNextYM(nextYM);
    setPrevLastDate(getLastDate(prevYM[0], prevYM[1]));
    setLastDate(getLastDate(currYear, currMonth));
    setFirstDay(first_day);
  }, [currMonth, currYear]);

  return { prevYM, currYM, nextYM, prevLastDate, lastDate, firstDay, setPrevMonth, setNextMonth };
};
export default useCalendar;
