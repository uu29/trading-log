import styled from "@emotion/styled";
import { css } from "@emotion/css";
import Link from "next/link";

const text = css`
  color: #3b3e4a;
  font-size: 1.8rem;
`;

const link_create = css`
  display: block;
  width: 24rem;
  height: 5.6rem;
  background: #f9902f;
  color: #fff;
  text-align: center;
  line-height: 5.6rem;
  border-radius: 1rem;
  font-size: 2rem;
`;

const Portfolio = () => {
  return (
    <Section>
      <p className={text}>
        내가 가진 종목 추가해서
        <br />
        <strong>포트폴리오</strong>를 만들어보세요.
      </p>
      <Link href="/portfolio/create">
        <a className={link_create}>내 종목 추가하기</a>
      </Link>
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 8rem;
  width: 86%;
  margin: 2.5rem auto;
  min-height: 58rem;
  text-align: center;
  background: #f2f3f8 url(/images/bg__empty-chart.svg) no-repeat center;
  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.01);
  border-radius: 2rem;
`;

export default Portfolio;
