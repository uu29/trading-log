import styled from "@emotion/styled";
import SearchBar from "components/SearchBar";
import AddBtn from "components/AddBtn";
import { IcDollar, IcWon } from "svgs";

const data = [
  { title: "삼성전자", reg_date: "2021.11.16 16:33:33", text: "Lorem Ipsum is simply dummy test" },
  { title: "SK하이닉스", reg_date: "2021.11.16 16:33:33", text: "" },
  { title: "유니티", reg_date: "2021.11.16 16:33:33", text: "Lorem Ipsum is simply dummy test" },
  { title: "테슬라", reg_date: "2021.11.16 16:33:33", text: "Lorem Ipsum is simply dummy test Lorem Ipsum is simply dummy test" },
  { title: "소파이", reg_date: "2021.11.16 16:33:33", text: "" },
];

const Index = () => {
  return (
    <IdxWrap>
      <LeftCont>
        <dt>코스피</dt>
        <dd>3000.32</dd>
      </LeftCont>
      <RightCont>
        <dt>
          <IcWrap>
            원/달러 환율
            <IcDollar />
          </IcWrap>
        </dt>
        <dd>
          <IcWrap>
            1181.50
            <IcWon />
          </IcWrap>
        </dd>
      </RightCont>
    </IdxWrap>
  );
};

const IcWrap = styled.span`
  display: inline-flex;
  align-items: center;
  > svg {
    margin-left: 0.5rem;
  }
`;

const IdxWrap = styled.div`
  display: flex;
  justify-content: space-between;
  background: #dee1ed;
  padding: 1.2rem 1.6rem;
  dt {
    color: #6a6e7a;
    font-size: 1.4rem;
    margin-bottom: 0.8rem;
    letter-spacing: 0.1rem;
  }
  dd {
    font-size: 2rem;
    line-height: 1;
  }
`;

const LeftCont = styled.dl`
  border-left: 2px solid #2d96f6;
  padding-left: 1rem;
`;

const RightCont = styled.dl`
  text-align: right;
`;

const Reports = () => {
  return (
    <section>
      <SearchBar />
      <Index />
      <Grid>
        {data.map((t, i) => (
          <dl key={i}>
            <Title>{t.title}</Title>
            <RegDate>{t.reg_date}</RegDate>
            <Text>{t.text}</Text>
          </dl>
        ))}
      </Grid>
      <AddBtn />
    </section>
  );
};

const Grid = styled.div`
  display: grid;
  gap: 1.6rem;
  grid-template-columns: repeat(3, 1fr);
  margin: 1.6rem;
  > dl {
    background: #fff;
    height: 13rem;
    padding: 1.4rem 1.6rem;
    border: 1px solid #dee0e9;
    box-shadow: 0 0 12rem -5rem rgba(0, 0, 0, 0.4);
  }
`;

const Title = styled.dt`
  font-size: 2.2rem;
  font-weight: 600;
`;

const RegDate = styled.dd`
  margin: 0.2rem 0 1.2rem;
  float: right;
  color: #8f9093;
  font-size: 1.4rem;
`;

const Text = styled.dd`
  clear: both;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #6a6e7a;
  line-height: 1.4;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default Reports;
