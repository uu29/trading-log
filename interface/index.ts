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
}

export interface IFullDateObj {
  _y: number;
  _m: number;
  _d: number;
  _day: number;
  _h: number;
  _minutes: number;
}

export type TCalendarMap = Map<number, IUserCalendar[]>;
