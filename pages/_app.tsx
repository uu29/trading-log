import { AppProps } from "next/app";
import Nav from "components/Nav";
import Header from "components/Header";
import styled from "@emotion/styled";
import GlobalStyles from "styles/GlobalStyles";
import ToastContainer from "components/common/toast/ToastContainer";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Header />
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
  overflow-y: auto;
`;

const ComponentInnerWrap = styled.div`
  margin: auto;
  padding: 0 1.6rem;
  max-width: 76.8rem;
  display: flex;
  flex-direction: column;
`;

export default App;
