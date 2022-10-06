let gameVersion = "12.16.1";

// ITEMS
export const ITEMS_URL: string = `http://ddragon.leagueoflegends.com/cdn/${gameVersion}/data/en_US/item.json`;
export const ITEM_IMAGE: string = `http://ddragon.leagueoflegends.com/cdn/${gameVersion}/img/item/{item}.png`;

// SUMMONER SPELLS
export const SUMMONER_SPELLS: string = `http://ddragon.leagueoflegends.com/cdn/${gameVersion}/data/en_US/summoner.json`;
export const SUMMONER_SPELL_IMAGE: string = `http://ddragon.leagueoflegends.com/cdn/${gameVersion}/img/spell/{summoner}.png`;

// RUNES
export const RUNE_IMAGE: string = `https://ddragon.canisback.com/img/perk-images/`;
export const RUNES_DATA: string = `https://ddragon.leagueoflegends.com/cdn/${gameVersion}/data/en_US/runesReforged.json`;

// SUMMONER INFO
export const SUMMONER_BY_NAME: string = `https://{server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/{summoner}`;
export const LEAGUE_BY_SUMMONER_ID: string = `https://{server}.api.riotgames.com/lol/league/v4/entries/by-summoner/{summonerId}`;
export const PROFILE_IMAGE: string = `http://ddragon.leagueoflegends.com/cdn/${gameVersion}/img/profileicon/{iconId}.png`;

// MATCHES
export const MATCHES_BY_SUMMONER_ID: string = `https://{realm}.api.riotgames.com/lol/match/v5/matches/by-puuid/{summonerId}/ids?start={start}&count={count}`;
export const MATCH_BY_MATCH_ID: string = `https://{realm}.api.riotgames.com/lol/match/v5/matches/{matchId}`;
export const LIVE_GAME: string = `https://{server}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/{summonerId}`;

// CHAMPIONS
export const CHAMPION_ICON: string = `https://ddragon.leagueoflegends.com/cdn/${gameVersion}/img/champion/{champion}.png`;
export const CHAMPION_DATA: string = `http://ddragon.leagueoflegends.com/cdn/${gameVersion}/data/en_US/champion.json`;
