/* eslint-disable @typescript-eslint/no-explicit-any */
import { Player, playerRepository } from "@/server/repository/player-repository";
import { PlayerSettingsResource } from "./player-settings-resource";

async function getPlayer({playerId}: {playerId: string}) {
    const playerApi = playerRepository
    const response = await playerApi.getPlayer({playerId: playerId});
    return response;
}

export default async function Home( props: any ) {
    const playerDetails = await getPlayer({playerId: props.params.playerId})
    return (
        <div>
            <PlayerSettingsResource playerDetails={playerDetails.data as Player} />
        </div>
    )
}