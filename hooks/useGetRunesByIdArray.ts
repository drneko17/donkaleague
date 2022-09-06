import { RUNES_DATA } from "../public/constants";
import { RuneDataType, RuneType } from "../types/summonerTypes";

type GetRunesByIdArray = (
  runeIds: number[] | string[]
) => Promise<{ result: RuneType[] }>;

const useGetRunesByIdArray: GetRunesByIdArray = async (runeIds) => {
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

  const runesResponse = await fetch(RUNES_DATA);
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
  let result = [];
  for (const playerRune of runeIds) {
    const foundRune = runes.runes.find((rune) => rune.id == playerRune);
    if (foundRune) {
      result.push(foundRune);
    }
  }
  return result;
};

export default useGetRunesByIdArray;
