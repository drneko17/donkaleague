type GetRegionType = (server: string | string[] | undefined) => string;

const useGetRegion: GetRegionType = (server) => {
  switch (server) {
    case "NA1":
    case "LA1":
    case "LA2":
    case "BR1":
      return "amreicas";
    case "EUN1":
    case "EUW1":
    case "TR1":
    case "RU":
      return "europe";
    case "JP1":
    case "KR":
      return "asia";
    case "OC1":
      return "SEA";
    default:
      return "europe";
  }
};

export default useGetRegion;
