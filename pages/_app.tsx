import { AppProps } from "next/app";
import Nav from "components/Nav";
import styled from "@emotion/styled";
import GlobalStyles from "styles/GlobalStyles";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <RspWrap>
        <Nav />
        <Component {...pageProps} />
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
`;

export default App;
