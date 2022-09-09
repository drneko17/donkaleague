import type { AppProps } from "next/app";
import Head from "next/head";

import Layout from "../components/navigation/Layout";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <meta name="viewport" content="width=device-width" />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;

//viewport-fit=cover
