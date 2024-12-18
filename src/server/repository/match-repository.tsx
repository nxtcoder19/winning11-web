import { API_CALL_TYPE, ApiResponse, makeApiCall } from "../api-call";

// match-types.ts
export interface Match {
    id: string;
    sportsType: string;
    matchStatus?: string;
    seriesName: string;
    matchName: string;
    displayName: string;
    firstTeamName: string;
    secondTeamName: string;
    firstTeamShortName: string;
    secondTeamShortName: string;
    firstTeamLogo: string;
    secondTeamLogo: string;
    matchDay: string;
    matchTime: string;
  }
  
  export interface MatchListResponse {
    matchList: Match[];
  }

  const getMatchList = async (): Promise<ApiResponse<MatchListResponse>> => {
    const url = 'match/list'; 
    return await makeApiCall<MatchListResponse>(API_CALL_TYPE.HTTP_GET, url);
  };

  const getMatch = async ({matchId}: {matchId: string}): Promise<ApiResponse<Match>> => {
    const url = `match/get/${matchId}`; 
    return await makeApiCall<Match>(API_CALL_TYPE.HTTP_GET, url);
  };

  const updateMatch = async ({matchId, matchData}: {matchId: string, matchData: Match}): Promise<ApiResponse<Match>> => {
    const url = `match/update/${matchId}`; 
    return await makeApiCall<Match>(API_CALL_TYPE.HTTP_PUT, url, matchData);
  };
  
  // Export match repository functions
  export const matchRepository = {
    getMatchList,
    getMatch,
    updateMatch,
  };
  