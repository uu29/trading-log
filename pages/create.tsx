import { formatDate } from "core/firestore/timestamp";
import { TradingTypes } from "interface";
import TradingDailyForm from "components/form/TradingDailyForm";
import { ITdCreateParams } from "interface";

const initialForm: ITdCreateParams = {
  stock_name: "",
  trading_type: TradingTypes.sell,
  trading_date: formatDate(new Date(), "%Y/%m/%d"),
  stock_amount: 0,
  price: 0,
  description: "",
};

const Create = () => {
  return <TradingDailyForm initialForm={initialForm} />;
};

export default Create;
