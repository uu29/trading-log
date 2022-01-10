import { Timestamp } from "firebase/firestore";

export interface ITradingDailyLog {
  currency: string;
  description: string;
  reg_date: Timestamp;
  price: number;
  stock_amount: number;
  stock_name: string;
  trading_date: Date;
  trading_type: string;
}

export interface IUserCalendar {
  alert: boolean;
  content: string;
  d_time: Timestamp;
  title: string;
  date: Timestamp;
  time?: Timestamp; // 없으면 유저가 시간 설정 안한 것
}

interface IDateObj {
  _t: Date;
  _y: number;
  _m: number;
  _d: number;
  _day: number;
}

export interface IFullDateObj extends IDateObj {
  _h: number;
  _minutes: number;
}

export type ISecondsMap = Map<number, IDateObj>;

export type TCalendarMap = Map<number, IUserCalendar[]>;
