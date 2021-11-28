import { css, Global } from "@emotion/react";

const GlobalStyles = (props) => {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: "Noto Sans KR";
          font-style: light;
          font-weight: 300;
          font-display: fallback;
          src: local("Noto Sans KR Light"),
            url(https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&display=swap") format('otf');
        }
        @font-face {
          font-family: "Noto Sans KR";
          font-style: normal;
          font-weight: 400;
          font-display: fallback;
          src: local("Noto Sans KR Regular"),
            url(https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400&display=swap") format('otf');
        }
        @font-face {
          font-family: "Noto Sans KR";
          font-style: bold;
          font-weight: 500;
          font-display: fallback;
          src: local("Noto Sans KR Medium"),
            url(https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@500&display=swap") format('otf');
        }
        @font-face {
          font-family: "Noto Sans KR";
          font-style: bolder;
          font-weight: 600;
          font-display: fallback;
          src: local("Noto Sans KR Medium"),
            url(https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@600&display=swap") format('otf');
        }

        * {
          padding: 0;
          margin: 0;
        }
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
        *:focus {
          outline: 0;
          outline: none;
        }
        a {
          text-decoration: none;
          color: inherit;
          cursor: pointer;
        }
        button {
          background-color: transparent;
          color: inherit;
          border-width: 0;
          padding: 0;
          cursor: pointer;
          border-radius: 2px;
        }
        a:hover,
        a:active,
        button:hover,
        button:active {
          color: #2d96f6;
        }
        figure {
          margin: 0;
        }
        input::-moz-focus-inner {
          border: 0;
          padding: 0;
          margin: 0;
        }
        ul,
        ol,
        dd {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin: 0;
          font-size: inherit;
          font-weight: inherit;
        }
        p {
          margin: 0;
        }
        cite {
          font-style: normal;
        }
        fieldset {
          border-width: 0;
          padding: 0;
          margin: 0;
        }

        html {
          font-size: 10px;
        }

        body,
        div {
          font-size: 1.6rem;
          font-family: "Noto Sans KR", -apple-system, BlinkMacSystemFont, "맑은 고딕", "Malgun Gothic", sans-serif;
          color: #3b3e4a;
        }
      `}
    />
  );
};

export default GlobalStyles;
