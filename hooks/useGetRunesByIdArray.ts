import { RUNES_DATA } from "../public/constants";
import { RuneDataType, RuneType } from "../types/summonerTypes";
import formatUnicorn from "format-unicorn/safe";

type GetRunesByIdArray = (
  runeIds: number[] | string[],
  version: string
) => Promise<RuneType[]>;

const useGetRunesByIdArray: GetRunesByIdArray = async (runeIds, version) => {
  let runes: {
    trees: {
      icon: string;
      id: number;
      name: string;
    }[];
    runes: {
      icon: string;
      id: number;
      key: string;
      longDesc: string;
      name: string;
      shortDesc: string;
    }[];
  } = {
    trees: [],
    runes: [],
  };

  const runesResponse = await fetch(
    formatUnicorn(RUNES_DATA, { gameVersion: version })
  );
  const runesData: RuneDataType[] = await runesResponse.json();

  runesData.map((item) => {
    let myObject = {
      id: item.id,
      name: item.name,
      icon: item.icon,
    };
    runes.trees.push(myObject);
  });

  for (const runeTree of runesData) {
    for (const runeLine of runeTree.slots) {
      runes.runes.push(...runeLine.runes);
    }
  }
  let result: RuneType[] = [];
  for (const playerRune of runeIds) {
    const foundRune = runes.runes.find((rune) => rune.id == playerRune);
    if (foundRune) {
      result.push(foundRune);
    }
  }
  console.log(runes);

  return result;
};

export default useGetRunesByIdArray;
