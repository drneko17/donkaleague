import { RUNES_DATA } from "../public/constants";

type GetRunesUrlsType = (runeObject: {
  description: string;
  selections: {
    perk: number;
    var1: number;
    var2: number;
    var3: number;
  }[];
  style: number;
}) => Promise<{
  styleUrl: string;
  runesUrls: string[];
}>;

const useGetRunesUrls: GetRunesUrlsType = async (runeObject) => {
  const runesResponse = await fetch(RUNES_DATA);
  const runesData = await runesResponse.json();

  const style = runesData.find((item: any) => item.id === runeObject.style);

  let allRunes: any[] = [
    ...style.slots[0].runes,
    ...style.slots[1].runes,
    ...style.slots[2].runes,
    ...style.slots[3].runes,
  ];

  let runesUrls: string[] = [];

  for (const rune of runeObject.selections) {
    const runeUrl = allRunes.find((item) => item.id === rune.perk).icon;
    runesUrls!.push(runeUrl);
  }

  return {
    styleUrl: style.icon,
    runesUrls: runesUrls!,
  };
};

export default useGetRunesUrls;
