import styled from "@emotion/styled";
import useForm from "hooks/useForm";
import { mainSlice } from "store/slices/main";
import { useDispatch } from "react-redux";

interface ISearchForm {
  query: string;
}
const initialForm: ISearchForm = { query: "" };

const SearchBar = () => {
  const dispatch = useDispatch();
  const changeCb = (form: ISearchForm) => {
    dispatch(mainSlice.actions.setSearchQuery(form.query));
  };

  const { form, handleChange } = useForm<ISearchForm>({ initialForm, changeFormCb: changeCb });

  return (
    <BarWrap>
      <IconSearch />
      <input type="query" name="query" value={form.query} placeholder="검색하세요" onChange={handleChange} />
    </BarWrap>
  );
};

const BarWrap = styled.div`
  margin: 1.6rem 0;
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

const IconSearch = styled.div`
  margin: 0 0.8rem;
  width: 2.8rem;
  height: 2.8rem;
  background: url(/images/ico__search.svg) no-repeat center;
  background-size: contain;
`;

export default SearchBar;
