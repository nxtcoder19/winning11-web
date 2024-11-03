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
    const url = 'match/list'; // Adjust if the endpoint path is different
    return await makeApiCall<MatchListResponse>(API_CALL_TYPE.HTTP_GET, url);
  };
  
  // Export match repository functions
  export const matchRepository = {
    getMatchList,
  };
  