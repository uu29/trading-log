import Link from "next/link";
import styled from "@emotion/styled";
const post_id = 13;

export default function List() {
  return (
    <LinkWrap>
      <Link href={{ pathname: "post", query: { id: post_id } }} passHref>
        <StyledA>jlory 블로그입니다.</StyledA>
      </Link>
    </LinkWrap>
  );
}

const LinkWrap = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;

const StyledA = styled.a`
  color: red;
`;
