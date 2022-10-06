import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import Image from "next/image";

import Loading from "../shared/Loading";

const SearchForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const router = useRouter();

  const summonerNameRef = useRef<HTMLInputElement>(null);
  const serverRef = useRef<HTMLSelectElement>(null);

  const formSubmitHandler = (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    const name = summonerNameRef.current!.value;
    const server = serverRef.current!.value;
    if (name.length === 0) {
      setIsNameError(true);
      setIsLoading(false);
    } else {
      router.push(`/summoner/${server}/${name}`);
    }
  };

  const optionClass = "bg-[#616283]";

  return (
    <>
      <form
        onSubmit={formSubmitHandler}
        className="md:flex-row flex-col items-center drop-shadow-xl bg-my-gray md:px-8 rounded-lg flex w-9/12 max-w-[800px] text-[#F7F4F3]"
      >
        <div className="md:flex-row flex-col py-4 flex w-full md:w-9/12 space-x-4 items-center md:text-left text-center">
          <div className="flex flex-col w-9/12">
            <label htmlFor="summonerName" className="text-lg">
              Search
            </label>
            <input
              type="text"
              id="summonerName"
              placeholder="Summoner..."
              ref={summonerNameRef}
              className="border-none outline-none md:bg-transparent bg-[#374a67] md:rounded-none rounded-md p-2 md:p-0"
            ></input>
          </div>
          <div className="flex flex-col w-3/12">
            <label htmlFor="server" className="text-lg">
              Server
            </label>
            <div>
              <select
                id="server"
                name="server"
                ref={serverRef}
                className="rounded-md md:rounded-none p-2 md:p-0 bg-[#374a67] md:bg-transparent border-none outline-none"
              >
                <option value="EUW1" className={optionClass}>
                  EUW
                </option>
                <option value="EUN1" className={optionClass}>
                  EUNE
                </option>
                <option value="KR" className={optionClass}>
                  KR
                </option>
                <option value="NA1" className={optionClass}>
                  NA
                </option>
                <option value="BR1" className={optionClass}>
                  BR
                </option>
                <option value="JP1" className={optionClass}>
                  JP
                </option>
                <option value="LA1" className={optionClass}>
                  LA1
                </option>
                <option value="LA2" className={optionClass}>
                  LA2
                </option>
                <option value="OC1" className={optionClass}>
                  OCE
                </option>
                <option value="RU" className={optionClass}>
                  RU
                </option>
                <option value="TR1" className={optionClass}>
                  TR
                </option>
              </select>
            </div>
          </div>
        </div>
        <button className="w-3/12 pt-1">
          <Image src="/monkabus.png" height={72} width={99} />
        </button>
      </form>
      {isNameError && (
        <div className="mt-4 text-xl text-my-white">
          Please enter a summoner name!
        </div>
      )}
      {isLoading ? <Loading /> : ""}
      {/* <Loading /> */}
    </>
  );
};

export default SearchForm;
