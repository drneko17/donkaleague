import { CHAMPION_DATA, CHAMPION_ICON } from "../public/constants";
import formatUnicorn from "format-unicorn/safe";

type GetChampionIconUrlType = (
  championId: number
) => Promise<string | undefined>;

const useGetChampionIconUrl: GetChampionIconUrlType = async (championId) => {
  const response = await fetch(CHAMPION_DATA, { method: "GET" });
  const data = await response.json();
  const champions = data.data;
  for (const champion in champions) {
    if (champions[champion].key == championId) {
      const url = formatUnicorn(CHAMPION_ICON, {
        champion: champion,
      });
      return url;
    }
  }
};

export default useGetChampionIconUrl;
