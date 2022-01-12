import React, { useState, useEffect } from "react";
import useForm from "hooks/useForm";
import styled from "@emotion/styled";
import { cx, css } from "@emotion/css";
import CalendarForm from "components/form/CalendarForm";
import { formatDate } from "core/firestore/timestamp";

const select_icon_style = css`
  position: absolute;
  right: 1.5rem;
  bottom: 1.8rem;
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

const initialValue: IValue = { name: "", sales: SalesType.sell, date: formatDate(new Date(), "%Y/%m/%d"), count: 0, price: 0, desc: "" };

const onSubmit = (value) => {
  console.log(value);
};

const Create = () => {
  const { form, handleChange } = useForm<IValue>({ initialValue, onSubmit });
  const [openCalendar, setOpenCalendar] = useState(false);

  const toggleDate = () => {
    setOpenCalendar(!openCalendar);
  };

  const closeCalendar = () => {
    setOpenCalendar(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
  };

  return (
    <FormWrap>
      <form method="post" onSubmit={handleSubmit}>
        <Label htmlFor="name">종목 이름</Label>
        <Input type="text" id="name" name="name" value={form.name} onChange={handleChange} className={form_input_style} />
        <Flex>
          <LeftColumn>
            <Label htmlFor="date">매매 일자</Label>
            <CalIcon onClick={toggleDate} />
            <InputDate type="text" id="date" name="date" value={form.date} onClick={toggleDate} className={form_input_style} readOnly />
            {openCalendar && (
              <>
                <CalendarForm />
                <CalendarBg onClick={closeCalendar} />
              </>
            )}
          </LeftColumn>
          <RightColumn>
            <Label htmlFor="sales">매도/매수</Label>
            <SelectBtn />
            <SalesSelect className={form_input_style} salesType={form.sales} id="sales" name="sales" onChange={handleChange}>
              <option value={SalesType.buy} selected={form.sales === SalesType.buy}>
                {SalesType.buy}
              </option>
              <option value={SalesType.sell} selected={form.sales === SalesType.sell}>
                {SalesType.sell}
              </option>
            </SalesSelect>
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

const CalIcon = styled.div`
  position: absolute;
  width: 2rem;
  height: 2rem;
  right: 2rem;
  bottom: 2rem;
  background: url(/images/ico__cal.svg) no-repeat center;
  opacity: 0.9;
  cursor: pointer;
`;

const CalendarBg = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`;

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
  input {
    color: #3b3e4a;
  }
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
  text-align: center;
  cursor: pointer;
`;

const SalesSelect = styled.select<{ salesType: SalesType }>`
  width: 100%;
  display: block;
  height: 6rem;
  color: ${({ salesType }) => (salesType === SalesType.sell ? "#F02828" : "#0778DF")};
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
`;

const Flex = styled.div`
  display: flex;
`;

const RightColumn = styled.div`
  position: relative;
  flex: none;
  width: 22rem;
`;

const LeftColumn = styled.div`
  position: relative;
  margin-right: 1.6rem;
  flex: 1 0 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  display: block;
`;

export default Create;
