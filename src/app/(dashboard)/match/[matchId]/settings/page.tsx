/* eslint-disable @typescript-eslint/no-explicit-any */
import { Match, matchRepository } from "@/server/repository/match-repository";
import { MatchSettings } from "./match-settings-resource";

async function getMatch({matchId}: {matchId: string}) {
    const matchApi = matchRepository
    const response = await matchApi.getMatch({matchId: matchId});
    return response;
}

export default async function Home(props: any) {

    const matchDetails = await getMatch({matchId: props.params.matchId})
    console.log("matchDetails", matchDetails.data)

    return (
        <div>
            {/* <h1>Settings</h1> */}
            <MatchSettings matchDetails={matchDetails.data as Match} />
        </div>
    )
}