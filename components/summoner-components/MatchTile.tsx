import formatUnicorn from "format-unicorn/safe";
import Image from "next/image";
import { useEffect, useState, useCallback, useContext } from "react";
import Link from "next/link";
import date from "date-and-time";
import { useRouter } from "next/router";

import { CHAMPION_ICON, ITEM_IMAGE } from "../../public/constants";
import { MatchDataType } from "../../types/summonerTypes";
import useGetSummonerSPellUrlInABetterWay from "../../hooks/useGetSummonerSpellUrlInABetterWay";
import useGetRunesUrls from "../../hooks/useGetRunesUrls";
import useGetRegion from "../../hooks/useGetRegion";
import VersionContext from "../../context/version-context";
import Loading from "../shared/Loading";

const MatchTile: React.FC<{
  match: MatchDataType;
  userId: string;
  server: string;
}> = ({ match, userId, server }) => {
  const version = useContext(VersionContext);
  const router = useRouter();
  const region = useGetRegion(server);
  const [primaryTree, setPrimaryTree] = useState({
    styleUrl: "",
    runesUrls: [],
  });
  const [secondaryTree, setSecondaryTree] = useState({
    styleUrl: "",
    runesUrls: [],
  });
  const [summonerSpell1Url, setSummonerSpell1Url] = useState("");
  const [summonerSpell2Url, setSummonerSpell2Url] = useState("");

  const lookedUpPlayer = match.info.participants.find(
    (player) => player.puuid === userId
  );

  const fetchRunesUrlsHandler = useCallback(async () => {
    const resultPrimary: any = await useGetRunesUrls(
      lookedUpPlayer!.perks.styles[0],
      version
    );
    setPrimaryTree(resultPrimary);
    const resultSecondary: any = await useGetRunesUrls(
      lookedUpPlayer!.perks.styles[1],
      version
    );
    setSecondaryTree(resultSecondary);
  }, []);

  console.log(lookedUpPlayer);

  const fetchSummonerSpellsUrlsHandler = useCallback(async () => {
    const result1 = await useGetSummonerSPellUrlInABetterWay(
      lookedUpPlayer!.summoner1Id,
      version
    );
    setSummonerSpell1Url(result1);
    const result2 = await useGetSummonerSPellUrlInABetterWay(
      lookedUpPlayer!.summoner2Id,
      version
    );
    setSummonerSpell2Url(result2);
  }, []);

  useEffect(() => {
    fetchRunesUrlsHandler();
    fetchSummonerSpellsUrlsHandler();
  }, [fetchRunesUrlsHandler, fetchSummonerSpellsUrlsHandler]);

  const lookedUpPlayerItems = [
    lookedUpPlayer!.item0,
    lookedUpPlayer!.item1,
    lookedUpPlayer!.item2,
    lookedUpPlayer!.item3,
    lookedUpPlayer!.item4,
    lookedUpPlayer!.item5,
    lookedUpPlayer!.item6,
  ];

  let gameStatus: string;
  lookedUpPlayer!.win ? (gameStatus = "Victory") : (gameStatus = "Defeat");

  const team1 = match.info.participants.slice(0, 5);
  const team2 = match.info.participants.slice(5, 10);

  const creationDate = new Date(match.info.gameCreation);
  const readableCreationDate = creationDate.toLocaleString();

  const gameDuration = `${Math.floor(match.info.gameDuration / 60)}m ${
    match.info.gameDuration % 60
  }s`;

  // console.log(primaryTree);

  return (
    <div
      onClick={() => {
        router.push(`/match/${region}/${match.metadata.matchId}`);
      }}
      className={`flex items-center p-2 mb-4 rounded-2xl drop-shadow-lg text-my-white ${
        lookedUpPlayer!.win
          ? "bg-[rgba(12,79,117,0.75)]"
          : "bg-[rgba(117,12,66,0.75)]"
      }`}
    >
      {/* GAME STATS */}
      <section className="flex flex-col w-24 justify-center items-center">
        <div>{match.info.gameMode}</div>
        {/* <div className="text-xs">{creationDate.toLocaleString()}</div> */}
        <div className="text-center">
          <div className="text-xs">{date.format(creationDate, "HH:mm:ss")}</div>
          <div className="text-xs">
            {date.format(creationDate, "DD/MM/YYYY")}
          </div>
        </div>
        <div className="bg-slate-700 w-16 h-[1px] my-1" />
        <div>{gameStatus}</div>
        <div>{gameDuration}</div>
      </section>
      {/* PLAYER SECTION */}

      <section className="flex flex-col w-72 ml-2">
        <div className="flex w-full items-center space-x-1">
          <Image
            src={formatUnicorn(CHAMPION_ICON, {
              champion: lookedUpPlayer!.championName,
              gameVersion: version,
            })}
            width={64}
            height={64}
            className="rounded-full"
            layout="fixed"
          />
          <div className="flex flex-col">
            <Image
              src={summonerSpell1Url}
              width={32}
              height={32}
              className="rounded-xl"
              layout="fixed"
            />
            <Image
              src={summonerSpell2Url}
              width={32}
              height={32}
              className="rounded-xl"
              layout="fixed"
            />
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={`https://ddragon.canisback.com/img/${primaryTree.runesUrls[0]}`}
              width={32}
              height={32}
              className="rounded-xl"
              layout="fixed"
            />

            <Image
              src={`https://ddragon.canisback.com/img/${secondaryTree.styleUrl}`}
              width={24}
              height={24}
              className="rounded-xl"
              layout="fixed"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <div>{lookedUpPlayer!.kills}</div>
              <div>/</div>
              <div>{lookedUpPlayer!.deaths}</div>
              <div>/</div>
              <div>{lookedUpPlayer!.assists}</div>
            </div>
            <div className="text-sm">
              {(
                (lookedUpPlayer!.kills + lookedUpPlayer!.assists) /
                lookedUpPlayer!.deaths
              ).toFixed(2)}{" "}
              KDA
            </div>
          </div>
        </div>
        <div className="mt-3">
          {lookedUpPlayerItems.map((item) => (
            <Image
              key={`${item}${match.info.gameId}`}
              src={formatUnicorn(ITEM_IMAGE, {
                item: item,
                gameVersion: version,
              })}
              width={32}
              height={32}
              className="rounded-md"
            />
          ))}
        </div>
      </section>

      {/* TEAMS SECTION */}
      <section className="xl:w-80 w-[504px] xl:ml-[25%] hidden md:block">
        <div className="flex justify-around">
          <div className="w-36 flex flex-col">
            {team1.map((participant) => (
              <div
                key={`${participant.summonerName}${match.info.gameId}`}
                className={`flex items-center space-x-1 w-64 ${
                  participant.puuid === lookedUpPlayer!.puuid ? "font-bold" : ""
                }`}
              >
                <Image
                  src={formatUnicorn(CHAMPION_ICON, {
                    champion: participant.championName,
                    gameVersion: version,
                  })}
                  width={20}
                  height={20}
                  layout="fixed"
                  className="rounded-full"
                />
                <Link href={`/summoner/${server}/${participant.summonerName}`}>
                  <div className="hover:underline hover:cursor-pointer">
                    {participant.summonerName}
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="w-36">
            {team2.map((participant) => (
              <div
                key={`${participant.summonerName}${match.info.gameId}`}
                className={`flex items-center space-x-1 w-64 ${
                  participant.puuid === lookedUpPlayer!.puuid ? "font-bold" : ""
                }`}
              >
                <Image
                  src={formatUnicorn(CHAMPION_ICON, {
                    champion: participant.championName,
                    gameVersion: version,
                  })}
                  width={20}
                  height={20}
                  layout="fixed"
                  className="rounded-full"
                />
                <Link href={`/summoner/${server}/${participant.summonerName}`}>
                  <div className="hover:underline hover:cursor-pointer">
                    {participant.summonerName}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MatchTile;
