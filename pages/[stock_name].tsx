import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { fetchQueryData } from "core/firestore";
import { ISessionUser, ITdCreateParams, ITradingDailyLog, TradingType } from "interface";
import { TradingTypes } from "interface";
import { getDateStrFromTimestamp } from "core/firestore/timestamp";
import { where } from "@firebase/firestore";
import TradingDailyForm from "components/form/TradingDailyForm";
import { getSession } from "next-auth/react";

const user_trading_daily = "user_trading_daily";

interface IDetailProps {
  stock_name: string;
  session_user: ISessionUser;
}

const initialForm: ITdCreateParams = {
  stock_name: "",
  trading_type: TradingTypes.sell,
  trading_date: "",
  stock_amount: 0,
  price: 0,
  description: "",
  user_email: "",
};

const Detail = ({ stock_name, session_user }: IDetailProps) => {
  const user_email = session_user?.email ?? "";
  const [form, setForm] = useState<ITdCreateParams>(initialForm);
  // const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchQueryData<ITradingDailyLog>(user_trading_daily, [where("stock_name", "==", stock_name), where("user_email", "==", user_email)])
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
  }, [stock_name, user_email]);
  return <TradingDailyForm initialForm={form} showDelBtn />;
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const session = await getSession({ req });
  const session_user = session?.user ?? null;
  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  const stock_name = query.stock_name ?? "";
  return { props: { stock_name, session_user } };
};

export default Detail;
