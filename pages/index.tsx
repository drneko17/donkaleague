import type { NextPage } from "next";
import Image from "next/image";

import SearchForm from "../components/summoner-components/SearchForm";

const Home: NextPage = () => {
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
