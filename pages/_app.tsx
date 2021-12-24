import { AppProps } from "next/app";
import Nav from "components/Nav";
import styled from "@emotion/styled";
import GlobalStyles from "styles/GlobalStyles";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <RspWrap>
        {!pageProps.hideNav && <Nav />}
        <Component {...pageProps} />
        <div id="modal"></div>
      </RspWrap>
    </>
  );
}

const RspWrap = styled.div`
  max-width: 76.8rem;
  margin: auto;
  min-height: 100vh;
  background-color: #e9eaef;
  overflow-y: hidden;
  position: relative;
`;

export default App;
