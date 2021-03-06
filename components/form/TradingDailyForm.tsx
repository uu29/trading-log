import React, { useMemo, useState, useCallback } from "react";
import { useRouter } from "next/router";
import useForm from "hooks/useForm";
import styled from "@emotion/styled";
import { cx, css } from "@emotion/css";
import CalendarForm from "components/form/CalendarForm";
import { formatDate, strDateToTimestamp } from "core/firestore/timestamp";
import { deleteDocData, setDocData } from "core/firestore";
import { toast } from "@toast-controller";
import LoadingOverlay from "components/common/loading/LoadingOverlay";
import { TradingType, TradingTypes } from "interface";
import { ITdCreateParams, ITdCreateForm } from "interface";

const COL_NAME = "user_trading_daily";

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

interface TradingDailyFormProps {
  initialForm: ITdCreateParams;
  showDelBtn?: boolean;
}

const TradingDailyForm = ({ initialForm, showDelBtn }: TradingDailyFormProps) => {
  const router = useRouter();
  const { form, updateForm, handleChange, initForm } = useForm<ITdCreateParams>({ initialForm });
  const unique_key = form.stock_name + form.user_email;
  const [openCalendar, setOpenCalendar] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const initDateSec = useMemo(() => strDateToTimestamp(form.trading_date).seconds, [form.trading_date]);

  const changeDateCb = useCallback(
    (sec: number) => {
      const changedDate = formatDate(new Date(sec * 1000), "%Y/%m/%d");
      updateForm({ trading_date: changedDate });
    },
    [updateForm]
  );

  const toggleDate = () => {
    setOpenCalendar(!openCalendar);
  };

  const closeCalendar = () => {
    setOpenCalendar(false);
  };

  const handleClickDelete = () => {
    const confirmed = confirm("?????? ?????????????????????????");
    if (confirmed) {
      deleteDocData(COL_NAME, unique_key)
        .then(() => {
          toast.show({ message: "?????????????????????.", type: "success" });
          initForm();
          router.push("/");
        })
        .catch(() => {
          toast.show({ message: "?????? ??????. ?????? ??????????????????.", type: "fail" });
        });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const new_form: ITdCreateForm = {
      ...form,
      trading_date: strDateToTimestamp(form.trading_date),
    };

    if (submitting) return;
    setSubmitting(true);
    setDocData<ITdCreateForm>(COL_NAME, unique_key, new_form)
      .then(() => {
        toast.show({ message: "?????????????????????.", type: "success" });
        initForm();
        router.push("/");
      })
      .catch(() => {
        toast.show({ message: "?????? ??????. ?????? ??????????????????.", type: "fail" });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <FormWrap>
      {submitting && <LoadingOverlay msg="?????????" />}
      <form method="post" onSubmit={handleSubmit}>
        <Label htmlFor="stock_name">?????? ??????</Label>
        <Input type="text" id="stock_name" name="stock_name" value={form.stock_name} onChange={handleChange} className={form_input_style} />
        <Flex>
          <LeftColumn>
            <Label htmlFor="trading_date">?????? ??????</Label>
            <CalIcon onClick={toggleDate} />
            <InputDate
              type="text"
              id="trading_date"
              name="trading_date"
              value={form.trading_date || formatDate(new Date(), "%Y/%m/%d")}
              onClick={toggleDate}
              className={form_input_style}
              readOnly
            />
            {openCalendar && (
              <>
                <CalendarForm changeDateCb={changeDateCb} initDateSec={initDateSec} />
                <CalendarBg onClick={closeCalendar} />
              </>
            )}
          </LeftColumn>
          <RightColumn>
            <Label htmlFor="trading_type">??????/??????</Label>
            <SelectBtn />
            <SalesSelect
              className={form_input_style}
              salesType={form.trading_type}
              value={form.trading_type}
              id="trading_type"
              name="trading_type"
              onChange={handleChange}
            >
              <option value={TradingTypes.buy}>{TradingTypes.buy}</option>
              <option value={TradingTypes.sell}>{TradingTypes.sell}</option>
            </SalesSelect>
            <input type="text" id="trading_type" name="trading_type" value={form.trading_type} onChange={handleChange} hidden />
          </RightColumn>
        </Flex>
        <Flex>
          <LeftColumn>
            <Label htmlFor="price">??????</Label>
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
            <Label htmlFor="stock_amount">??????</Label>
            <Input
              type="text"
              id="stock_amount"
              name="stock_amount"
              value={form.stock_amount}
              onChange={handleChange}
              className={cx(form_input_style, number_input_style)}
            />
          </RightColumn>
        </Flex>
        <Label htmlFor="description">?????? ??????</Label>
        <TextArea
          id="description"
          name="description"
          rows={5}
          cols={33}
          value={form.description}
          onChange={handleChange}
          className={form_input_style}
        />
        <BtnLine>
          {showDelBtn && (
            <DelBtn type="button" onClick={handleClickDelete}>
              ??????
            </DelBtn>
          )}
          <SubmitBtn>????????????</SubmitBtn>
        </BtnLine>
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
  z-index: 11;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`;

const BtnLine = styled.div`
  margin-top: 1.6rem;
  display: flex;
  height: 6rem;
  color: #fff;
`;

const DelBtn = styled.button`
  display: inline-block;
  margin-right: 1rem;
  width: 12%;
  background: #df4d44;
  font-size: 1.8rem;
  border-radius: 0.8rem;
  &:hover {
    background: #d13e34;
  }
`;

const SubmitBtn = styled.button`
  flex: 1 0 0;
  font-size: 1.8rem;
  border-radius: 0.8rem;
  background: #2d96f6;
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
  margin: 0 0 1.6rem;
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

const SalesSelect = styled.select<{ salesType: TradingType }>`
  width: 100%;
  display: block;
  height: 6rem;
  color: ${({ salesType }) => (salesType === TradingTypes.sell ? "#F02828" : "#0778DF")};
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

export default TradingDailyForm;
