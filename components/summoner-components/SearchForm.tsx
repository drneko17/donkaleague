import { useRouter } from "next/router";
import React, { useRef } from "react";
import Image from "next/image";

const SearchForm: React.FC = () => {
  const router = useRouter();

  const summonerNameRef = useRef<HTMLInputElement>(null);
  const serverRef = useRef<HTMLSelectElement>(null);

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const name = summonerNameRef.current!.value;
    const server = serverRef.current!.value;
    router.push(`/summoner/${server}/${name}`);
  };

  return (
    <>
      <form
        onSubmit={formSubmitHandler}
        className="drop-shadow-xl bg-[#616283] px-8 rounded-lg flex  w-9/12 max-w-[800px]"
      >
        <div className="py-4 flex w-9/12 space-x-4">
          <div className="flex flex-col w-9/12">
            <label htmlFor="summonerName" className="text-lg">
              Search
            </label>
            <input
              type="text"
              id="summonerName"
              placeholder="Summoner..."
              ref={summonerNameRef}
              className="border-none outline-none bg-transparent"
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
                className="bg-transparent border-none outline-none"
              >
                <option value="BR1" className="bg-[#616283]">
                  BR1
                </option>
                <option value="EUN1" className="bg-[#616283]">
                  EUN1
                </option>
                <option value="EUW1" className="bg-[#616283]">
                  EUW1
                </option>
                <option value="JP1" className="bg-[#616283]">
                  JP1
                </option>
                <option value="KR" className="bg-[#616283]">
                  KR
                </option>
                <option value="LA1" className="bg-[#616283]">
                  LA1
                </option>
                <option value="LA2" className="bg-[#616283]">
                  LA2
                </option>
                <option value="NA1" className="bg-[#616283]">
                  NA1
                </option>
                <option value="OC1" className="bg-[#616283]">
                  OC1
                </option>
                <option value="RU" className="bg-[#616283]">
                  RU
                </option>
                <option value="TR1" className="bg-[#616283]">
                  TR1
                </option>
              </select>
            </div>
          </div>
        </div>
        <button className="w-3/12 pt-1">
          <Image src="/monkabus.png" height={72} width={99} />
        </button>
      </form>
    </>
  );
};

export default SearchForm;
