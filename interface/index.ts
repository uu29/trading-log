import { Timestamp } from "firebase/firestore";

export interface TradingDailyLog {
  currency: string;
  description: string;
  reg_date: Timestamp;
  price: number;
  stock_amount: number;
  stock_name: string;
  trading_date: Date;
  trading_type: string;
}

export interface UserCalendar {
  alert: boolean;
  content: string;
  d_time: Timestamp;
  title: string;
}
