import { Timestamp } from "firebase/firestore";
import { IFullDateObj } from "interface";
// firestore.Timestamp 날짜 파싱에 관한 함수

const oneDayMilliSeconds = 86400;

// Date obj to seconds number
export const secondsSinceEpoch = (d) => Math.floor(d / 1000);

// 시작 날짜부터 마지막 날짜까지 하루씩 더한 날짜들의 배열(seconds 데이터)
export const getDatesStartToLast = (startDate: number, lastDate: number): number[] => {
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
  const t = new Date(sec * 1000);
  const _y = t.getFullYear();
  const _m = t.getMonth() + 1;
  const _d = t.getDate();
  const _day = t.getDay();
  const _h = t.getHours();
  const _minutes = t.getMinutes();
  return { _y, _m, _d, _day, _h, _minutes };
};

// Timestamp 데이터로부터 year, month, date 정보 파싱
export const getDateObjFromTimestamp = (date: Timestamp): IFullDateObj => {
  const t = date.toDate();
  const _y = t.getFullYear();
  const _m = t.getMonth() + 1;
  const _d = t.getDate();
  const _day = t.getDay();
  const _h = t.getHours();
  const _minutes = t.getMinutes();

  return { _y, _m, _d, _day, _h, _minutes };
};

export const getDateStrFromTimestamp = (date: Timestamp): string => {
  const { _y, _m, _d } = getDateObjFromTimestamp(date);
  return `${_y}/${_m}/${_d}`;
};

export const getTimestampSecFromDate = (date: Timestamp) => {
  const { _y, _m, _d } = getDateObjFromTimestamp(date);
  return Timestamp.fromDate(new Date(_y, _m, _d)).seconds;
};

export const getTimestampSecFromNumber = (_y: number, _m: number, _d: number) => {
  return Timestamp.fromDate(new Date(_y, _m, _d)).seconds;
};

// 데이트 포맷
export const formatDate = (date: Date, fStr: string, utc?: boolean): string => {
  const _utc = utc ? "getUTC" : "get";
  return fStr.replace(/%[YmdHMS]/g, function (m) {
    switch (m) {
      case "%Y":
        return date[_utc + "FullYear"](); // no leading zeros required
      case "%m":
        m = 1 + date[_utc + "Month"]();
        break;
      case "%d":
        m = date[_utc + "Date"]();
        break;
      case "%H":
        m = date[_utc + "Hours"]();
        break;
      case "%M":
        m = date[_utc + "Minutes"]();
        break;
      case "%S":
        m = date[_utc + "Seconds"]();
        break;
      default:
        return m.slice(1); // unknown code, remove %
    }
    // add leading zero if required
    return ("0" + m).slice(-2);
  });
};
