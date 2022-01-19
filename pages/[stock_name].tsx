import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { fetchQueryData } from "core/firestore";
import { ITdCreateForm, ITdCreateParams, ITradingDailyLog, TradingType } from "interface";
import { TradingTypes } from "interface";
import { formatDate, getDateStrFromTimestamp } from "core/firestore/timestamp";
import { where } from "@firebase/firestore";
import TradingDailyForm from "components/form/TradingDailyForm";

const user_trading_daily = "user_trading_daily";

interface IDetailProps {
  stock_name: string;
}

const initialForm: ITdCreateParams = {
  stock_name: "",
  trading_type: TradingTypes.sell,
  trading_date: formatDate(new Date(), "%Y/%m/%d"),
  stock_amount: 0,
  price: 0,
  description: "",
};

const Detail = ({ stock_name }: IDetailProps) => {
  const [form, setForm] = useState<ITdCreateParams>(initialForm);
  // const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchQueryData<ITradingDailyLog>(user_trading_daily, [where("stock_name", "==", stock_name)])
      .then((res) => {
        const _res = res[0];
        const _form: ITdCreateParams = {
          ..._res,
          trading_type: _res.trading_type as TradingType,
          trading_date: getDateStrFromTimestamp(_res.trading_date),
        };
        setForm(_form);
      })
      .catch((err) => {
        setForm(initialForm);
        // setError(err);
      });
  }, [stock_name]);
  return <TradingDailyForm initialForm={form} />;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const stock_name = query.stock_name ?? "";
  return { props: { stock_name } };
};

export default Detail;
