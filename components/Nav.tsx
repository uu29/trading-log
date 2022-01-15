import { useMemo } from "react";
import styled from "@emotion/styled";
import { IconTdLog, IconRep, IconCal, IconCalActive, IconPortfolio, IconPortfolioActive, IconRepActive, IconTdLogActive } from "svgs";
import Link from "next/link";
import { useRouter } from "next/router";

const mns = [
  {
    title: "매매일지",
    pathname: "/",
    iconEl: <IconTdLog />,
    iconElActive: <IconTdLogActive />,
    iconOption: { style: { margin: "-7px 4px 0 0" } },
  },
  { title: "종목분석", pathname: "/reports", iconEl: <IconRep />, iconElActive: <IconRepActive /> },
  { title: "포트폴리오", pathname: "/portfolio", iconEl: <IconPortfolio />, iconElActive: <IconPortfolioActive /> },
  { title: "일정관리", pathname: "/calendar", iconEl: <IconCal />, iconElActive: <IconCalActive /> },
];

const Nav = () => {
  const { pathname } = useRouter();
  const nowPath = useMemo(() => pathname.split("/")[1], [pathname]);
  const isActive = (path: string): boolean => path.split("/")[1] === nowPath;
  return (
    <NavWrap>
      <Mn>
        {mns.map((menu) => (
          <li key={menu.title}>
            <Link href={menu.pathname} passHref>
              <LinkItem isActive={isActive(menu.pathname)}>
                <IconWrap {...menu.iconOption}>{isActive(menu.pathname) ? menu.iconElActive : menu.iconEl}</IconWrap>
                {menu.title}
              </LinkItem>
            </Link>
          </li>
        ))}
      </Mn>
    </NavWrap>
  );
};

const NavWrap = styled.nav`
  position: fixed;
  z-index: 10;
  width: 100%;
  left: 0;
  bottom: 0;
  border-top: 2px solid #dee0e9;
  background: #e9eaef;
  box-shadow: 0 -5px 50px -24px rgba(0, 0, 0, 0.5);
`;

const Mn = styled.ul`
  max-width: 76.8rem;
  margin: auto;
  padding: 0 1.6rem;
  height: 5.2rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  > li {
    flex: 1;
    margin-right: 0.5rem;
    height: 100%;
  }
`;

const LinkItem = styled.a<{ isActive: boolean }>`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 1.5rem;
  &:hover {
    background-color: #e3e4e9;
  }
  ${({ isActive }) => isActive && "color: #2D96F6"};
  transition: all 0.2s;
`;

const IconWrap = styled.span`
  margin-right: 0.8rem;
`;

export default Nav;
