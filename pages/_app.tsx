import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <style jsx global>{`
        html,
        body {
          background-color: #f8f9fa;
          margin: 0;
          padding: 0;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
}

export default MyApp;
