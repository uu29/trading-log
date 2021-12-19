import styled from "@emotion/styled";
import { cx, css } from "@emotion/css";
import { Logo } from "svgs";
import Image from "next/image";

const login__btn = css`
  display: block;
  max-width: 30rem;
  height: 4.5rem;
  margin: 1.6rem auto;
  width: 100%;
  line-height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const login__logo = css`
  flex: none;
  display: flex;
  margin: 1.2rem;
  align-items: center;
`;

const Login = () => {
  return (
    <Section>
      <Logo />
      <Title>개미 매매일지</Title>
      <OauthWrap>
        <GGLBtn type="button" className={login__btn}>
          <span className={login__logo}>
            <Image src="/images/logo__google.svg" alt="google logo" width={18} height={18} />
          </span>
          구글로 로그인
        </GGLBtn>
        <KKOBtn type="button" className={login__btn}>
          <span className={login__logo}>
            <Image src="/images/logo__kakao.svg" alt="kakao logo" width={18} height={16.65} />
          </span>
          카카오로 로그인
        </KKOBtn>
        <NVRBtn type="button" className={login__btn}>
          <span className={login__logo}>
            <Image src="/images/logo__naver.svg" alt="naver logo" width={15} height={14.88} />
          </span>
          네이버로 로그인
        </NVRBtn>
        <APLBtn type="button" className={login__btn}>
          <span className={login__logo}>
            <Image src="/images/logo__apple.svg" alt="apple logo" width={16} height={19.95} />
          </span>
          애플로 로그인
        </APLBtn>
      </OauthWrap>
    </Section>
  );
};

const OauthWrap = styled.div`
  margin-top: 12rem;
  width: 100%;
`;

const GGLBtn = styled.button`
  background: #fff;
`;
const KKOBtn = styled.button`
  background: #fee500;
  color: #181600;
`;
const NVRBtn = styled.button`
  background: #03c75a;
  color: #fff;
`;
const APLBtn = styled.button`
  background: #000;
  color: #fff;
`;

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
