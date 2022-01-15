import styled from "@emotion/styled";
import Link from "next/link";
import { Logo } from "svgs";

const Header = () => (
  <Hd>
    <Link href="/" passHref>
      <H1Wrap>
        <LgWrap>
          <Logo />
        </LgWrap>
        <H1>개미 매매일지</H1>
      </H1Wrap>
    </Link>
  </Hd>
);

const Hd = styled.header`
  text-align: center;
  border-bottom: 2px solid #dee0e9;
  background: #e9eaef;
`;

const H1Wrap = styled.a`
  display: inline-block;
  padding: 1.5rem;
  font-size: 2.8rem;
`;

const H1 = styled.h1`
  display: inline-block;
  margin-top: 0.5rem;
  color: #000;
`;

const LgWrap = styled.span`
  margin-right: 1rem;
`;

export default Header;
