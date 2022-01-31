import styled from "@emotion/styled";

const AddBtn = () => <Btn type="button">작성하기</Btn>;

const Btn = styled.button`
  margin: 1.6rem 0;
  position: absolute;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  max-width: 76.8rem;
  width: 100%;
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

export default AddBtn;
