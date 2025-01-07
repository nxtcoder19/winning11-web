/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMatchType } from "@/common/utils-common";
import { matchRepository } from "@/server/repository/match-repository";
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import { LiveMatchResource } from "./live-match-resource";

async function getMatchList() {
    const matchApi = matchRepository
    const response = await matchApi.getMatchList();
    return response;
}

export default async function Home(props: any) {
    const matchType = getMatchType(props.params.matchType)
    const matchDetails = await getMatchList();
    const matchList = matchDetails.data?.matchList.filter(match => match.matchStatus === "Live" && match.sportsType === matchType)

    return (
        <div className="p-4">
            <LiveMatchResource matchList={matchList || []} matchType={matchType || ""}/>
        </div>
    )
}