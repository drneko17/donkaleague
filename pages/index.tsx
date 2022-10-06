import type { NextPage } from "next";
import { useContext } from "react";
import Image from "next/image";
import Head from "next/head";

import SearchForm from "../components/summoner-components/SearchForm";
import VersionContext from "../context/version-context";

const Home: NextPage = () => {
  const version = useContext(VersionContext);
  console.log(version);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="drop-shadow-xl">
          <Image src="/monkabus.png" height={200} width={275} />
        </div>
        <SearchForm />
      </div>
    </>
  );
};

export default Home;
