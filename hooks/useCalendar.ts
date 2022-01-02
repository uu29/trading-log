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
  const [prevYM, setPrevYM] = useState([0, 0]);
  const [currYM, setCurrYM] = useState([0, 0]);
  const [nextYM, setNextYM] = useState([0, 0]);
  const [prevLastDate, setPrevLastDate] = useState(0);
  const [lastDate, setLastDate] = useState(0);
  const [firstDay, setFirstDay] = useState(0);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const first_date = new Date(year, month, 1).getDate();
    const last_date = new Date(year, month + 1, 0).getDate();
    const first_day = new Date(year, month, 1).getDay();
    const prevYM = getYM(year, month - 1);
    const currYM = getYM(year, month);
    const nextYM = getYM(year, month + 1);
    setPrevYM(prevYM);
    setCurrYM(currYM);
    setNextYM(nextYM);
    setPrevLastDate(getLastDate(prevYM[0], prevYM[1]));
    setLastDate(getLastDate(year, month));
    setFirstDay(first_day);
  }, []);

  return { prevYM, currYM, nextYM, prevLastDate, lastDate, firstDay };
};
export default useCalendar;
