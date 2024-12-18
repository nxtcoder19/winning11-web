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

export default async function Home() {
    const matchDetails = await getMatchList();
    const matchList = matchDetails.data?.matchList.filter(match => match.matchStatus === "Live" && match.sportsType === "Cricket")

    return (
        <div className="p-4">
            <LiveMatchResource matchList={matchList || []}/>
        </div>
    )
}