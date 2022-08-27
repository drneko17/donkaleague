type getEmblem = (tier: string | string[] | undefined) => string;

const useGetEmblem: getEmblem = (tier) => {
  let emblemUrl: string;

  switch (tier) {
    case "IRON":
      emblemUrl = "/ranked-emblems/Emblem_Iron.png";
      break;
    case "BRONZE":
      emblemUrl = "/ranked-emblems/Emblem_Bronze.png";
      break;
    case "SILVER":
      emblemUrl = "/ranked-emblems/Emblem_Silver.png";
      break;
    case "GOLD":
      emblemUrl = "/ranked-emblems/Emblem_Gold.png";
      break;
    case "PLATINUM":
      emblemUrl = "/ranked-emblems/Emblem_Platinum.png";
      break;
    case "DIAMOND":
      emblemUrl = "/ranked-emblems/Emblem_Diamond.png";
      break;
    case "MASTER":
      emblemUrl = "/ranked-emblems/Emblem_Master.png";
      break;
    case "GRANDMASTER":
      emblemUrl = "/ranked-emblems/Emblem_Grandmaster.png";
      break;
    case "CHALLENGER":
      emblemUrl = "/ranked-emblems/Emblem_Challenger.png";
      break;
  }
  return emblemUrl!;
};

export default useGetEmblem;
