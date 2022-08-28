import formatUnicorn from "format-unicorn/safe";
import Image from "next/image";

import { CHAMPION_ICON, ITEM_IMAGE } from "../../public/constants";
import { MatchDataType } from "../../types/summonerTypes";
import useGetSummonerSpellUrl from "../../hooks/useGetSummonerSpellUrl";

const MatchTile: React.FC<{ match: MatchDataType; userId: string }> = ({
  match,
  userId,
}) => {
  //   console.log(match);
  const lookedUpPlayer = match.info.participants.find(
    (player) => player.puuid === userId
  );

  const summonerSpell1Url = useGetSummonerSpellUrl(lookedUpPlayer!.summoner1Id);
  const summonerSpell2Url = useGetSummonerSpellUrl(lookedUpPlayer!.summoner2Id);

  const lookedUpPlayerItems = [
    lookedUpPlayer!.item0,
    lookedUpPlayer!.item1,
    lookedUpPlayer!.item2,
    lookedUpPlayer!.item3,
    lookedUpPlayer!.item4,
    lookedUpPlayer!.item5,
    lookedUpPlayer!.item6,
  ];
  console.log(lookedUpPlayer);

  let gameStatus: string = "";
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
      <section className="flex flex-col">
        <Image
          src={formatUnicorn(CHAMPION_ICON, {
            champion: lookedUpPlayer!.championName,
          })}
          width={64}
          height={64}
          className="rounded-full"
        />
        <Image
          src={summonerSpell1Url}
          width={32}
          height={32}
          className="rounded-xl"
        />
        <Image
          src={summonerSpell2Url}
          width={32}
          height={32}
          className="rounded-xl"
        />
        <div>
          <div>{lookedUpPlayer!.kills}</div>
          <div>{lookedUpPlayer!.deaths}</div>
          <div>{lookedUpPlayer!.assists}</div>
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
      <section className="">
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
      </section>
    </div>
  );
};

export default MatchTile;
