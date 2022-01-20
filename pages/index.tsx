import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { State } from "store/slices";
import styled from "@emotion/styled";
import SearchBar from "components/common/SearchBar";
import Link from "next/link";
import { fetchData } from "core/firestore";
import { formatDate } from "core/firestore/timestamp";
import { numberWithCommas } from "lib/common";
import { ITradingDailyLog } from "interface";
import { TradingType, TradingTypes } from "interface";
const trading_collection = "user_trading_daily";

const Home = () => {
  const searchQuery = useSelector((state: State) => state.main.search_query);
  const [error, setError] = useState();
  const [data, setData] = useState<ITradingDailyLog[]>([]);
  const [displayData, setDisplayData] = useState<ITradingDailyLog[]>([]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  useEffect(() => {
    fetchData<ITradingDailyLog>(trading_collection)
      .then((res) => setData(res))
      .catch((err) => setError(err));
  }, []);

  useEffect(() => {
    setDisplayData(data);
  }, [data]);

  useEffect(() => {
    if (searchQuery) {
      const queryData = displayData.filter((d) => d.stock_name.indexOf(searchQuery) > -1);
      if (queryData.length > 0) setDisplayData(queryData);
    } else {
      setDisplayData(data);
    }
    () => {
      setDisplayData(data);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <Section>
      <SearchBar />
      <ul>
        {displayData.map((t, i) => (
          <List key={i}>
            <Link href={{ pathname: "/[stock_name]", query: { stock_name: t.stock_name } }} passHref>
              <ListA>
                <StockName>{t.stock_name}</StockName>
                <ListBottom>
                  <PriceText salesType={t.trading_type as TradingType}>{numberWithCommas(t.price)}</PriceText>
                  <span>
                    <CountText>{t.stock_amount}</CountText>주
                  </span>
                  <DateText>{formatDate(t.trading_date.toDate(), "%Y/%m/%d")}</DateText>
                </ListBottom>
              </ListA>
            </Link>
          </List>
        ))}
      </ul>
      <Link href="/create" passHref>
        <StyledA>작성하기</StyledA>
      </Link>
    </Section>
  );
};

const Section = styled.section`
  flex: 1 0 0;
`;

const ListA = styled.a`
  display: block;
`;

const StyledA = styled.a`
  position: fixed;
  z-index: 1;
  right: 2rem;
  bottom: 7.4rem;
  display: block;
  width: 6rem;
  height: 6rem;
  line-height: 6rem;
  text-indent: -9999px;
  border-radius: 50%;
  background: #2d96f6 url(/images/ico__add.svg) no-repeat center;
  transition: all 0.2s;
  box-shadow: 0 0 4rem -2rem rgba(0, 0, 0, 0.15);
  &:hover {
    background-color: #238cee;
  }
`;

const List = styled.li`
  margin: 1.6rem 0;
  border: 1px solid #dee0e9;
  padding: 1.6rem;
  border-radius: 1.2rem;
  background: #fff;
`;

const StockName = styled.h2`
  font-weight: 600;
  font-size: 2.4rem;
`;

const CountText = styled.em`
  margin-right: 3px;
  font-size: 2.2rem;
  font-weight: 600;
  font-style: normal;
`;

const PriceText = styled.strong<{ salesType: TradingType }>`
  font-size: 2.2rem;
  font-weight: 600;
  margin-right: 1.6rem;
  color: ${({ salesType }) => (salesType === TradingTypes.sell ? "#F02828" : "#0778DF")};
`;

const DateText = styled.span`
  padding-top: 0.8rem;
  display: block;
  color: #8f9093;
`;

const ListBottom = styled.div`
  text-align: right;
`;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return { props: {} };
};

export default Home;
