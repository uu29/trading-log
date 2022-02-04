import { Timestamp } from "firebase/firestore";

export interface ISessionUser {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

export interface ITradingDailyLog {
  currency: string;
  description: string;
  price: number;
  stock_amount: number;
  stock_name: string;
  trading_date: Timestamp;
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

export const TradingTypes = {
  sell: "매수",
  buy: "매도",
} as const;

export type TradingType = typeof TradingTypes[keyof typeof TradingTypes];

export type ISecondsMap = Map<number, IDateObj>;

export type TCalendarMap = Map<number, IUserCalendar[]>;

interface ITdCreateDefaultParams {
  stock_name: string;
  trading_type: TradingType;
  stock_amount: number;
  price: number;
  description: string;
}

export interface ITdCreateParams extends ITdCreateDefaultParams {
  trading_date: string;
}

export interface ITdCreateForm extends ITdCreateDefaultParams {
  trading_date: Timestamp;
}