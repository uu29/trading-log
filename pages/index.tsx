import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { State } from "store/slices";
import styled from "@emotion/styled";
import SearchBar from "components/common/SearchBar";
import Link from "next/link";
import { fetchQueryData } from "core/firestore";
import { formatDate } from "core/firestore/timestamp";
import { where } from "@firebase/firestore";
import { numberWithCommas } from "lib/common";
import { ISessionUser, ITradingDailyLog } from "interface";
import { TradingType, TradingTypes } from "interface";
import { dim_animation } from "styles/StyleLib";
const trading_collection = "user_trading_daily";

interface IHomeProps {
  session_user: ISessionUser;
}

const Home = ({ session_user }: IHomeProps) => {
  const searchQuery = useSelector((state: State) => state.main.search_query);
  const user_email = session_user?.email ?? "";
  const [error, setError] = useState();
  const [data, setData] = useState<ITradingDailyLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayData, setDisplayData] = useState<ITradingDailyLog[]>([]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  useEffect(() => {
    fetchQueryData<ITradingDailyLog>(trading_collection, [where("user_email", "==", user_email)])
      .then((res) => setData(res))
      .catch((err) => setError(err))
      .finally(() => {
        setLoading(false);
      });
  }, [user_email]);

  useEffect(() => {
    setDisplayData(data);
    () => {
      setLoading(true);
    };
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

  if (loading)
    return (
      <LoadingWrap>
        <div className="loading_bar" />
        <div className="loading_bar" />
        <div className="loading_bar" />
        <div className="loading_bar" />
      </LoadingWrap>
    );
  else if (!data.length)
    return (
      <DefaultView>
        <div>
          <p className="main_copyright">
            하루하루 <strong>매매일지</strong>를 기록해보세요.
          </p>
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
          <Link href="/create">
            <a className="create_link">매매일지 기록하기</a>
          </Link>
        </div>
      </DefaultView>
    );

  return (
    <Section>
      <SearchBar />
      <ul>
        {displayData.map((t) => (
          <List key={t.stock_name}>
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

const DefaultView = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 2.5rem;
  padding: 5rem;
  background: #f2f3f8;
  border-radius: 2rem;
  > div {
    text-align: center;
    width: 100%;
  }

  .main_copyright {
    margin-bottom: 5rem;
    font-size: 1.8rem;
  }

  .bar {
    background: #e3e5f0;
    height: 4.6rem;
    margin: 2rem 0;
    &:nth-of-type(2) {
      width: 95%;
    }
    &:nth-of-type(3) {
      width: 90%;
    }
  }

  .create_link {
    display: block;
    margin: 8rem auto 0;
    height: 5.6rem;
    width: 28rem;
    background: #f99c2f;
    color: #fff;
    line-height: 5.6rem;
    text-align: center;
    font-size: 1.8rem;
    border-radius: 1rem;
  }
`;

const LoadingWrap = styled.div`
  flex: 1 0 0;
  > .loading_bar {
    background: #dee0e9;
    height: 7.2rem;
    margin: 2rem 0;

    &:nth-of-type(2) {
      width: 95%;
    }
    &:nth-of-type(3) {
      width: 90%;
    }
    &:nth-of-type(4) {
      width: 85%;
    }
    ${dim_animation};
  }
`;

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
  const session_user = session?.user ?? null;
  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return { props: { session_user } };
};

export default Home;
