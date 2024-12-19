import { API_CALL_TYPE, ApiResponse, makeApiCall } from "../api-call";

export interface Player {
    id: string;

    matchId: string;
    playerName: string;
    displayName: string;
    teamName: string;

    playerType: string;
    playerImage: string;
    playerPoints: number;
    playerCredit: number;

    isPlayedLastMatch: boolean;
    playerStatus: string;
}

export interface PlayerIn {
    matchId: string;
    playerName: string;
    displayName: string;
    teamName: string;

    playerType: string;
    playerImage: string;
    playerPoints: number;
    playerCredit: number;

    isPlayedLastMatch: boolean;
    playerStatus: string;
}

// enum PlayerType {
//     WicketKeeper = "wicketkeeper",
//     Batsman = "batsman",
//     AllRounder = "all-rounder",
//     Bowler = "bowler"
// }

// enum PlayerStatus {
//     Announced = "announced",
//     UnAnnounced = "unannounced",
//     Substitute = "substitute"
// }

export interface PlayerListResponse {
    playerList: Player[];
}

const getPlayerList = async ({matchId}: {matchId: string}): Promise<ApiResponse<PlayerListResponse>> => {
    const url = `player/list/${matchId}`; // Adjust if the endpoint path is different
    return await makeApiCall<PlayerListResponse>(API_CALL_TYPE.HTTP_GET, url);
};

const addPlayer = async ({ playerData}: { playerData: PlayerIn}): Promise<ApiResponse<Player>> => {
    const url = "player/add"; 
    return await makeApiCall<Player>(API_CALL_TYPE.HTTP_POST, url, playerData);
};

// Export player repository functions
export const playerRepository = {
    getPlayerList,
    addPlayer,
};