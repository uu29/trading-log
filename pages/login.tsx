import styled from "@emotion/styled";
import { Logo } from "svgs";
const Login = () => {
  return (
    <Section>
      <Logo />
      <Title>개미 매매일지</Title>
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 1.6rem;
  margin: 0.5rem;
  color: #000;
`;

export async function getStaticProps() {
  return {
    props: { hideNav: true },
  };
}

export default Login;
