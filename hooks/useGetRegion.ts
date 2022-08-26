type getRegionType = (server: string | string[] | undefined) => string;

const useGetRegion: getRegionType = (server) => {
  let realm: string;
  switch (server) {
    case "NA1":
    case "LA1":
    case "LA2":
    case "BR1":
      realm = "amreicas";
      break;
    case "EUN1":
    case "EUW1":
    case "TR1":
    case "RU":
      realm = "europe";
      break;
    case "JP1":
    case "KR":
      realm = "asia";
      break;
    case "OC1":
      realm = "SEA";
      break;
  }
  return realm!;
};

export default useGetRegion;
