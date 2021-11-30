import styled from "@emotion/styled";

const test = [
  { name: "삼성전자", price: 71000, count: 70, date: "2021/11/16" },
  { name: "S&P 500", price: 183500, count: 10, date: "2021/08/16" },
  { name: "NIKE", price: 123000, count: 241, date: "2021/12/06" },
];

const SearchBar = () => (
  <BarWrap>
    <IcSearch />
    <input type="text" value="" placeholder="검색하세요" />
  </BarWrap>
);
export default function Home() {
  return (
    <div>
      <SearchBar />
      <ul>
        {test.map((t, i) => (
          <List key={i}>
            <h2>{t.name}</h2>
            <ListBottom>
              <Price>{t.price}</Price>
              <span>
                <strong>{t.count}</strong>주
              </span>
              <Date>{t.date}</Date>
            </ListBottom>
          </List>
        ))}
      </ul>
      <AddBtn>작성하기</AddBtn>
    </div>
  );
}

const BarWrap = styled.div`
  margin: 1.6rem;
  background: #dadce2;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 1.2rem;
  overflow: hidden;

  > input {
    height: 4rem;
    display: inline-block;
    width: 100%;
    border: 0 none;
    outline: 0 none;
    background-color: transparent;
    font-size: 1.8rem;
    margin-left: 0.2rem;
  }
`;

const IcSearch = styled.div`
  margin: 0 0.8rem;
  width: 2.8rem;
  height: 2.8rem;
  background: url(/images/ic_search.svg) no-repeat center;
  background-size: contain;
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

const ListCont = styled.div``;

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

const AddBtn = styled.button`
  margin: 1.6rem;
  position: absolute;
  z-index: 1;
  left: 0;
  bottom: 0;
  width: calc(100% - 3.2rem);
  display: block;
  height: 6rem;
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
