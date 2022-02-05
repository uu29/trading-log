import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";
import { ISessionUser } from "interface";
import styled from "@emotion/styled";

const UserProfileImg = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.9999 1.33334C24.1001 1.33334 30.6666 7.89983 30.6666 16C30.6666 24.1002 24.1001 30.6667 15.9999 30.6667C7.89974 30.6667 1.33325 24.1002 1.33325 16C1.33325 7.89983 7.89974 1.33334 15.9999 1.33334ZM15.9999 4.00001C9.3725 4.00001 3.99992 9.37259 3.99992 16C3.99992 22.6274 9.3725 28 15.9999 28C22.6273 28 27.9999 22.6274 27.9999 16C27.9999 9.37259 22.6273 4.00001 15.9999 4.00001ZM21.2629 19.4741C21.9215 19.8034 22.1885 20.6043 21.8592 21.263C21.6224 21.7365 21.1732 22.3707 20.4691 22.9966C19.2987 24.0369 17.8029 24.6667 15.9999 24.6667C14.1969 24.6667 12.7011 24.0369 11.5308 22.9966C10.8267 22.3707 10.3774 21.7365 10.1407 21.263C9.81136 20.6043 10.0783 19.8034 10.737 19.4741C11.3486 19.1683 12.0828 19.3767 12.4483 19.9353L12.5258 20.0704C12.6224 20.2635 12.8815 20.6293 13.3024 21.0035C14.007 21.6298 14.8863 22 15.9999 22C17.1136 22 17.9928 21.6298 18.6974 21.0035C19.0582 20.6828 19.3001 20.3682 19.4227 20.1633L19.474 20.0704C19.8033 19.4118 20.6042 19.1448 21.2629 19.4741ZM20.6666 10.6667C21.3504 10.6667 21.9139 11.1814 21.9909 11.8445L21.9999 12V12.6667C21.9999 13.4031 21.403 14 20.6666 14C19.9828 14 19.4192 13.4853 19.3422 12.8222L19.3333 12.6667V12C19.3333 11.2636 19.9302 10.6667 20.6666 10.6667ZM11.3333 10.6667C12.017 10.6667 12.5806 11.1814 12.6576 11.8445L12.6666 12V12.6667C12.6666 13.4031 12.0696 14 11.3333 14C10.6495 14 10.0859 13.4853 10.0089 12.8222L9.99992 12.6667V12C9.99992 11.2636 10.5969 10.6667 11.3333 10.6667Z"
      fill="#8087A6"
    />
  </svg>
);

const UserProfileWrap = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 5.6rem;
  height: 5.6rem;
  background: #fff;
`;

const UserProfile = () => (
  <UserProfileWrap>
    <UserProfileImg />
  </UserProfileWrap>
);

interface IUserProps {
  session_user: ISessionUser;
}

const Users = ({ session_user }: IUserProps) => {
  const email = session_user?.email ?? "";

  const handleClickLogout = () => {
    signOut();
  };

  return (
    <UsersWrap>
      <FlexFull>
        <UserProfile />
        <Email>{email}</Email>
      </FlexFull>
      <LogoutBtn type="button" onClick={handleClickLogout}>
        로그아웃
      </LogoutBtn>
    </UsersWrap>
  );
};

const UsersWrap = styled.div`
  flex: 1 0 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FlexFull = styled.div`
  flex: 1 0 0;
`;

const LogoutBtn = styled.button`
  padding: 2rem;
  border-top: 1px solid #cdd0dd;
  font-size: 1.8rem;
`;

const Email = styled.div`
  margin-top: 1.6rem;
  font-size: 1.8rem;
`;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const session_user = session?.user ?? null;
  if (!session && !session_user)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return { props: { session_user } };
};

export default Users;
