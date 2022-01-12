import useForm from "hooks/useForm";
import styled from "@emotion/styled";
import { cx, css } from "@emotion/css";

const form_input_style = css`
  border: 1px solid #dee0e9;
  background: #fff;
  border-radius: 0.8rem;
  padding: 1.6rem;
  font-size: 2.4rem;
`;

const input__number = css`
  text-align: right;
`;

const input__btn = css`
  display: inline-block;
  width: 5rem;
  height: 5rem;
  text-indent: -9999px;
  outline: 0 none;
  border: 1px solid #bcc0d0;
  cursor: pointer;
  background-color: #fafafc;
  background-repeat: no-repeat;
  background-position: center;
`;

const btn__minus = css`
  border-radius: 4px 0 0 4px;
  margin-right: 2px;
  background-image: url(/images/btn__control-minus.svg);
`;

const btn__plus = css`
  border-radius: 0 4px 4px 0;
  background-image: url(/images/btn__control-plus.svg);
`;

const currency__btn = css`
  flex: 1 0 0;
  height: 5.6rem;
  border-radius: 0.8rem;
  font-size: 2.2rem;
  border: 1px solid #bcc0d0;
  color: #a5abc3;
  &:first-of-type {
    margin-right: 1.6rem;
  }
`;

interface IValue {
  name: string;
  count: number;
  average: number;
}

const initialValue: IValue = { name: "", count: 0, average: 0 };

const PortCreate = () => {
  const { form, handleChange } = useForm<IValue>({ initialValue });
  return (
    <section>
      <Form method="post">
        <div className="flex__full">
          <Label htmlFor="name">종목 이름</Label>
          <Input type="text" id="name" name="name" value={form.name} onChange={handleChange} className={form_input_style} />
          <Label htmlFor="count">구매 수량</Label>
          <Flex>
            <InputDate
              type="number"
              id="count"
              name="count"
              value={form.count}
              onChange={handleChange}
              className={cx(form_input_style, input__number)}
            />
            <ControlBtns>
              <button type="button" className={cx(input__btn, btn__minus)}>
                1개 삭제
              </button>
              <button type="button" className={cx(input__btn, btn__plus)}>
                1개 추가
              </button>
            </ControlBtns>
          </Flex>
          <Label htmlFor="currency">통화 선택</Label>
          <Flex>
            <button type="button" className={cx(currency__btn)}>
              <IconChk />
              달러(USD)
            </button>
            <button type="button" className={cx(currency__btn)}>
              <IconChk />
              원(KRW)
            </button>
          </Flex>
          <Label htmlFor="average">평균 단가</Label>
          <Input
            type="number"
            id="average"
            name="average"
            value={form.average}
            onChange={handleChange}
            className={cx(form_input_style, input__number)}
          />
        </div>
        <SubmitBtn>완료</SubmitBtn>
      </Form>
    </section>
  );
};

const SubmitBtn = styled.button`
  flex: none;
  margin-top: 1.6rem;
  display: block;
  width: 100%;
  height: 6rem;
  font-size: 1.8rem;
  border-radius: 0.8rem;
  background: #f9902f;
  color: #fff;
  text-align: center;
  transition: all 0.2s;
  box-shadow: 0 0 4rem -2rem rgba(0, 0, 0, 0.15);
  &:hover {
    background: #fb973b;
  }
`;

const Label = styled.label`
  display: inline-block;
  color: #6a6e7a;
  margin: 2.3rem 0 0.8rem;
  font-size: 1.8rem;
`;

const Form = styled.form`
  padding: 0 2rem 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100vh - 146px);
  .flex__full {
    flex: 1 0 0;
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
  color: #5e5e5e;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const ControlBtns = styled.div`
  margin-left: 1rem;
  height: 5rem;
  flex: none;
`;

const IconChk = styled.span`
  display: inline-block;
  margin-right: 1rem;
  width: 2rem;
  height: 2rem;
  background: url(/images/ico__check.svg) no-repeat left;
  transform: translateY(3px);
`;

export default PortCreate;
