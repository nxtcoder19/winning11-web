/* eslint-disable @typescript-eslint/no-explicit-any */
import { playerRepository } from "@/server/repository/player-repository";
import { PlayersResource } from "./players-resource";

async function getPlayersList({matchId}: {matchId: string}) {
    const playersApi = playerRepository
    const response = await playersApi.getPlayerList({matchId: matchId});
    return response;
}

export default async function Home(props: any) {
    const playerList = await getPlayersList({matchId: props.params.matchId})
    
    return (
        <div className="p-4">
            <PlayersResource playersList={playerList.data?.playerList || []} />
        </div>
    )
}