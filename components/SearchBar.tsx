import styled from "@emotion/styled";

const SearchBar = () => (
  <BarWrap>
    <IcSearch />
    <input type="text" value="" placeholder="검색하세요" />
  </BarWrap>
);

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
  background: url(/images/ic__search.svg) no-repeat center;
  background-size: contain;
`;

export default SearchBar;
