import { API_CALL_TYPE, ApiResponse, makeApiCall } from "../api-call";
import { Player } from "./player-repository";

export interface Winnings {
    rank: string;
    winningAmount: string;
}

// interface Player {
//     id: string;

//     matchId: string;
//     playerName: string;
//     displayName: string;
//     teamName: string;

//     playerType: PlayerType;
//     playerImage: string;
//     playerPoints: number;
//     playerCredit: number;

//     isPlayedLastMatch: boolean;
//     playerStatus: PlayerStatus;
// }

interface Team {
    id: string;

    matchId: string;
    mobileNo: number;

    teamName?: string;

    teamCaptain: Player;
    teamViceCaptain: Player;
    players: Player[];
}

export interface ContestIn {
    matchId: string;
    contestName: string;
    displayName: string;

    totalWinningAmount: number;
    entryAmount: number;
    discountAmount: number;

    totalSpot: number;
    availableSpot: number;

    firstPrice: number;
    winningPercentage: number;
    maximumAllowedTeams: number;

    isFlexible: boolean;
    flexibleInstructions: string;

    winnings?: Winnings[];
}

export interface Contest {
    id: string;
    isFull: boolean;

    matchId: string;
    contestName: string;
    displayName: string;

    totalWinningAmount: number;
    entryAmount: number;
    discountAmount: number;

    totalSpot: number;
    availableSpot: number;

    firstPrice: number;
    winningPercentage: number;
    maximumAllowedTeams: number;

    isFlexible: boolean;
    flexibleInstructions: string;

    winnings?: Winnings[];
    leaderboard?: Team[];
}

export interface ContestListResponse {
    contestList: Contest[];
}

interface DeleteContestResponse {
    status: boolean;
}

const addContest = async ({ contestData}: { contestData: ContestIn}): Promise<ApiResponse<Contest>> => {
    const url = "contest/add"; 
    return await makeApiCall<Contest>(API_CALL_TYPE.HTTP_POST, url, contestData);
};

const getContestList = async ({matchId}: {matchId: string}): Promise<ApiResponse<ContestListResponse>> => {
    const url = `contest/list/${matchId}`; 
    return await makeApiCall<ContestListResponse>(API_CALL_TYPE.HTTP_GET, url);
};

const getContest = async ({contestId}: {contestId: string}): Promise<ApiResponse<Contest>> => {
    const url = `contest/get/${contestId}`; 
    return await makeApiCall<Contest>(API_CALL_TYPE.HTTP_GET, url);
};

const updateContest = async ({contestId, contestData}: {contestId: string, contestData: ContestIn}): Promise<ApiResponse<Contest>> => {
    const url = `contest/update/${contestId}`; 
    return await makeApiCall<Contest>(API_CALL_TYPE.HTTP_PUT, url, contestData);
};

const deleteContest = async ({contestId}: {contestId: string}): Promise<ApiResponse<DeleteContestResponse>> => {
    const url = `contest/delete/${contestId}`; 
    return await makeApiCall<DeleteContestResponse>(API_CALL_TYPE.HTTP_DELETE, url);
};

// Export contest repository functions
export const contestRepository = {    
    addContest,
    getContestList,
    getContest,
    updateContest,
    deleteContest,
};


