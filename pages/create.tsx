import { TradingTypes } from "interface";
import TradingDailyForm from "components/form/TradingDailyForm";
import { ITdCreateParams } from "interface";
import { ISessionUser } from "interface";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { formatDate } from "core/firestore/timestamp";

const initialForm: ITdCreateParams = {
  stock_name: "",
  trading_type: TradingTypes.sell,
  trading_date: formatDate(new Date(), "%Y/%m/%d"),
  stock_amount: 0,
  price: 0,
  description: "",
  user_email: "",
};

interface ICreateProps {
  session_user: ISessionUser;
}

const Create = ({ session_user }: ICreateProps) => {
  const user_email = session_user?.email ?? "";
  const form = { ...initialForm, user_email };

  return <TradingDailyForm initialForm={form} />;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const session_user = session?.user ?? null;

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return { props: { session_user } };
};

export default Create;
