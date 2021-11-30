import styled from "@emotion/styled";
import SearchBar from "components/SearchBar";
import AddBtn from "components/AddBtn";

const data = [
  { name: "삼성전자", price: 71000, count: 70, date: "2021/11/16" },
  { name: "S&P 500", price: 183500, count: 10, date: "2021/08/16" },
  { name: "NIKE", price: 123000, count: 241, date: "2021/12/06" },
];

export default function Home() {
  return (
    <div>
      <SearchBar />
      <ul>
        {data.map((t, i) => (
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
      <AddBtn />
    </div>
  );
}

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
