import formatUnicorn from "format-unicorn/safe";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

import { CHAMPION_ICON, ITEM_IMAGE } from "../../public/constants";
import { MatchDataType } from "../../types/summonerTypes";
import useGetSummonerSpellUrl from "../../hooks/useGetSummonerSpellUrl";
import useGetRunesUrls from "../../hooks/useGetRunesUrls";

const MatchTile: React.FC<{ match: MatchDataType; userId: string }> = ({
  match,
  userId,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [primaryTree, setPrimaryTree] = useState({
    styleUrl: "",
    runesUrls: [],
  });
  const [secondaryTree, setSecondaryTree] = useState({
    styleUrl: "",
    runesUrls: [],
  });
  //   console.log(match);

  const lookedUpPlayer = match.info.participants.find(
    (player) => player.puuid === userId
  );

  const fetchRunesUrlsHandler = useCallback(async () => {
    setIsLoading(true);

    const resultPrimary = await useGetRunesUrls(
      lookedUpPlayer!.perks.styles[0]
    );
    setPrimaryTree(resultPrimary);
    const resultSecondary = await useGetRunesUrls(
      lookedUpPlayer!.perks.styles[1]
    );
    setSecondaryTree(resultSecondary);
  }, []);

  useEffect(() => {
    fetchRunesUrlsHandler();
    setIsLoading(false);
  }, [fetchRunesUrlsHandler]);

  const summonerSpell1Url = useGetSummonerSpellUrl(lookedUpPlayer!.summoner1Id);
  const summonerSpell2Url = useGetSummonerSpellUrl(lookedUpPlayer!.summoner2Id);
  // console.log(lookedUpPlayer!.perks);

  const lookedUpPlayerItems = [
    lookedUpPlayer!.item0,
    lookedUpPlayer!.item1,
    lookedUpPlayer!.item2,
    lookedUpPlayer!.item3,
    lookedUpPlayer!.item4,
    lookedUpPlayer!.item5,
    lookedUpPlayer!.item6,
  ];
  // console.log(lookedUpPlayer);

  let gameStatus: string;
  lookedUpPlayer!.win ? (gameStatus = "Victory") : (gameStatus = "Defeat");

  const team1 = match.info.participants.slice(0, 5);
  const team2 = match.info.participants.slice(5, 10);

  const readableCreationDate = new Date(
    match.info.gameCreation
  ).toLocaleString();

  const gameDuration = `${Math.floor(match.info.gameDuration / 60)}m ${
    match.info.gameDuration % 60
  }s`;

  return (
    <div className="flex">
      {/* GAME STATS */}
      <section>
        <div>{match.info.gameMode}</div>
        <div className="text-xs">{readableCreationDate}</div>
        <div>{gameStatus}</div>
        <div>{gameDuration}</div>
      </section>
      {/* PLAYER SECTION */}

      <section className="flex flex-col w-96">
        <div className="flex w-48">
          <Image
            src={formatUnicorn(CHAMPION_ICON, {
              champion: lookedUpPlayer!.championName,
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
          <div className="flex flex-col">
            <Image
              src={`https://ddragon.canisback.com/img/${primaryTree.runesUrls[0]}`}
              width={32}
              height={32}
              className="rounded-xl"
              layout="fixed"
            />

            <Image
              src={`https://ddragon.canisback.com/img/${secondaryTree.styleUrl}`}
              width={32}
              height={32}
              className="rounded-xl"
              layout="fixed"
            />
          </div>
          <div>
            <div>{lookedUpPlayer!.kills}</div>
            <div>{lookedUpPlayer!.deaths}</div>
            <div>{lookedUpPlayer!.assists}</div>
          </div>
        </div>
        <div>
          {lookedUpPlayerItems.map((item) => (
            <Image
              key={item}
              src={formatUnicorn(ITEM_IMAGE, { item: item })}
              width={16}
              height={16}
            />
          ))}
        </div>
      </section>

      {/* TEAMS SECTION */}
      {/* <section className="">
        <div className="flex">
          <div>
            {team1.map((participant) => (
              <div key={participant.summonerName} className="flex">
                <div>{participant.summonerName}</div>
                <Image
                  src={formatUnicorn(CHAMPION_ICON, {
                    champion: participant.championName,
                  })}
                  width={16}
                  height={16}
                />
              </div>
            ))}
          </div>
          <div>
            {team2.map((participant) => (
              <div key={participant.summonerName} className="flex">
                <div>{participant.summonerName}</div>
                <Image
                  src={formatUnicorn(CHAMPION_ICON, {
                    champion: participant.championName,
                  })}
                  width={16}
                  height={16}
                />
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default MatchTile;
