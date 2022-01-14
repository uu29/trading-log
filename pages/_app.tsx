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
      <OuterWrap>
        <Header />
        <ComponentOuterWrap>
          <ComponentInnerWrap>
            <Component {...pageProps} />
          </ComponentInnerWrap>
        </ComponentOuterWrap>
        {!pageProps.hideNav && <Nav />}
        <div id="modal"></div>
        <ToastContainer />
      </OuterWrap>
    </>
  );
}

const OuterWrap = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
  padding-bottom: 5.4rem;
  background-color: #e9eaef;
`;

const ComponentOuterWrap = styled.div`
  flex: 1 0 0;
  width: 100%;
  overflow-y: auto;
`;

const ComponentInnerWrap = styled.div`
  max-width: 76.8rem;
  margin: auto;
  min-height: calc(100vh - 5.4rem - 9.6rem);
  overflow-y: auto;
  position: relative;
`;

export default App;
