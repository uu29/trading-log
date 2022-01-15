import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import SearchBar from "components/SearchBar";
import Link from "next/link";
import { fetchData } from "core/firestore";
import { getDateStrFromTimestamp } from "core/firestore/timestamp";
import { ITradingDailyLog } from "interface";
const trading_collection = "user_trading_daily";

const Home = () => {
  const [error, setError] = useState();
  const [data, setData] = useState<ITradingDailyLog[]>([]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  useEffect(() => {
    fetchData<ITradingDailyLog>(trading_collection)
      .then((res) => setData(res))
      .catch((err) => setError(err));
  }, []);

  return (
    <Section>
      <SearchBar />
      <ul>
        {data.map((t, i) => (
          <List key={i}>
            <h2>{t.stock_name}</h2>
            <ListBottom>
              <Price>{t.price}</Price>
              <span>
                <strong>{t.stock_amount}</strong>주
              </span>
              <Date>{getDateStrFromTimestamp(t.trading_date)}</Date>
            </ListBottom>
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
  position: relative;
  max-width: 76.8rem;
`;

const StyledA = styled.a`
  margin: 1.6rem;
  position: absolute;
  z-index: 1;
  left: 0;
  bottom: 0;
  width: calc(100% - 3.2rem);
  display: block;
  height: 6rem;
  line-height: 6rem;
  font-size: 1.8rem;
  border-radius: 0.8rem;
  background: #2d96f6;
  color: #fff;
  text-align: center;
  transition: all 0.2s;
  box-shadow: 0 0 4rem -2rem rgba(0, 0, 0, 0.15);
  &:hover {
    background: #238cee;
  }
`;

const List = styled.li`
  margin: 1.6rem;
  border: 1px solid #dee0e9;
  padding: 1.6rem;
  border-radius: 1.2rem;
  background: #fff;

  > h2 {
    font-weight: 600;
    font-size: 2.4rem;
  }
  strong {
    font-size: 2.2rem;
    font-weight: 600;
  }
`;

const Price = styled.strong`
  margin-right: 1.6rem;
`;

const Date = styled.span`
  padding-top: 0.8rem;
  display: block;
  color: #8f9093;
`;

const ListBottom = styled.div`
  text-align: right;
`;

export default Home;
