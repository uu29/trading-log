import styled from "@emotion/styled";
import { Logo, IcTdLog, IcRep, IcCal } from "svgs";
import Link from "next/link";

const Nav = () => (
  <Hd>
    <H1Wrap>
      <LgWrap>
        <Logo />
      </LgWrap>
      <H1>개미 매매일지</H1>
    </H1Wrap>
    <nav>
      <Mn>
        <li>
          <Link href="/daily-log">
            <a>
              <IcWrap style={{ margin: "-.7rem .4rem 0 0" }}>
                <IcTdLog />
              </IcWrap>
              매매일지
            </a>
          </Link>
        </li>
        <li>
          <Link href="/reports">
            <a>
              <IcWrap>
                <IcRep />
              </IcWrap>
              종목분석
            </a>
          </Link>
        </li>
        <li>
          <Link href="/calendar">
            <a>
              <IcWrap>
                <IcCal />
              </IcWrap>
              일정관리
            </a>
          </Link>
        </li>
      </Mn>
    </nav>
  </Hd>
);

const Hd = styled.header`
  text-align: center;
  box-shadow: 0 5px 50px -24px rgba(0, 0, 0, 0.15);
`;

const H1Wrap = styled.div`
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

const Mn = styled.ul`
  padding: 0 1.6rem;
  height: 5.2rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-top: 1px solid #dee0e9;
  border-bottom: 1px solid #dee0e9;
  > li {
    flex: 1;
    margin-right: 0.5rem;
    height: 100%;
    > a {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
      padding: 0 1.5rem;
      &:hover {
        background-color: #e3e4e9;
      }
      transition: all 0.2s;
    }
  }
`;

const IcWrap = styled.span`
  margin-right: 0.8rem;
`;

export default Nav;
