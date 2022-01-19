import { Timestamp } from "firebase/firestore";
import { IFullDateObj } from "interface";
// firestore.Timestamp 날짜 파싱에 관한 함수

const oneDayMilliSeconds = 86400;

// Date obj to seconds number
export const secondsSinceEpoch = (d: any) => Math.floor(d / 1000);

// 시작 날짜부터 마지막 날짜까지 하루씩 더한 날짜들의 배열(seconds 데이터)
export const getDateRangeByDay = (startDate: number, lastDate: number): number[] => {
  const result: number[] = [];
  let curDate = startDate;
  while (curDate <= lastDate) {
    result.push(curDate);
    curDate = curDate + oneDayMilliSeconds;
  }
  return result;
};

// epoch seconds 데이터로부터 시간정보 파싱
export const getDateObjFromSeconds = (sec: number): IFullDateObj => {
  const _t = new Date(sec * 1000);
  const _y = _t.getFullYear();
  const _m = _t.getMonth() + 1;
  const _d = _t.getDate();
  const _day = _t.getDay();
  const _h = _t.getHours();
  const _minutes = _t.getMinutes();
  return { _t, _y, _m, _d, _day, _h, _minutes };
};

/**
 * 주어진 연/월의 n번째 날로 초기화 하는 함수
 * @param {number?} n 1이면 첫째날, 0이면 마지막 날 (default = 1)
 * @param {Date?} date 특정 날짜
 * @returns {number} now_sec 초기화된 날짜의 seconds
 */

export const initDateSec = (n = 1, date?: Date) => {
  let now_sec: number = 0;
  if (date) now_sec = date.setDate(n);
  else now_sec = new Date().setDate(n);
  if (n === 0) {
    let next_month = new Date(now_sec).getMonth() + 1;
    now_sec = new Date(now_sec).setMonth(next_month);
  }
  now_sec = new Date(now_sec).setHours(0, 0, 0, 0);
  return secondsSinceEpoch(now_sec);
};

// Timestamp 데이터로부터 year, month, date 정보 파싱
export const getDateObjFromTimestamp = (date: Timestamp): IFullDateObj => {
  const _t = date.toDate();
  const _y = _t.getFullYear();
  const _m = _t.getMonth() + 1;
  const _d = _t.getDate();
  const _day = _t.getDay();
  const _h = _t.getHours();
  const _minutes = _t.getMinutes();

  return { _t, _y, _m, _d, _day, _h, _minutes };
};

export const getDateStrFromTimestamp = (date: Timestamp): string => {
  const { _y, _m, _d } = getDateObjFromTimestamp(date);
  return formatDate(new Date(_y, _m, _d), "%Y/%m/%d");
};

export const getTimestampSecFromDate = (date: Timestamp) => {
  const { _y, _m, _d } = getDateObjFromTimestamp(date);
  return Timestamp.fromDate(new Date(_y, _m, _d)).seconds;
};

export const getTimestampSecFromNumber = (_y: number, _m: number, _d: number) => {
  return Timestamp.fromDate(new Date(_y, _m, _d)).seconds;
};

// yyyy/mm/dd 형식의 날짜 string을 00시 00분 00초로 초기화된 Timestamp로 파싱
export const strDateToTimestamp = (strDate: string): Timestamp => {
  const [_y, _m, _d] = strDate.split("/");
  const y = Number(_y);
  const m = Number(_m) - 1; // Date type month 통일을 위해 -1
  const d = Number(_d);
  const t = new Date(y, m, d);
  return Timestamp.fromDate(t);
};

// 데이트 포맷
export const formatDate = (date: Date, fStr: string, utc?: boolean): string => {
  const _utc = utc ? "getUTC" : "get";
  return fStr.replace(/%[YmdHMS]/g, (str) => {
    switch (str) {
      case "%Y":
        return date[`${_utc}FullYear`]().toString(); // no leading zeros required
      case "%m":
        str = (1 + date[`${_utc}Month`]()).toString();
        break;
      case "%d":
        str = date[`${_utc}Date`]().toString();
        break;
      case "%H":
        str = date[`${_utc}Hours`]().toString();
        break;
      case "%M":
        str = date[`${_utc}Minutes`]().toString();
        break;
      case "%S":
        str = date[`${_utc}Seconds`]().toString();
        break;
      default:
        return str.slice(1); // unknown code, remove %
    }
    // add leading zero if required
    return ("0" + str).slice(-2);
  });
};

// 00시 00분으로 초기화된 오늘 날짜
export const todaySec = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return secondsSinceEpoch(today);
};
