import { SUMMONER_SPELLS } from "../public/constants";

import formatUnicorn from "format-unicorn/safe";

type GetSummonerSpellUrlType = (
  summonerId: number,
  version: string
) => Promise<string>;
const useGetSummonerSPellUrlInABetterWay: GetSummonerSpellUrlType = async (
  summonerId,
  version
) => {
  let affix = "";
  const response = await fetch(
    formatUnicorn(SUMMONER_SPELLS, { gameVersion: version })
  );
  const data = await response.json();

  for (const item in data.data) {
    if (summonerId == data.data[item].key) {
      affix = data.data[item].image.full;
      break;
    }
  }
  return `http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${affix}`;
};

export default useGetSummonerSPellUrlInABetterWay;
