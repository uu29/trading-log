import { AppProps } from "next/app";
import wrapper from "store";
import Nav from "components/common/Nav";
import Header from "components/common/Header";
import styled from "@emotion/styled";
import GlobalStyles from "styles/GlobalStyles";
import ToastContainer from "components/common/toast/ToastContainer";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      {!pageProps.hideHeader && <Header />}
      <OuterWrap>
        <ComponentOuterWrap>
          <ComponentInnerWrap>
            <Component {...pageProps} />
          </ComponentInnerWrap>
        </ComponentOuterWrap>
        {!pageProps.hideNav && <Nav />}
        <ToastContainer />
      </OuterWrap>
    </>
  );
}

const OuterWrap = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 5.4rem);
  overflow: hidden;
  background-color: #e9eaef;
`;

const ComponentOuterWrap = styled.div`
  position: relative;
  flex: 1 0 0;
  width: 100%;
  margin-bottom: 5.4rem;
`;

const ComponentInnerWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 76.8rem;
  height: 100%;
`;

export default wrapper.withRedux(App);
