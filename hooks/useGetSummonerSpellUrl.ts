type GetSummonerSpellUrlType = (summonerId: number) => string;

const useGetSummonerSpellUrl: GetSummonerSpellUrlType = (summonerId) => {
  let summonerUrl: string;

  switch (summonerId) {
    case 21:
      summonerUrl =
        "http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/SummonerBarrier.png";
      break;
    case 1:
      summonerUrl =
        "http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/SummonerBoost.png";
      break;
    case 14:
      summonerUrl =
        "http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/SummonerDot.png";
      break;
    case 3:
      summonerUrl =
        "http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/SummonerExhaust.png";
      break;
    case 4:
      summonerUrl =
        "http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/SummonerFlash.png";
      break;
    case 6:
      summonerUrl =
        "http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/SummonerHaste.png";
      break;
    case 7:
      summonerUrl =
        "http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/SummonerHeal.png";
      break;
    case 13:
      summonerUrl =
        "http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/SummonerMana.png";
      break;
    case 30:
      summonerUrl =
        "http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/SummonerPoroRecall.png";
      break;
    case 31:
      summonerUrl =
        "http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/SummonerPoroThrow.png";
      break;
    case 11:
      summonerUrl =
        "http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/SummonerSmite.png";
      break;
    case 32:
      summonerUrl =
        "http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/SummonerSnowball.png";
      break;
    case 12:
      summonerUrl =
        "http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/SummonerTeleport.png";
      break;
  }
  return summonerUrl!;
};

export default useGetSummonerSpellUrl;
