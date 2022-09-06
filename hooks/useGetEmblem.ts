type GetEmblemType = (tier: string | string[] | undefined) => string;

const useGetEmblem: GetEmblemType = (tier) => {
  switch (tier) {
    case "IRON":
      return "/ranked-emblems/Emblem_Iron.png";
    case "BRONZE":
      return "/ranked-emblems/Emblem_Bronze.png";
    case "SILVER":
      return "/ranked-emblems/Emblem_Silver.png";
    case "GOLD":
      return "/ranked-emblems/Emblem_Gold.png";
    case "PLATINUM":
      return "/ranked-emblems/Emblem_Platinum.png";
    case "DIAMOND":
      return "/ranked-emblems/Emblem_Diamond.png";
    case "MASTER":
      return "/ranked-emblems/Emblem_Master.png";
    case "GRANDMASTER":
      return "/ranked-emblems/Emblem_Grandmaster.png";
    case "CHALLENGER":
      return "/ranked-emblems/Emblem_Challenger.png";
    default:
      return "/ranked-emblems/Emblem_Iron.png";
  }
};

export default useGetEmblem;
