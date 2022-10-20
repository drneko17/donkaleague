import { CHAMPION_DATA, CHAMPION_ICON } from "../public/constants";
import formatUnicorn from "format-unicorn/safe";

type GetChampionIconUrlType = (
  championId: number,
  version: string
) => Promise<string | undefined>;

const useGetChampionIconUrl: GetChampionIconUrlType = async (
  championId,
  version
) => {
  const response = await fetch(
    formatUnicorn(CHAMPION_DATA, { gameVersion: version }),
    { method: "GET" }
  );
  const data = await response.json();
  const champions = data.data;
  for (const champion in champions) {
    if (champions[champion].key == championId) {
      const url = formatUnicorn(CHAMPION_ICON, {
        champion: champion,
        gameVersion: version,
      });
      return url;
    }
  }
};

export default useGetChampionIconUrl;
