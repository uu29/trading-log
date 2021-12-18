import { useState, forwardRef } from "react";
import useForm from "hooks/useForm";
import styled from "@emotion/styled";
import { cx, css } from "@emotion/css";
import DatePicker, { showTimeSelect } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const date__input = css`
  display: block;
  padding: 1.6rem;
  width: 100%;
  height: 6rem;
  border: 1px solid #dee0e9;
  background: #fff;
  border-radius: 0.8rem;
  font-size: 2.4rem;
  color: #5e5e5e;
`;

const IconCal = styled.span`
  margin-top: 0.2rem;
  float: right;
  display: block;
  width: 2.2rem;
  height: 2.2rem;
  background: url(/images/ico__cal.svg) no-repeat center;
`;

const date__header = css`
  background: #fbfbfb;
  padding: 1rem;
  color: #3b3e4a;
  display: flex;
  align-items: center;
`;

const text = css`
  font-size: 1.6rem;
`;

const Btn = styled.button`
  display: inline-block;
  width: 2.4rem;
  height: 2.4rem;
`;

const btn__prev = css`
  background: url(/images/ico__prev.svg);
`;

const btn__next = css`
  background: url(/images/ico__next.svg);
`;

const NowMonth = styled.div`
  padding: 0 1rem;
  font-size: 1.8rem;
`;

const CustomHeader = ({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthDisabled }) => (
  <div className={date__header}>
    <Btn type="button" onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className={btn__prev} />
    <NowMonth>
      {date.getFullYear()}
      <span className={text}>년</span> {date.getMonth() + 1}
      <span className={text}>월</span>
    </NowMonth>
    <Btn type="button" onClick={increaseMonth} disabled={nextMonthDisabled} className={btn__next} />
  </div>
);

const datepicker__popper = css`
  max-width: 400px;
  max-height: 400px;
  width: 100%;
  height: 100%;

  .react-datepicker {
    width: 100%;
    height: 100%;
  }
`;

const DateInput = () => {
  const [startDate, setStartDate] = useState(new Date());

  const onChange = (date) => {
    setStartDate(date);
  };
  // eslint-disable-next-line react/display-name
  const CustomInput = forwardRef<HTMLButtonElement, { value: Date; onClick(): void }>(({ value, onClick }, ref) => (
    <button type="button" className={date__input} onClick={onClick} ref={ref}>
      {value}
      <IconCal />
    </button>
  ));

  return (
    <DatePicker
      dateFormat="yyyy/MM/dd"
      selected={startDate}
      onChange={(date) => onChange(date)}
      popperClassName={datepicker__popper}
      customInput={<CustomInput value={startDate} onClick={showTimeSelect} />}
      renderCustomHeader={({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthDisabled }): JSX.Element => (
        <CustomHeader
          date={date}
          decreaseMonth={decreaseMonth}
          increaseMonth={increaseMonth}
          prevMonthButtonDisabled={prevMonthButtonDisabled}
          nextMonthDisabled={nextMonthDisabled}
        />
      )}
    />
  );
};

const select_icon_style = css`
  margin-top: 0.5rem;
  float: right;
`;

const number_input_style = css`
  text-align: right;
`;

const SelectBtn = () => (
  <button type="button" className={select_icon_style}>
    <svg width="8" height="17" viewBox="0 0 8 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 0L7.4641 6H0.535898L4 0Z" fill="#8F9093" />
      <path d="M4 17L0.535899 11L7.4641 11L4 17Z" fill="#8F9093" />
    </svg>
  </button>
);

const form_input_style = css`
  border: 1px solid #dee0e9;
  background: #fff;
  border-radius: 0.8rem;
  padding: 1.6rem;
  font-size: 2.4rem;
`;

const SalesType = {
  sell: "매수",
  buy: "매도",
} as const;

type SalesType = typeof SalesType[keyof typeof SalesType];

interface IValue {
  name: string;
  sales: SalesType;
  date: string;
  count: number;
  price: number;
  desc: string;
}
const initialValue: IValue = { name: "", sales: SalesType.sell, date: "2021/12/07", count: 0, price: 0, desc: "" };

const onSubmit = (value) => {
  console.log(value);
};

const Create = () => {
  const { form, handleChange } = useForm<IValue>({ initialValue, onSubmit });
  return (
    <FormWrap>
      <form method="post">
        <Label htmlFor="name">종목 이름</Label>
        <Input type="text" id="name" name="name" value={form.name} onChange={handleChange} className={form_input_style} />
        <Flex>
          <LeftColumn>
            <Label htmlFor="date">매매 일자</Label>
            <DateInput />
            {/* <InputDate type="text" id="date" name="date" value={form.date} onChange={handleChange} readOnly className={form_input_style} /> */}
          </LeftColumn>
          <RightColumn>
            <Label htmlFor="sales">매도/매수</Label>
            <SalesOptions className={form_input_style} salesType={form.sales}>
              {form.sales}
              <SelectBtn />
            </SalesOptions>
            <input type="text" id="sales" name="sales" value={form.sales} onChange={handleChange} hidden />
          </RightColumn>
        </Flex>
        <Flex>
          <LeftColumn>
            <Label htmlFor="price">단가</Label>
            <Input
              type="text"
              id="price"
              name="price"
              value={form.price}
              onChange={handleChange}
              className={cx(form_input_style, number_input_style)}
            />
          </LeftColumn>
          <RightColumn>
            <Label htmlFor="count">수량</Label>
            <Input
              type="text"
              id="count"
              name="count"
              value={form.count}
              onChange={handleChange}
              className={cx(form_input_style, number_input_style)}
            />
          </RightColumn>
        </Flex>
        <Label htmlFor="desc">매매 이유</Label>
        <TextArea id="desc" name="desc" rows={5} cols={33} value={form.desc} onChange={handleChange} className={form_input_style} />
        <SubmitBtn>작성하기</SubmitBtn>
      </form>
    </FormWrap>
  );
};

const SubmitBtn = styled.button`
  margin-top: 1.6rem;
  display: block;
  width: 100%;
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

const Label = styled.label`
  display: inline-block;
  color: #6a6e7a;
  margin: 2.3rem 0 0.8rem;
  font-size: 1.8rem;
`;

const FormWrap = styled.div`
  margin: 0 2rem 1.6rem;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  height: 6rem;
`;

const InputDate = styled.input`
  display: block;
  width: 100%;
  height: 6rem;
  color: #5e5e5e;
`;

const SalesOptions = styled.div<{ salesType: SalesType }>`
  color: ${({ salesType }) => (salesType === SalesType.sell ? "#F02828" : "#0778DF")};
`;

const Flex = styled.div`
  display: flex;
`;

const RightColumn = styled.div`
  flex: none;
  width: 22rem;
`;

const LeftColumn = styled.div`
  margin-right: 1.6rem;
  flex: 1 0 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  display: block;
`;

export default Create;
