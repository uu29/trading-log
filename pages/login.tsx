import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import styled from "@emotion/styled";
import { cx, css } from "@emotion/css";
import { Logo } from "svgs";
import Image from "next/image";
import { GoogleLogin } from "react-google-login";
import { firebaseApp } from "firebase.config";
import { getFirestore, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { signIn } from "next-auth/react";
import { checkIsExist } from "core/firestore/auth";
import { toast } from "@toast-controller";
const db = getFirestore(firebaseApp);
const collection_name = "members";

const btn__google = css`
  background: #fff;
`;

// const btn__kakao = css`
//   background: #fee500;
//   color: #181600;
// `;

// const btn__naver = css`
//   background: #03c75a;
//   color: #fff;
// `;

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
  font-size: 1.6rem;
`;

const login__logo = css`
  flex: none;
  display: flex;
  margin: 1.2rem;
  align-items: center;
`;

const createSession = () => {
  signIn("google", { callbackUrl: "http://localhost:3000/" });
};

const successCb = async (profileObj: any) => {
  if (!profileObj) return;
  const { email, name } = profileObj;
  checkIsExist(email).then((is_exist) => {
    if (is_exist) createSession();
    else {
      const reg_date = Timestamp.fromDate(new Date());
      const newUserRefDoc = doc(collection(db, collection_name));

      // id 자동 생성 후 회원가입하기
      const data = { name, email, reg_date };
      setDoc(newUserRefDoc, data)
        .then(() => {
          toast.show({ message: "회원가입이 완료되었습니다.", type: "success" });
          createSession();
        })
        .catch((err) => {
          console.log("!!!!!!!!error!!!!!!!!");
          console.log(err);
        });
    }
  });
};

const GoogleBtn = () => {
  const responseGoogle = async (response: any) => {
    successCb(response.profileObj);
  };

  const failureGoogle = ({ error, details }: any) => {
    console.log("[failure]");
    console.log(error);
    console.log(details);
  };

  return (
    <GoogleLogin
      clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_KEY ?? ""}
      render={(renderProps) => (
        <button type="button" className={cx(login__btn, btn__google)} onClick={renderProps.onClick} disabled={renderProps.disabled}>
          <span className={login__logo}>
            <Image src="/images/logo__google.svg" alt="google logo" width={18} height={18} />
          </span>
          구글로 로그인
        </button>
      )}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={failureGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

// const KakaoBtn = () => {
//   return (
//     <button type="button" className={cx(login__btn, btn__kakao)}>
//       <span className={login__logo}>
//         <Image src="/images/logo__kakao.svg" alt="kakao logo" width={18} height={16.65} />
//       </span>
//       카카오로 로그인
//     </button>
//   );
// };

// const NaverBtn = () => {
//   return (
//     <button type="button" className={cx(login__btn, btn__naver)}>
//       <span className={login__logo}>
//         <Image src="/images/logo__naver.svg" alt="naver logo" width={15} height={14.88} />
//       </span>
//       네이버로 로그인
//     </button>
//   );
// };

const Login = () => {
  return (
    <Section>
      <Logo />
      <Title>개미 매매일지</Title>
      <OauthWrap>
        <GoogleBtn />
        {/* <KakaoBtn />
        <NaverBtn /> */}
      </OauthWrap>
    </Section>
  );
};

const OauthWrap = styled.div`
  margin-top: 12rem;
  width: 100%;
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return { props: { hideNav: true, hideHeader: true } };
};

export default Login;
