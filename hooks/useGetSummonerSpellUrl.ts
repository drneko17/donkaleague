type GetSummonerSpellUrlType = (summonerId: number) => string;

const useGetSummonerSpellUrl: GetSummonerSpellUrlType = (summonerId) => {
  switch (summonerId) {
    case 21:
      return "http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/SummonerBarrier.png";
    case 1:
      return "http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/SummonerBoost.png";
    case 14:
      return "http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/SummonerDot.png";
    case 3:
      return "http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/SummonerExhaust.png";
    case 4:
      return "http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/SummonerFlash.png";
    case 6:
      return "http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/SummonerHaste.png";
    case 7:
      return "http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/SummonerHeal.png";
    case 13:
      return "http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/SummonerMana.png";
    case 30:
      return "http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/SummonerPoroRecall.png";
    case 31:
      return "http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/SummonerPoroThrow.png";
    case 11:
      return "http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/SummonerSmite.png";
    case 32:
      return "http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/SummonerSnowball.png";
    case 12:
      return "http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/SummonerTeleport.png";
    default:
      return "http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/SummonerTeleport.png";
  }
};

export default useGetSummonerSpellUrl;
