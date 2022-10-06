import type { AppProps } from "next/app";
import Head from "next/head";

import Layout from "../components/navigation/Layout";
import { VersionContextProvider } from "../context/version-context";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <VersionContextProvider>
        <meta name="viewport" content="width=device-width" />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </VersionContextProvider>
    </>
  );
}

export default MyApp;

//viewport-fit=cover
